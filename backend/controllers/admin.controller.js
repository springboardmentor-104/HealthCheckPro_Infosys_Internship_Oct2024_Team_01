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



export const addCategory = async (req, res) => {
  const { categoryName, description } = req.body;

  try {
    const category = new Category({
      categoryName,
      description,
    });

    await category.save();

    res.status(201).json({ message: "Category added successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error occured while adding category!", error });
  }
};

export const addQuestion = async (req, res) => {
  const { categoryId, questionText, options } = req.body;

  try {
    const question = new Question({
      categoryId,
      questionText,
      options,
      selectedOption: null,
    });

    await question.save();

    res.status(201).json({ message: "Question added successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error occured while adding a question!", error });
  }
};

export const deleteQuestion = async (req, res) => {
  const { id } = req.params;

  try {
    await Question.findByIdAndDelete(id);
    res.status(200).json({ message: "Question deleted successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error occured while deleting the question", error });
  }
};

export const modifyQuestion = async (req, res) => {
  const { id } = req.params;
  const { questionText, options } = req.body;
  const props = { questionText, options };
  if(questionText === undefined) delete props.questionText;
  if(options === undefined) delete props.options;

  try {
    await Question.findByIdAndUpdate(id, { questionText, options });
    res.status(200).json({ message: "Question updated successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error while updating the question", error });
  }
};
