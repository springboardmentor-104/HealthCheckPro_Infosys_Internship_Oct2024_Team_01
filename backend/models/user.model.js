import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";
import nodemailer from "nodemailer";

const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    trim: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  avatarUrl: {
    type: String,
    default: "",
  },
  otp: { type: String, trim: true },
  otpExpiry: { type: Date },

});

userSchema.statics.signup = async (email, username, password, confirmPassword) => {
  if (!email || !password) {
    throw Error("Please fill all the fields");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email is not valid. Please enter a valid email");
  }
  if (password !== confirmPassword) {
    throw Error("Passwords do not match");
  }

  const exists = await User.findOne({ email });
  if (exists) {
    throw Error("User already exists");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Password is not strong enough. Must contain at least 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 symbol");
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHashed = await bcrypt.hash(password, salt);

  const user = await new User({
    email,
    username,
    passwordHash: passwordHashed,
  }).save();

  return user;
};

userSchema.statics.login = async (email, password) => {
  if (!email || !password) {
    throw Error("Please fill all the fields");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw Error("User does not exist");
  }

  const match = await bcrypt.compare(password, user.passwordHash);

  if (match) {
    return user;
  } else {
    throw Error("Wrong password");
  }
};

userSchema.statics.sendOTP = async (email) => {
  if (!email) {
    throw Error("Please fill all the fields");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email is not valid. Please enter a valid email");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw Error("User does not exist");
  }

  // Send an email with the OTP code
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      // Your email
      user: process.env.EMAIL,
      // If you are use 2FA, you need to generate an app password
      // Go to google account settings -> Security -> App Passwords
      pass: process.env.EMAIL_PASSWORD,
    },
  });


  // Generates a 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const hashOTP = await bcrypt.hash(otp, 10);

  // Save the hashed OTP and the expiry time in the database

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is ${otp}`,
  };

  const res = await transporter.sendMail(mailOptions);

  if (res) {
    user.otp = hashOTP;
    // Date + 10 minutes in milliseconds (10 * 60s * 1000ms)
    user.otpExpiry = Date.now() + 10 * 60 * 1000;
    await user.save();
    return;
  }

  

}

userSchema.statics.resetPassword = async (email, password, confirmPassword) => {
  if (!email || !password || !confirmPassword) {
    throw Error("Please fill all the fields");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email is not valid. Please enter a valid email");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Password is not strong enough. Must contain at least 6 characters, 1 uppercase, 1 lowercase, 1 number and 1 symbol");
  }

  if (password !== confirmPassword) {
    throw Error("Passwords do not match");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw Error("User does not exist");
  }
  const salt = await bcrypt.genSalt(10);
  const passwordHashed = await bcrypt.hash(password, salt);
  user.passwordHash = passwordHashed;
  await user.save();
  return user;
};

userSchema.statics.verifyOTP = async (email, otp) => {
  if (!email || !otp) {
    throw Error("Please fill all the fields");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email is not valid. Please enter a valid email");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw Error("User does not exist");
  }

  if (!user.otp) {
    throw Error("No OTP was sent to this user");
  }

  if (Date.now() > user.otpExpiry) {
    throw Error("OTP has expired");
  }

  const match = await bcrypt.compare(otp, user.otp);

  if (match) {
    // Clear OTP and expiry after successful verification
    user.otp = null;
    user.otpExpiry = null;
    await user.save();
    return user;
  } else {
    throw Error("Wrong OTP");
  }
}

const User = mongoose.model("users", userSchema);

export default User;
