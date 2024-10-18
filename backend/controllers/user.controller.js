import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import crypto from "crypto";

const createToken = (id) => {
  // JWTSKND (JWT Secret Key Not Defined)
  if (!process.env.JWT_SECRET_KEY) {
    throw new Error("Internal Server Error, Code:JWTSKND");
  }
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
};




const createAccount = async (req, res) => {
  try {
    const { email, password, username, confirmPassword } = req.body;

    const user = await User.signup(email, username, password, confirmPassword);

    const token = createToken(user._id);
    res.status(201).json({
      token,
      email,
      username
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ message: err.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.status(201).json({
      token,
      username: user.username,
      email,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;
    const user = await User.resetPassword(email, password, confirmPassword);
    const token = createToken(user._id);
    res.status(201).json({
      token,
      user,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    await User.sendOTP(email)
      .then(() => {
        res.status(201).json({ message: "OTP sent successfully" });
      }
      )
      .catch((err) => {
        res.status(400).json({ message: err.message });
      }
      );


  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.verifyOTP(email, otp);
    if (user) {
      res.status(201).json({ message: "OTP verified successfully" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

export {
  createAccount,
  loginUser,
  resetPassword,
  sendOTP,
  verifyOTP
};
