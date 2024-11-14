import express from "express"
import { checkUserAssessmentStatus, fetchUserAssessmentHistory, fetchUserLatestAssessment, startNewRound, submitCategoryTest } from "../controllers/assessment.controller.js"
import protect from "../middlewares/protect.middleware.js"

const router = express.Router();

router.get("/status", protect, checkUserAssessmentStatus);
router.post("/start-new-round",protect, startNewRound);
router.patch("/submit", protect, submitCategoryTest);
router.get("/latest-attempt",protect, fetchUserLatestAssessment);
router.get("/all-attempts",protect, fetchUserAssessmentHistory);

export default router;