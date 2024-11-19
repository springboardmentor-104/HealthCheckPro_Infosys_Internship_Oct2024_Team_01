import UserAssessmentHistory from "../models/assessment.model.js";
import Question from "../models/question.model.js";
import Category from "../models/category.model.js";
// import LeaderBoard from "../models/leaderboard.model.js";
import { updateLeaderBoard } from "./leaderboards.controller.js";

export const checkUserAssessmentStatus = async (req, res) => {
  try {
    const userId = req.user._id;
    const history = await UserAssessmentHistory.find({ userId }).sort({ attemptNumber: -1 });
    const attemptNumber = history.length;

    if (attemptNumber === 0) {
      res.json({ attemptNumber, completedCategories: [] });
    } else {
      const currentAttempt = history[0];
      const completedCategories = currentAttempt.assessments.map(assessment => ({
        categoryId: assessment.categoryId,
        categoryName: assessment.categoryName
      }));
      res.json({
        isComplete: currentAttempt.isComplete,
        completedCategories,
        attemptNumber
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
}

export const startNewRound = async (req, res) => {
    try {
        const userId = req.user._id;
        console.log('=== userId assessment.controller.js [29] ===', userId);
        const lastAttempt = await UserAssessmentHistory.findOne({ userId }).sort({ attemptNumber: -1 });
        if(lastAttempt && !lastAttempt.isComplete)
          return res.status(400).json({ message: "Finish the current round before starting a new one." });

        const newAttemptNumber = lastAttempt ? lastAttempt.attemptNumber + 1 : 1;

        const newAttempt = new UserAssessmentHistory({
            userId,
            attemptNumber: newAttemptNumber,
            assessments: [],
            isComplete: false
        });

        await newAttempt.save();
        res.json({ message: "New round started!", attempt: newAttempt });
    } catch (error) {
        res.status(500).json({ message: "Server Error!", error });
    }
}

export const submitCategoryTest = async (req, res) => {
  try {
    const userId = req.user._id;
    const { categoryId, categoryName, questions } = req.body;
    console.log('=== req.body assessment.controller.js [42] ===', req.body);

    if (!categoryId || !categoryName || questions.length === 0) {
      return res.status(400).json({ message: "Invalid submission! Please provide category ID, category name, and answer all the questions." });
    }

    let totalScore = 0;
    const questionsWithScores = [];

    for (const question of questions) {
      const questionDoc = await Question.findById(question.questionId);
      if (!questionDoc) {
        return res.status(400).json({ message: `Question with ID ${question.questionId} not found` });
      }
      const selectedOption = questionDoc.options.find(option => option._id.equals(question.selectedOptionId));
      if (!selectedOption) {
        return res.status(400).json({ message: `Selected option for question ID ${question.questionId} not found` });
      }
      totalScore += selectedOption.score;
      questionsWithScores.push({
        ...question,
        score: selectedOption.score
      });
    }

    const lastAttempt = await UserAssessmentHistory.findOne({ userId }).sort({ attemptNumber: -1 });

    let currentAttempt;
    if (!lastAttempt || lastAttempt.isComplete) {
      const newAttemptNumber = lastAttempt ? lastAttempt.attemptNumber + 1 : 1;

      currentAttempt = new UserAssessmentHistory({
        userId,
        attemptNumber: newAttemptNumber,
        assessments: [{ categoryId, categoryName, questions: questionsWithScores, totalScore }],
        isComplete: false,
      });
    } else {
      currentAttempt = lastAttempt;

      if (currentAttempt.assessments.some(assessment => assessment.categoryId.equals(categoryId))) {
        return res.status(400).json({ message: "This category test already submitted in the current round!" });
      }

      currentAttempt.assessments.push({ categoryId, categoryName, questions: questionsWithScores, totalScore });
    }

    // Check if the current attempt is complete

    const categories = await Category.find(); // Assuming you have a Category model to fetch all categories
    if (currentAttempt.assessments.length === categories.length) {
      currentAttempt.isComplete = true;
      currentAttempt.overallScore = currentAttempt.assessments.reduce((sum, assessment) => sum + assessment.totalScore, 0);
    }

    const saved = await currentAttempt.save();

    if(saved.isComplete) {
      await updateLeaderBoard(userId, req.user.username, saved.attemptNumber);
    }

    res.status(200).json({ message: "Category test submitted!", attempt: currentAttempt });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// Fetch the latest assessment attempts
export const fetchUserLatestAssessment = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming userId is attached to the req object
    console.log('=== userId assessment.controller.js [119] ===', userId);
    const latestAttempts = await UserAssessmentHistory.find({ userId }).sort({ attemptNumber: -1 }).limit(2);

    // Process the latest attempts to exclude the questions array
    const processedAttempts = latestAttempts.map(attempt => {
      const processedAssessments = attempt.assessments.map(assessment => {
        const { questions, ...rest } = assessment._doc; // Exclude questions array and get the rest of the properties
        return rest; // Return the new assessment object without the questions array
      });
      return { ...attempt._doc, assessments: processedAssessments }; // Return the new attempt object with processed assessments
    });

    const latestCompleteAttempt = processedAttempts.find(attempt => attempt.isComplete);
    const latestIncompleteAttempt = processedAttempts.find(attempt => !attempt.isComplete);

    if (latestCompleteAttempt || latestIncompleteAttempt) {
      res.status(200).json({
        latestCompleteAttempt,
        latestIncompleteAttempt: latestIncompleteAttempt || null // Ensure null if no incomplete attempt
      });
    } else {
      res.status(200).json({ message: "User has not submitted any tests!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Fetch all assessment attempts
export const fetchUserAssessmentHistory = async (req, res) => {
  try {
    const userId = req.user._id;
    const allAttempts = await UserAssessmentHistory.find({ userId }).sort({ attemptNumber: -1 });

    if (allAttempts && allAttempts.length > 0) {
      res.status(200).json({ allAttempts });
    } else {
      res.status(200).json({ message: "User has not submitted any tests!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};