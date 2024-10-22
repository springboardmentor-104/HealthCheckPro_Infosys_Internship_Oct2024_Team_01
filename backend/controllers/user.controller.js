import User from "../models/user.model.js";
import jwt from "jsonwebtoken";


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

  const { email, password, username, gender, age, otp, confirmPassword } = req.body;

  const isVerified = await User.verifyOTP(email, otp).
    catch((err) => {
      return res.status(400).json({ message: err.message });
    });

  if (isVerified) {
    await User.signup(email, username, age, gender, password, confirmPassword, isVerified)
      .then((user) => {
        const token = createToken(user._id);
        return res.status(201).json({
          token,
          email,
          username
        });
      })
      .catch((err) => {
        return res.status(400).json({ message: err.message });
      }
      );
  }
  else {
    return res.status(400).json({ message: "OTP not verified" });
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
    const { otp, email, password, confirmPassword } = req.body;

    const isVerified = await User.verifyOTP(email, otp);
    if (isVerified) {
      await User.resetPassword(email, password, confirmPassword, isVerified).then(() => {
        return res.status(201).json({ message: "Password reset successfully" });
      })
      .catch((err) => {
        return res.status(400).json({ message: err.message });
      });
    }
    else {
      return res.status(400).json({ message: "OTP not verified" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const sendOTP = async (req, res) => {
  const { email } = req.body;
  await User.sendOTP(email)
    .then(() => {
      return res.status(201).json({ message: "OTP sent to your mail" });
    })
    .catch((err) => {
      return res.status(400).json({ message: err.message });
    });
}


export {
  createAccount,
  loginUser,
  resetPassword,
  sendOTP
};
