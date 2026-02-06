import mongoose, { Schema, Document, Model } from "mongoose";

// AuthUser model for legacy password-based authentication
// Maps to the old PostgreSQL users table structure
export interface IAuthUser extends Document {
    name: string;
    email: string;
    password: string;
    college: string;
    events: string[];
    teamMembers: string[];
    paymentStatus: string;
    role: "USER" | "ADMIN";
    teamName?: string;
    paidEvents: string[];
    transactionId?: string;
    screenshotUrl?: string;
    declaredAmount?: string;
    createdAt: Date;
    updatedAt: Date;
}

const AuthUserSchema = new Schema<IAuthUser>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        college: { type: String, required: true },
        events: [{ type: String }],
        teamMembers: [{ type: String }],
        paymentStatus: { type: String, default: "pending" },
        role: {
            type: String,
            enum: ["USER", "ADMIN"],
            default: "USER",
        },
        teamName: String,
        paidEvents: [{ type: String }],
        transactionId: String,
        screenshotUrl: String,
        declaredAmount: String,
    },
    { timestamps: true }
);

const AuthUser: Model<IAuthUser> =
    mongoose.models.AuthUser ||
    mongoose.model<IAuthUser>("AuthUser", AuthUserSchema);

export default AuthUser;
