import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import connectDB from "@/lib/mongodb";
import AuthUser from "@/app/models/AuthUser";

export async function POST(req: Request) {
    try {
        await connectDB();

        const { name, teamName, email, password, college } = await req.json();

        if (!name || !teamName || !email || !password || !college) {
            return NextResponse.json({ error: "ALL_FIELDS_REQUIRED" }, { status: 400 });
        }

        // Check if user exists
        const existing = await AuthUser.findOne({ email });

        if (existing) {
            return NextResponse.json({ error: "USER_ALREADY_EXISTS" }, { status: 400 });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUser = await AuthUser.create({
            name,
            teamName,
            email,
            password: hashedPassword,
            college,
            events: [],
            paymentStatus: "pending",
        });

        // Create Token
        const token = jwt.sign(
            { userId: newUser._id.toString(), email: newUser.email },
            process.env.JWT_SECRET || "default_secret",
            { expiresIn: "7d" }
        );

        // Set Cookie
        (await cookies()).set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: "/",
        });

        return NextResponse.json(
            {
                message: "Registration successful",
                user: {
                    id: newUser._id,
                    name: newUser.name,
                    email: newUser.email,
                    teamName: newUser.teamName,
                    college: newUser.college,
                },
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Registration Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
