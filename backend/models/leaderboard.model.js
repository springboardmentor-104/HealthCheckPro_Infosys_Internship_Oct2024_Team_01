import mongoose from "mongoose";

const LeaderboardSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        score: {
            type: Number,
            required: true,
        },
        category: {
            type: String,
            required: true,
        }
    },
    { timestamps: true, unique: true }
);

LeaderboardSchema.index({ userId: 1, category: 1}, { unique: true });

const LeaderBoard = mongoose.model("Leaderboard", LeaderboardSchema);

export default LeaderBoard;