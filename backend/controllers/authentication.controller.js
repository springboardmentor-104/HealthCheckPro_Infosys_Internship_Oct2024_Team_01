import User, { verifiedEmails, otpStore } from "../models/user.model.js";
import generateToken from "../helpers/generateToken.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

// Helper function for error responses
const handleError = (res, message, statusCode = 400) => {
  if (!res.headersSent) {
    res.status(statusCode).json({ message });
  }
};

// Helper function to validate email format
const validateEmail = (email) => {
  if (!email) throw new Error("Email is required");
  if (!validator.isEmail(email)) throw new Error("Invalid email format");
};

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      throw new Error("Please fill all the fields");
    }

    if (!validator.isEmail(email)) {
      throw new Error("Email is not valid. Please enter a valid email");
    }

    // Set up nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Save the OTP in the temporary store
    otpStore[email] = otp;

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is ${otp}`,
    };

    // Attempt to send email
    const emailRes = await transporter.sendMail(mailOptions);
    
    if (emailRes) {
      verifiedEmails[email] = otp; // Store verified emails
      return res.status(201).json({ message: "OTP sent to your mail" });
    }
  } catch (err) {
    if (!res.headersSent) { // Ensure response is not sent twice
      return res.status(400).json({ message: err.message });
    }
  }
};


const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    validateEmail(email);

    if (!otp) throw new Error("OTP is required");

    if (otpStore[email]?.otp !== otp) {
      throw new Error("Invalid OTP");
    }

    verifiedEmails[email] = true;
    delete otpStore[email];

    return res.status(200).json({ message: "Email verified successfully!" });
  } catch (err) {
    handleError(res, err.message);
  }
};

const createAccount = async (req, res) => {
  try {
    const { email, password, username, gender, age, confirmPassword } = req.body;

    if (!username || !age || !gender) {
      throw new Error("All fields are required");
    }
    validateEmail(email);

    if (password !== confirmPassword) {
      throw new Error("Passwords do not match");
    }

    if (!validator.isStrongPassword(password)) {
      throw new Error("Password is not strong enough");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      username,
      gender,
      age,
      password: hashedPassword,
      profilePic: "",
    });

    const token = generateToken(user._id);
    return res.status(201).json({ token, email, username, profilePic: "" });
  } catch (err) {
    handleError(res, err.message);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    validateEmail(email);

    if (!password) throw new Error("Password is required");

    const user = await User.findOne({ email });
    if (!user) throw new Error("User does not exist");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Incorrect password");

    const token = generateToken(user._id);
    return res.status(200).json({ token, username: user.username, email });
  } catch (err) {
    handleError(res, err.message);
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;
    validateEmail(email);

    if (password !== confirmPassword) {
      throw new Error("Passwords do not match");
    }

    if (!validator.isStrongPassword(password)) {
      throw new Error("Password is not strong enough");
    }

    const user = await User.findOne({ email });
    if (!user) throw new Error("User does not exist");

    user.password = await bcrypt.hash(password, 10);
    await user.save();

    delete otpStore[email];

    return res.status(200).json({ message: "Password reset successfully!" });
  } catch (err) {
    handleError(res, err.message);
  }
};

export {
  createAccount,
  loginUser,
  resetPassword,
  sendOTP,
  verifyOTP,
};
