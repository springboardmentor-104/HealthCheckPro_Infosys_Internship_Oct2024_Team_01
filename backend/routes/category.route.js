import express from "express";
import { getCategories, getQuestionsByCategory } from "../controllers/category.controller.js";

const router = express.Router();

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Successfully retrieved categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   name:
 *                     type: string
 *       500:
 *         description: Internal server error
 */
router.get("/", getCategories);

/**
 * @swagger
 * /api/categories/{id}/questions:
 *   get:
 *     summary: Get questions by category ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The category ID
 *     responses:
 *       200:
 *         description: Successfully retrieved questions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   questionText:
 *                     type: string
 *                   categoryId:
 *                     type: string
 *       500:
 *         description: Internal server error
 */
router.get("/:id/questions", getQuestionsByCategory);

export default router;