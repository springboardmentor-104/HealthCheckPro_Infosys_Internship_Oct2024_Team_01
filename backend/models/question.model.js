import mongoose from "mongoose";

const optionSchema = new mongoose.Schema({
  optionId: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  },
  optionText: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
});

const questionSchema = new mongoose.Schema(
  {
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    questionText: {
      type: String,
      required: true,
    },
    options: [optionSchema],
  },
  { timestamps: true }
);

const Question = mongoose.model("Question", questionSchema);
export default Question;