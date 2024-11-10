import Category from "../models/category.model.js";
import Question from "../models/question.model.js";

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories", error });
  }
};

export const getQuestionsByCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const questions = await Question.find({ categoryId: id });
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching questions", error });
  }
};