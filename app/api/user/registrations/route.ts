import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/mongodb";
import Registration from "@/app/models/Registration";
import Profile from "@/app/models/Profile";

export async function GET() {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(
      token.value,
      process.env.JWT_SECRET || "default_secret"
    ) as { userId: string };

    // Find user's profile to get their team
    const profile = await Profile.findById(decoded.userId);

    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    // Find registrations for user's team
    const userRegistrations = await Registration.find({
      teamId: profile.currentTeamId,
    }).populate("eventId");

    return NextResponse.json({ registrations: userRegistrations });
  } catch (error) {
    console.error("Fetch Registrations Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
