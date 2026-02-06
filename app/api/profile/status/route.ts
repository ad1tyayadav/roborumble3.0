import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import connectDB from "@/lib/mongodb";
import Profile from "@/app/models/Profile";

export async function GET() {
    try {
        const { userId: clerkId } = await auth();

        if (!clerkId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connectDB();

        const profile = await Profile.findOne({ clerkId }).select(
            "registeredEvents paidEvents onboardingCompleted username"
        );

        if (!profile) {
            return NextResponse.json({
                registeredEvents: [],
                paidEvents: [],
                onboardingCompleted: false
            });
        }

        return NextResponse.json({
            registeredEvents: profile.registeredEvents || [],
            paidEvents: profile.paidEvents || [],
            onboardingCompleted: profile.onboardingCompleted,
            username: profile.username
        });

    } catch (error) {
        console.error("Profile Status Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
