import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import connectDB from "@/lib/mongodb";
import Registration from "@/app/models/Registration";

// Middleware-like check for admin session
async function isAdmin() {
    const cookieStore = await cookies();
    return cookieStore.get("admin_session")?.value === "true";
}

export async function GET() {
    if (!(await isAdmin())) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        await connectDB();
        const data = await Registration.find()
            .populate("teamId")
            .populate("eventId")
            .sort({ createdAt: -1 });
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error fetching registrations:", error);
        return NextResponse.json({ message: "Error fetching registrations" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        // NOTE: This POST handler logic seems to mismatch the database schema for 'registrations'.
        // Since this route seems unused (Auth uses /api/auth/register), returning 501.
        // If this route is needed, it must be aligned with the schema.

        const body = await request.json();
        console.log("Received registration request (Legacy Route):", body);

        return NextResponse.json(
            { success: false, message: "Endpoint deprecated or needs update" },
            { status: 501 }
        );
    } catch (error) {
        console.error("Error processing registration:", error);
        return NextResponse.json({ message: "Error processing registration" }, { status: 500 });
    }
}
