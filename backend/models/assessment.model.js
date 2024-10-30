import mongoose from "mongoose";
import { optionSchema } from "./question.model.js";

const assessmentScoreSchema = new mongoose.Schema({
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  questions: [
    {
      questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
        required: true,
      },
      score: {
        type: Number,
        required: true,
      },
    },
  ],
  selectedOptionId: optionSchema,
});

const userAssessmentHistorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    attemptNumber: {
      type: Number,
      required: true,
    },
    assessments: [assessmentScoreSchema],
    overallScore: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    isComplete: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const userAssessmentHistory = mongoose.model(
  "UserAssessmentHistory",
  userAssessmentHistorySchema
);

export default userAssessmentHistory;