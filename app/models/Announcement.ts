import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAnnouncement extends Document {
    title: string;
    message: string;
    type: "info" | "alert" | "warning";
    date: Date;
    createdAt: Date;
    updatedAt: Date;
}

const AnnouncementSchema = new Schema<IAnnouncement>(
    {
        title: { type: String, required: true },
        message: { type: String, required: true },
        type: {
            type: String,
            enum: ["info", "alert", "warning"],
            default: "info",
        },
        date: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

const Announcement: Model<IAnnouncement> =
    mongoose.models.Announcement ||
    mongoose.model<IAnnouncement>("Announcement", AnnouncementSchema);

export default Announcement;
