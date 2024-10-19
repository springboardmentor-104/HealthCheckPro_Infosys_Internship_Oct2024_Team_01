import express from "express";
import { createAccount, loginUser, resetPassword,sendOTP,verifyOTP } from "../controllers/user.controller.js";


const router = express.Router();

router.post("/signup", createAccount);
router.post("/login", loginUser);
router.post("/reset-password", resetPassword);
router.post("/send-otp", sendOTP);
router.post("/verify-otp", verifyOTP);

export default router;
