import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded) {
            return res.status(401).json({ message: "Unauthorized - Invalid token" });
        }
        req.user = await User.findById(decoded.userId).select("-password");
        next();
    } catch (err) {
        console.log("Error in protectRoute middleware: ", err.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}