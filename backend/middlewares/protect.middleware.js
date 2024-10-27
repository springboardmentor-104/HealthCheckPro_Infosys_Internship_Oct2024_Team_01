import jwt from 'jsonwebtoken';
import User from "../models/user.model.js";
const { verify } = jwt;
// This function is used to protect the routes that require authentication before accessing them
export const protect = async (req, res, next) => {
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            const token = req.headers.authorization.split(" ")[1];
            if (!token) {
                return res.status(401).json({
                    message: "Not authorized, no token"
                })
            }
            const decoded = verify(token, process.env.JWT_SECRET_KEY);
            req.user = await User.findById(decoded.id).select("-password");
            next();
        } catch (err) {
            return res.status(401).json({
                message: "Not authorized, token failed",
                error: err
            })
        }
    } else {
        return res.status(404).json({
            message: "Headers is not set"
        })
    }
};