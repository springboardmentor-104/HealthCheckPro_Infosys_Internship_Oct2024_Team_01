import express from "express";
import { checkUserAssessmentStatus, fetchUserAssessmentHistory, fetchUserLatestAssessment, startNewRound, submitCategoryTest, getAttemptById, getAssessmentFromAttempt } from "../controllers/assessment.controller.js";
import protect from "../middlewares/protect.middleware.js";

const router = express.Router();

/**
 * @swagger
 * /api/assessment/status:
 *   get:
 *     summary: Check user assessment status
 *     tags: [Assessment]
 *     responses:
 *       200:
 *         description: Successfully retrieved user assessment status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 attemptNumber:
 *                   type: number
 *                 completedCategories:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       categoryId:
 *                         type: string
 *                       categoryName:
 *                         type: string
 *                 isComplete:
 *                   type: boolean
 *       401:
 *         description: Authorization token is required
 *       500:
 *         description: Server error
 */
router.get("/status", protect, checkUserAssessmentStatus);

/**
 * @swagger
 * /api/assessment/start-new-round:
 *   post:
 *     summary: Start a new assessment round
 *     tags: [Assessment]
 *     responses:
 *       200:
 *         description: New round started successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 attempt:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: string
 *                     attemptNumber:
 *                       type: number
 *                     assessments:
 *                       type: array
 *                       items:
 *                         type: object
 *                     isComplete:
 *                       type: boolean
 *                     overallMaxScore:
 *                       type: number
 *                     overallScore:
 *                       type: number
 *       400:
 *         description: Finish the current round before starting a new one
 *       401:
 *         description: Authorization token is required
 *       500:
 *         description: Server error
 */
router.post("/start-new-round", protect, startNewRound);

/**
 * @swagger
 * /api/assessment/submit:
 *   patch:
 *     summary: Submit category test
 *     tags: [Assessment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - categoryId
 *               - categoryName
 *               - questions
 *             properties:
 *               categoryId:
 *                 type: string
 *               categoryName:
 *                 type: string
 *               questions:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     questionId:
 *                       type: string
 *                     selectedOptionId:
 *                       type: string
 *     responses:
 *       200:
 *         description: Category test submitted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 attempt:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: string
 *                     attemptNumber:
 *                       type: number
 *                     assessments:
 *                       type: array
 *                       items:
 *                         type: object
 *                     isComplete:
 *                       type: boolean
 *                     overallMaxScore:
 *                       type: number
 *                     overallScore:
 *                       type: number
 *       400:
 *         description: Invalid submission
 *       401:
 *         description: Authorization token is required
 *       500:
 *         description: Server error
 */
router.patch("/submit", protect, submitCategoryTest);

/**
 * @swagger
 * /api/assessment/latest-attempt:
 *   get:
 *     summary: Fetch user's latest assessment
 *     tags: [Assessment]
 *     responses:
 *       200:
 *         description: Successfully retrieved latest assessment
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 latestCompleteAttempt:
 *                   type: object
 *                 latestIncompleteAttempt:
 *                   type: object
 *       401:
 *         description: Authorization token is required
 *       500:
 *         description: Server error
 */
router.get("/latest-attempt", protect, fetchUserLatestAssessment);

/**
 * @swagger
 * /api/assessment/all-attempts:
 *   get:
 *     summary: Fetch user's assessment history
 *     tags: [Assessment]
 *     responses:
 *       200:
 *         description: Successfully retrieved assessment history
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 allAttempts:
 *                   type: array
 *                   items:
 *                     type: object
 *       401:
 *         description: Authorization token is required
 *       500:
 *         description: Server error
 */
router.get("/all-attempts", protect, fetchUserAssessmentHistory);

/**
 * @swagger
 * /api/assessment/attempt/{attemptId}/{categoryId}:
 *   get:
 *     summary: Get assessment from attempt by category ID
 *     tags: [Assessment]
 *     parameters:
 *       - in: path
 *         name: attemptId
 *         schema:
 *           type: string
 *         required: true
 *         description: The attempt ID
 *       - in: path
 *         name: categoryId
 *         schema:
 *           type: string
 *         required: true
 *         description: The category ID
 *     responses:
 *       200:
 *         description: Successfully retrieved assessment from attempt
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userResponse:
 *                   type: object
 *                   properties:
 *                     categoryId:
 *                       type: string
 *                     questions:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           questionText:
 *                             type: string
 *                           selectedOptionText:
 *                             type: string
 *                           _id:
 *                             type: string
 *                           advice:
 *                             type: string
 *                     totalScore:
 *                       type: number
 *       404:
 *         description: Attempt not found
 *       401:
 *         description: Authorization token is required
 *       500:
 *         description: Server error
 */
router.get("/attempt/:attemptId/:categoryId", protect, getAssessmentFromAttempt);

/**
 * @swagger
 * /api/assessment/attempt/{attemptId}:
 *   get:
 *     summary: Get attempt by ID
 *     tags: [Assessment]
 *     parameters:
 *       - in: path
 *         name: attemptId
 *         schema:
 *           type: string
 *         required: true
 *         description: The attempt ID
 *     responses:
 *       200:
 *         description: Successfully retrieved attempt
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 attempt:
 *                   type: object
 *       404:
 *         description: Attempt not found
 *       401:
 *         description: Authorization token is required
 *       500:
 *         description: Server error
 */
router.get("/attempt/:attemptId", protect, getAttemptById);

export default router;