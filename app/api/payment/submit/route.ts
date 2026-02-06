import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/mongodb";
import AuthUser from "@/app/models/AuthUser";

export async function POST(req: Request) {
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

    const { transactionId, amount, screenshotUrl } = await req.json();

    if (!transactionId || !amount || !screenshotUrl) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Update User
    await AuthUser.findByIdAndUpdate(decoded.userId, {
      transactionId,
      declaredAmount: amount,
      screenshotUrl,
      paymentStatus: "verification_pending",
    });

    return NextResponse.json({ success: true, message: "Payment submitted for verification" });
  } catch (error) {
    console.error("Payment Submission Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
