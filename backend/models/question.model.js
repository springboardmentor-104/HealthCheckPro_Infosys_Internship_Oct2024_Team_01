import mongoose from "mongoose";

export const optionSchema = new mongoose.Schema({
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
    selectedOption: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Option",
    },
  },
  { timestamps: true }
);

const Question = mongoose.model("Question", questionSchema);
export default Question;