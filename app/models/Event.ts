import mongoose, { Schema, Document, Model } from "mongoose";

export interface IEvent extends Document {
    // Core identification
    eventId: string; // Custom ID like "robo-wars"
    title: string;
    slug: string;

    // Description and details
    category: string;
    description: string;
    teamSize: string; // Display text like "3-5 Members"
    prize: string;
    rules: string[];
    image?: string;

    // Pricing
    fees: number;

    // Team constraints (parsed from teamSize)
    minTeamSize: number;
    maxTeamSize: number;

    // Registration limits
    maxRegistrations?: number;
    currentRegistrations: number;
    registrationDeadline?: Date;

    // Status
    isLive: boolean;

    // Admin who created the event
    createdBy?: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const EventSchema = new Schema<IEvent>(
    {
        // Custom string ID for easier reference
        eventId: { type: String, unique: true, required: true },
        title: { type: String, required: true },
        slug: { type: String, unique: true },

        // Event details
        category: { type: String, required: true },
        description: { type: String, required: true },
        teamSize: { type: String, required: true },
        prize: { type: String, required: true },
        rules: [{ type: String }],
        image: String,

        // Pricing
        fees: { type: Number, required: true, default: 0 },

        // Team constraints
        minTeamSize: { type: Number, default: 1 },
        maxTeamSize: { type: Number, default: 4 },

        // Registration limits
        maxRegistrations: Number,
        currentRegistrations: { type: Number, default: 0 },
        registrationDeadline: Date,

        // Status
        isLive: { type: Boolean, default: true },

        // Admin who created the event
        createdBy: { type: Schema.Types.ObjectId, ref: "Profile" },
    },
    { timestamps: true }
);

// Auto-generate slug from title if not provided
EventSchema.pre("save", function (this: IEvent) {
    if (!this.slug && this.title) {
        this.slug = generateSlug(this.title);
    }
});

// Helper function to generate slug from title
export function generateSlug(title: string): string {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
}

// Parse team size string to min/max values
export function parseTeamSize(teamSize: string): { min: number; max: number } {
    const lower = teamSize.toLowerCase();
    let min = 1, max = 1;

    if (lower.includes("individual")) {
        max = 1;
        if (lower.includes("team of")) {
            const matches = lower.match(/(\d+)/g);
            if (matches) max = Math.max(...matches.map(Number));
        }
    } else if (lower.includes("open")) {
        min = 1;
        max = 100; // Open to all
    } else {
        const matches = lower.match(/(\d+)/g);
        if (matches && matches.length > 0) {
            min = parseInt(matches[0]) || 1;
            max = matches.length > 1 ? parseInt(matches[matches.length - 1]) : min;
        }
    }

    return { min, max };
}

const Event: Model<IEvent> =
    mongoose.models.Event || mongoose.model<IEvent>("Event", EventSchema);

export default Event;
