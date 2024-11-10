import User, {
  verifiedEmails,
  otpStore
} from "../models/user.model.js";
import generateToken from "../helpers/generateToken.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      throw new Error("Please fill all the fields");
    }

    if (!validator.isEmail(email)) {
      throw new Error("Email is not valid. Please enter a valid email");
    }

    // Send an email with the OTP code
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Generates a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Save the OTP in the temporary store
    otpStore[email] = otp;

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is ${otp}`,
    };

    const emailRes = await transporter.sendMail(mailOptions)
      .catch((err) => {
        return res.status(400).json({ message: err.message });
      });

    if (emailRes) {
      verifiedEmails[email] = otp;
      // console.log('=== verifiedEmails authentication.controller.js [51] ===', verifiedEmails,otpStore);
    }

    return res.status(201).json({ message: "OTP sent to your mail" });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    // console.log('=== email,otp authentication.controller.js [63] ===', email,otp);

    if (!email || !otp) {
      throw new Error("Please fill all the fields");
    }

    if (!validator.isEmail(email)) {
      throw new Error("Email is not valid. Please enter a valid email");
    }

    if(otpStore[email] !== otp){
      throw new Error("OTP not verified");
    }

    verifiedEmails[email] = true;
    delete otpStore[email];

    res.status(200).json({ message: "Email verified successfully!" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const createAccount = async (req, res) => {
  try {
    const { email, password, username, gender, age, confirmPassword } = req.body;

    if (!email || !password || !username || !age || !gender) {
      throw new Error("Please fill all the fields");
    }

    if (!validator.isEmail(email)) {
      throw new Error("Email is not valid. Please enter a valid email");
    }

    if (password !== confirmPassword) {
      throw new Error("Passwords do not match");
    }

    if (!validator.isStrongPassword(password)) {
      throw new Error("Password is not strong enough.\nMust contain at least: \n8 characters \n1 uppercase \n1 lowercase \n1 number  \n1 symbol");
    }

    const genSalt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, genSalt);

    const user = await User.create({
      email,
      username,
      gender,
      age,
      password: hashedPassword,
      profilePic: ""
    })

    user.save();

    const token = generateToken(user._id);
    return res.status(201).json({
      token,
      email,
      username,
      profilePic: ""
    });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("Please fill all the fields");
    }

    if (!validator.isEmail(email)) {
      throw new Error("Email is not valid");
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("User does not exist");
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw new Error("Wrong password");
    }

    const token = generateToken(user._id);
    res.status(201).json({
      token,
      username: user.username,
      email,
      age: user.age,
      gender: user.gender
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const resetPassword = async (req, res) => {
  const { email, password,confirmPassword } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User does not exist");
    }

    if (password !== confirmPassword) {
      throw new Error("Passwords do not match");
    }

    if (!validator.isStrongPassword(password)) {
      throw new Error("Password is not strong enough.\nMust contain at least: \n8 characters \n1 uppercase \n1 lowercase \n1 number  \n1 symbol");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user.password = hashedPassword;
    await user.save();

    delete otpStore[email];

    res.status(200).json({ message: "Password reset successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};


export {
  createAccount,
  loginUser,
  resetPassword,
  sendOTP,
  verifyOTP
};
