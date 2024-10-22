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
    default: "username",
    required: true,
    trim: true,
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
    enum: ['Male', 'Female'],
    default: 'Male',
    trim: true,
  },
  passwordHash: {
    type: String,
    default: "password",
    required: true,
  },
  avatarUrl: {
    type: String,
    default: "",
  },
  otp: { type: String, trim: true },
  otpExpiry: { type: Date },

}, { timestamps: true });

userSchema.statics.signup = async (email, username, age, gender, password, confirmPassword, isVerified) => {

  if (!isVerified) {
    throw Error("OTP not verified");
  }

  if (!email || !password || !username || !age || !age || !gender) {
    throw Error("Please fill all the fields");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email is not valid. Please enter a valid email");
  }
  if (password !== confirmPassword) {
    throw Error("Passwords do not match");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Password is not strong enough.\nMust contain at least: \n8 characters \n1 uppercase \n1 lowercase \n1 number  \n1 symbol");
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHashed = await bcrypt.hash(password, salt);

  const user = await User.updateOne({ email },
    {
      $set: {
        username,
        age,
        gender,
        passwordHash: passwordHashed,
        avatarUrl: "",
        otp: null,
        otpExpiry: null
      }
    }
  ).catch((err) => {
    throw Error(err);
  });

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


userSchema.statics.resetPassword = async (email, password, confirmPassword, isVerified) => {

  
  if (!isVerified) {
    throw Error("OTP not verified");
  }

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

  const salt = await bcrypt.genSalt(10);
  const passwordHashed = await bcrypt.hash(password, salt);

  await User.updateOne({ email }, { $set: { passwordHash: passwordHashed } })
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

  
  const match = await bcrypt.compare(otp, user.otp)
  if (match) {
    user.otp = null;
    user.otpExpiry = null;
    await user.save();
    return true;
  } else {
    await User.deleteOne({ email });
    throw Error("Wrong OTP");
  }


}

userSchema.statics.sendOTP = async (email) => {
  if (!email) {
    throw Error("Please fill all the fields");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email is not valid. Please enter a valid email");
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
    const exists = await User.exists({ email });
    if (exists) {
      await User.updateOne({ email }, { $set: { otp: hashOTP, otpExpiry: Date.now() + 600000 } });
      
    }
    else {
      await new User({
        email,
        otp: hashOTP,
        otpExpiry: Date.now() + 600000,
      }).save();
      
    }
  }

}

const User = mongoose.model("users", userSchema);

export default User;
