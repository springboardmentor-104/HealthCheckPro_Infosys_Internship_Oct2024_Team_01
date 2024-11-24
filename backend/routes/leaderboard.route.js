import express from "express"
import { getLeaderboardByCategory,getCombineCategoryLeaderboard} from "../controllers/leaderboards.controller.js";
import protect from "../middlewares/protect.middleware.js";

const router = express.Router();

router.get("/:category", protect, getLeaderboardByCategory);
router.get("/", protect, getCombineCategoryLeaderboard);

export default router