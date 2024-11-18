import express from "express"
import { getLeaderboard } from "../controllers/leaderboards.controller.js";
import protect from "../middlewares/protect.middleware.js";

const router = express.Router();

router.get("/:category", protect, getLeaderboard);

export default router