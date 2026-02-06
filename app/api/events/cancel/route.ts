import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import connectDB from "@/lib/mongodb";
import AuthUser from "@/app/models/AuthUser";

export async function POST(req: Request) {
    try {
        await connectDB();

        const { eventId } = await req.json();

        if (!eventId) {
            return NextResponse.json({ error: "EVENT_ID_MISSING" }, { status: 400 });
        }

        const cookieStore = await cookies();
        const token = cookieStore.get("token");

        if (!token) {
            return NextResponse.json({ error: "UNAUTHORIZED_ACCESS" }, { status: 401 });
        }

        // Verify Token
        const decoded = jwt.verify(
            token.value,
            process.env.JWT_SECRET || "default_secret"
        ) as { userId: string };

        // Fetch User
        const user = await AuthUser.findById(decoded.userId);

        if (!user) {
            return NextResponse.json({ error: "USER_NOT_FOUND" }, { status: 404 });
        }

        // OPTIONAL: Prevent cancellation if already paid
        if (user.paymentStatus === "paid") {
            return NextResponse.json(
                { error: "PAYMENT_LOCKED: CANNOT_CANCEL_PAID_EVENTS" },
                { status: 403 }
            );
        }

        // Remove event
        const currentEvents = user.events || [];
        const updatedEvents = currentEvents.filter((id: string) => id !== eventId);

        await AuthUser.findByIdAndUpdate(user._id, { events: updatedEvents });

        return NextResponse.json({ message: "MISSION_ABORTED", events: updatedEvents }, { status: 200 });
    } catch (error) {
        console.error("Event Cancellation Error:", error);
        return NextResponse.json({ error: "INTERNAL_SERVER_ERROR" }, { status: 500 });
    }
}
