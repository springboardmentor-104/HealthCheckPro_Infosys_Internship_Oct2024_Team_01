import express from "express";
import { createAccount, loginUser, resetPassword,sendOTP} from "../controllers/user.controller.js";


const router = express.Router();

router.post("/signup", createAccount);
router.post("/login", loginUser);
router.post("/reset-password", resetPassword);
router.post("/send-otp", sendOTP);


export default router;
