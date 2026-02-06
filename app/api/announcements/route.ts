import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import connectDB from "@/lib/mongodb";
import Announcement from "@/app/models/Announcement";

// Middleware-like check for admin session
async function isAdmin() {
    const cookieStore = await cookies();
    return cookieStore.get("admin_session")?.value === "true";
}

export async function GET() {
    try {
        await connectDB();
        const data = await Announcement.find().sort({ createdAt: -1 });
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error fetching announcements:", error);
        return NextResponse.json({ message: "Error fetching announcements" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    if (!(await isAdmin())) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        await connectDB();
        const body = await request.json();
        const { title, message, type = "info" } = body;

        if (!title || !message) {
            return NextResponse.json({ message: "Title and message required" }, { status: 400 });
        }

        const newAnnouncement = await Announcement.create({
            title,
            message,
            type,
            date: new Date(),
        });

        return NextResponse.json({ success: true, data: newAnnouncement });
    } catch (error) {
        console.error("Error adding announcement:", error);
        return NextResponse.json({ message: "Error adding announcement" }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    if (!(await isAdmin())) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        await connectDB();
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ message: "ID required" }, { status: 400 });
        }

        await Announcement.findByIdAndDelete(id);

        return NextResponse.json({ success: true, message: "Deleted successfully" });
    } catch (error) {
        console.error("Error deleting announcement:", error);
        return NextResponse.json({ message: "Error deleting announcement" }, { status: 500 });
    }
}
