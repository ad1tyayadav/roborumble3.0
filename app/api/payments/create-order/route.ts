import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { auth } from "@clerk/nextjs/server";
import connectDB from "@/lib/mongodb";
import Profile from "@/app/models/Profile";
import Event from "@/app/models/Event";

// Initialize Razorpay - will fail gracefully if keys not set
let razorpay: Razorpay | null = null;
try {
    if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
        razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });
    }
} catch (e) {
    console.error("Razorpay initialization failed:", e);
}

// POST - Create Razorpay order for event registration
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { clerkId, eventId } = body;

        if (!eventId) {
            return NextResponse.json(
                { message: "eventId is required" },
                { status: 400 }
            );
        }

        // Get auth from Clerk
        const { userId: authClerkId } = await auth();
        const userClerkId = clerkId || authClerkId;

        if (!userClerkId) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        await connectDB();

        // Find event from MongoDB by eventId
        const event = await Event.findOne({ eventId, isLive: true });
        if (!event) {
            return NextResponse.json({ message: "Event not found or not available" }, { status: 404 });
        }

        // Get user profile
        const profile = await Profile.findOne({ clerkId: userClerkId });
        if (!profile) {
            return NextResponse.json({ message: "Profile not found. Complete onboarding first." }, { status: 404 });
        }

        // Check if already paid
        const paidEvents = profile.paidEvents || [];
        if (paidEvents.includes(eventId)) {
            return NextResponse.json(
                { message: "Already paid for this event" },
                { status: 400 }
            );
        }

        // Check max registrations
        if (event.maxRegistrations && event.currentRegistrations >= event.maxRegistrations) {
            return NextResponse.json({ message: "Event is fully booked" }, { status: 400 });
        }

        // Handle free events
        if (event.fees === 0) {
            await Profile.findOneAndUpdate(
                { clerkId: userClerkId },
                {
                    $addToSet: { registeredEvents: eventId, paidEvents: eventId },
                    $set: { updatedAt: new Date() }
                }
            );

            // Increment registration count
            await Event.findOneAndUpdate(
                { eventId },
                { $inc: { currentRegistrations: 1 } }
            );

            return NextResponse.json({
                message: "Registered successfully (free event)",
                isFree: true,
                eventTitle: event.title,
            });
        }

        // Check if Razorpay is configured
        if (!razorpay) {
            return NextResponse.json(
                { message: "Payment system not configured. Please contact admin." },
                { status: 500 }
            );
        }

        // Create Razorpay order for paid events
        const amountInPaise = event.fees * 100;

        const order = await razorpay.orders.create({
            amount: amountInPaise,
            currency: "INR",
            receipt: `reg_${profile._id}_${eventId}_${Date.now()}`,
            notes: {
                clerkId: userClerkId,
                eventId: eventId,
                eventTitle: event.title,
                email: profile.email,
            },
        });

        // Mark as registered (payment pending)
        await Profile.findOneAndUpdate(
            { clerkId: userClerkId },
            {
                $addToSet: { registeredEvents: eventId },
                $set: { updatedAt: new Date() }
            }
        );

        return NextResponse.json({
            orderId: order.id,
            amount: amountInPaise,
            currency: "INR",
            keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
            eventTitle: event.title,
            eventId: eventId,
        });
    } catch (error) {
        console.error("Create order error:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
