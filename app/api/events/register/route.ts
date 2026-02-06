import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import connectDB from "@/lib/mongodb";
import Profile from "@/app/models/Profile";
import Event from "@/app/models/Event";

export async function POST(req: Request) {
    try {
        const { eventId } = await req.json();

        if (!eventId) {
            return NextResponse.json({ error: "Event ID required" }, { status: 400 });
        }

        // Get Clerk auth
        const { userId: clerkId } = await auth();

        if (!clerkId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connectDB();

        // Validate Event exists in MongoDB
        const event = await Event.findOne({ eventId, isLive: true });
        if (!event) {
            return NextResponse.json({ error: "Event not found or not available" }, { status: 400 });
        }

        // Find user profile
        const profile = await Profile.findOne({ clerkId });
        if (!profile) {
            return NextResponse.json({ error: "Profile not found. Complete onboarding first." }, { status: 404 });
        }

        // Check if already registered
        const registeredEvents = profile.registeredEvents || [];
        if (registeredEvents.includes(eventId)) {
            return NextResponse.json({ message: "Already registered for this event" }, { status: 200 });
        }

        // Check max registrations
        if (event.maxRegistrations && event.currentRegistrations >= event.maxRegistrations) {
            return NextResponse.json({ error: "Event is fully booked" }, { status: 400 });
        }

        // Add event to registered events
        await Profile.findOneAndUpdate(
            { clerkId },
            {
                $addToSet: { registeredEvents: eventId },
                $set: { updatedAt: new Date() }
            }
        );

        // For free events, also add to paidEvents and increment count
        if (event.fees === 0) {
            await Profile.findOneAndUpdate(
                { clerkId },
                { $addToSet: { paidEvents: eventId } }
            );
            await Event.findOneAndUpdate(
                { eventId },
                { $inc: { currentRegistrations: 1 } }
            );
        }

        return NextResponse.json({
            message: "Successfully registered!",
            eventId,
            eventTitle: event.title,
            fees: event.fees
        }, { status: 200 });

    } catch (error) {
        console.error("Event Registration Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
