import express from "express";
import { getCategories, getQuestionsByCategory } from "../controllers/category.controller.js";

const router = express.Router();

router.get("/", getCategories);
router.get("/:id/questions", getQuestionsByCategory);

export default router;