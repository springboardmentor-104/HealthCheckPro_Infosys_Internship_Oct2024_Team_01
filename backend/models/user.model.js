import mongoose from "mongoose";


export let otpStore = {}; // temporary store for OTPs
export let verifiedEmails = {}; // temporary store for verified mails


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
    default: "username",
    trim: true,
    min: 2,
    max: 50,
  },
  age: {
    type: Number,
    required: true,
    min: 18,
    max: 99,
    default: 18,
  },
  gender: {
    type: String,
    required: true,
    enum: ['Male', 'Female', 'Other'],
    default: 'Male',
    trim: true,
  },
  password: {
    type: String,
    default: "password",
    required: true,
  },
  profilePic: {
    type: String,
    default: "",
  }
}, { timestamps: true });


userSchema.statics.verifyOTP = async (email, otp) => {
  if (otpStore[email] === otp) {
    verifiedEmails[email] = true
    delete otpStore[email]
    res.status(200).json({ message: "Email verified successfully!" })
  } else {
    throw new Error("Invalid OTP");
  }
}


const User = mongoose.model("Users", userSchema);

export default User;
