import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";

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

});

userSchema.statics.signup = async (email,username, password, confirmPassword) => {
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

const User = mongoose.model("users", userSchema);

export default User;
