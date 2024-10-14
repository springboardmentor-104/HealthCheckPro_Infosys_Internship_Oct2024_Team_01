import express from "express";
import { createAccount, loginUser, resetPassword } from "../controllers/user.controller.js";


const router = express.Router();

router.post("/signup", createAccount);
router.post("/login", loginUser);
router.post("/reset-password", resetPassword);

export default router;
