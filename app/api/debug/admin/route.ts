import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/mongodb";
import AuthUser from "@/app/models/AuthUser";

export async function GET() {
    try {
        await connectDB();

        const email = "admin@roborumble.com";
        const existing = await AuthUser.findOne({ email });

        if (!existing) {
            return NextResponse.json({
                status: "MISSING",
                message: "Admin user does not exist.",
            });
        }

        return NextResponse.json({
            status: "EXISTS",
            user: {
                id: existing._id,
                role: existing.role,
                teamName: existing.teamName,
                paymentStatus: existing.paymentStatus,
            },
        });
    } catch (error) {
        return NextResponse.json({ error: "DB_ERROR", details: String(error) }, { status: 500 });
    }
}

export async function POST() {
    try {
        await connectDB();

        const email = "admin@roborumble.com";
        const password = "adminpassword123";

        const existing = await AuthUser.findOne({ email });

        if (existing) {
            // Force update role
            await AuthUser.updateOne(
                { email },
                {
                    role: "ADMIN",
                    teamName: "ADMIN_CORE",
                    paymentStatus: "approved",
                }
            );

            return NextResponse.json({ message: "Admin role restored." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await AuthUser.create({
            name: "System Administrator",
            email,
            password: hashedPassword,
            college: "CSJMU",
            role: "ADMIN",
            paymentStatus: "approved",
            teamName: "ADMIN_CORE",
            events: [],
        });

        return NextResponse.json({ message: "Admin created successfully." });
    } catch (err) {
        return NextResponse.json({ error: String(err) }, { status: 500 });
    }
}
