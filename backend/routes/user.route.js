import express from "express";
import { createAccount, loginUser, resetPassword,sendOTP,verifyOTP} from "../controllers/authentication.controller.js";


const router = express.Router();

/**
 * @swagger
 * /api/user/signup:
 *   post:
 *     summary: Create a new user account
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - confirmPassword
 *               - username
 *               - age
 *               - gender
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email.
 *               password:
 *                 type: string
 *                 description: The user's password.
 *               confirmPassword:
 *                 type: string
 *                 description: The user's password confirmation.
 *               username:
 *                 type: string
 *                 description: The user's username.
 *               age:
 *                 type: number
 *                 description: The user's age.
 *               gender:
 *                 type: string
 *                 description: The user's gender.
 *     responses:
 *       200:
 *         description: User created successfully.
 *       400:
 *         description: Bad request.
 *       500:
 *         description: Internal server error.
 */
router.post("/signup", createAccount);


/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Log in a user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email.
 *               password:
 *                 type: string
 *                 description: The user's password.
 *     responses:
 *       200:
 *         description: User logged in successfully.
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: Internal server error.
 */
router.post("/login", loginUser);

/**
 * @swagger
 * /api/user/reset-password:
 *   post:
 *     summary: Reset user password
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - confirmPassword
 *               - otp
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email.
 *               password:
 *                 type: string
 *                 description: The new password.
 *               confirmPassword:
 *                 type: string
 *                 description: The new password confirmation.
 *               otp:
 *                 type: string
 *                 description: The OTP sent to the user's email.
 *     responses:
 *       200:
 *         description: Password reset successfully.
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: Internal server error.
 */
router.post("/reset-password", resetPassword);


/**
 * @swagger
 * /api/user/send-otp:
 *   post:
 *     summary: Send an OTP to the user's email
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email.
 *     responses:
 *       200:
 *         description: OTP sent successfully.
 *       400:
 *         description: Bad request.
 *       500:
 *         description: Internal server error.
 */
router.post("/send-otp", sendOTP);


/**
 * @swagger
 * /api/user/verify-email:
 *   post:
 *     summary: Verify the OTP sent to the user's email
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - otp
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email.
 *               otp:
 *                 type: string
 *                 description: The OTP sent to the user's email.
 *     responses:
 *       200:
 *         description: Email verified successfully.
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: Internal server error.
 */

router.post("/verify-email", verifyOTP);


export default router;
