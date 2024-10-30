import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const generateToken = (id) => {
    // JWTSKND (JWT Secret Key Not Defined)
    if (!process.env.JWT_SECRET_KEY) {
      throw new Error("Internal Server Error, Code:JWTSKND");
    }
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

export default generateToken;