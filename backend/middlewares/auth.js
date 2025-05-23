// middleware/auth.js
import jwt from "jsonwebtoken";
import { User } from "../models/User.model.js";

export const auth = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // Check if user exists
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Set user in request
    req.user = { id: user._id.toString() };
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({ message: 'Token is not valid' });
  }
};