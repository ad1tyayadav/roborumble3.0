import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProfile extends Document {
    clerkId: string;
    email: string;
    firstName?: string;
    lastName?: string;
    avatarUrl?: string;
    username?: string;
    bio?: string;
    phone?: string;
    college?: string;
    course?: string;
    role: "user" | "admin" | "superadmin";
    interests: string[];
    currentTeamId?: mongoose.Types.ObjectId;
    invitations: mongoose.Types.ObjectId[];
    registeredEvents: string[];
    paidEvents: string[];
    onboardingCompleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const ProfileSchema = new Schema<IProfile>(
    {
        // Clerk Integration
        clerkId: { type: String, unique: true, sparse: true },
        email: { type: String, required: true },
        firstName: String,
        lastName: String,
        avatarUrl: String,

        // Profile Data
        username: { type: String, unique: true, sparse: true },
        bio: { type: String, maxlength: 500 },
        phone: String,
        college: String,
        course: String,

        // Role Management
        role: {
            type: String,
            enum: ["user", "admin", "superadmin"],
            default: "user",
        },

        // Interests for matching
        interests: [{ type: String }],

        // Team Relationships
        currentTeamId: { type: Schema.Types.ObjectId, ref: "Team" },
        invitations: [{ type: Schema.Types.ObjectId, ref: "Team" }],

        // Event Registrations
        registeredEvents: [{ type: String }],
        paidEvents: [{ type: String }],

        // Status
        onboardingCompleted: { type: Boolean, default: false },
    },
    { timestamps: true }
);

const Profile: Model<IProfile> =
    mongoose.models.Profile || mongoose.model<IProfile>("Profile", ProfileSchema);

export default Profile;

