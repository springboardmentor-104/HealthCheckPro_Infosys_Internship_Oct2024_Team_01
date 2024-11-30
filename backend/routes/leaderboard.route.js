import express from "express";
import { getLeaderboardByCategory, getCombineCategoryLeaderboard } from "../controllers/leaderboards.controller.js";
import protect from "../middlewares/protect.middleware.js";

const router = express.Router();

/**
 * @swagger
 * /api/leaderboard/{category}:
 *   get:
 *     summary: Get leaderboard by category
 *     tags: [Leaderboard]
 *     parameters:
 *       - in: path
 *         name: category
 *         schema:
 *           type: string
 *         required: true
 *         description: The category of the leaderboard
 *     responses:
 *       200:
 *         description: Successfully retrieved leaderboard
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 leaderboard:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       userId:
 *                         type: string
 *                       username:
 *                         type: string
 *                       score:
 *                         type: number
 *                       category:
 *                         type: string
 *       400:
 *         description: Bad request
 *       401:
 *         description: Authorization token is required
 *       500:
 *         description: Internal server error
 */
router.get("/:category", protect, getLeaderboardByCategory);

/**
 * @swagger
 * /api/leaderboard:
 *   get:
 *     summary: Get combined category leaderboard
 *     tags: [Leaderboard]
 *     responses:
 *       200:
 *         description: Successfully retrieved combined leaderboard
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 leaderboard:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       username:
 *                         type: string
 *                       score:
 *                         type: number
 *       400:
 *         description: Bad request
 *       401:
 *         description: Authorization token is required
 *       500:
 *         description: Internal server error
 */
router.get("/", protect, getCombineCategoryLeaderboard);

export default router;