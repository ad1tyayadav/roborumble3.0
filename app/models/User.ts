import mongoose, { Schema, Document, Model } from "mongoose";

// Legacy User model for backward compatibility with old registration system
interface TeamMember {
    name?: string;
    phone?: string;
    email?: string;
    course?: string;
}

interface Leader {
    name: string;
    email: string;
    phone: string;
    college: string;
    course: string;
    password: string;
}

export interface IUser extends Document {
    leader: Leader;
    teamName: string;
    members: TeamMember[];
    selectedEvents: string[];
    totalAmount: number;
    transactionId: string;
    status: string;
    createdAt: Date;
}

const UserSchema = new Schema<IUser>({
    leader: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        college: { type: String, required: true },
        course: { type: String, required: true },
        password: { type: String, required: true },
    },
    teamName: { type: String, required: true },
    members: [
        {
            name: String,
            phone: String,
            email: String,
            course: String,
        },
    ],
    selectedEvents: [{ type: String }],
    totalAmount: { type: Number, required: true },
    transactionId: { type: String, required: true },
    status: { type: String, default: "Pending" },
    createdAt: { type: Date, default: Date.now },
});

const User: Model<IUser> =
    mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
