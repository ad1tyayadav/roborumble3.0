import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import connectDB from "@/lib/mongodb";
import AuthUser from "@/app/models/AuthUser";

export async function POST(req: Request) {
    try {
        await connectDB();

        const cookieStore = await cookies();
        const token = cookieStore.get("token");

        if (!token) {
            return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
        }

        const decoded = jwt.verify(
            token.value,
            process.env.JWT_SECRET || "default_secret"
        ) as { userId: string };

        // Verify Admin
        const adminUser = await AuthUser.findById(decoded.userId);
        if (!adminUser || adminUser.role !== "ADMIN") {
            return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
        }

        const { userId, status } = await req.json();

        if (!userId || !status) {
            return NextResponse.json({ error: "MISSING_DATA" }, { status: 400 });
        }

        // Fetch target user to get their current events
        const targetUser = await AuthUser.findById(userId);
        if (!targetUser) {
            return NextResponse.json({ error: "USER_NOT_FOUND" }, { status: 404 });
        }

        // If approving (status = 'paid'), sync paidEvents with current events
        const updateData: Record<string, unknown> = { paymentStatus: status };

        if (status === "paid") {
            updateData.paidEvents = targetUser.events;
        }

        await AuthUser.findByIdAndUpdate(userId, updateData);

        return NextResponse.json({ message: "STATUS_UPDATED" });
    } catch (error) {
        console.error("Payment Update Error:", error);
        return NextResponse.json({ error: "INTERNAL_SERVER_ERROR" }, { status: 500 });
    }
}
