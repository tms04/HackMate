import User from "../models/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if email or username already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: "Username or Email already exists" });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    // ✅ Generate JWT Token
    const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY, { expiresIn: "1h" });

    res.status(201).json({ message: "User registered successfully", token });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};




export const loginUser = async (req, res) => {
  try {
    const { emailOrUsername, password } = req.body;
    console.log("Email/Username:", emailOrUsername); // Debugging Step
    // **Find User in Database**
    const user = await User.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
    });

    if (!user) return res.status(400).json({ message: "Invalid username or email" });

    console.log("Stored Password (Hashed):", user.password); // Debugging Step
    console.log("Entered Password (Plain):", password); // Debugging Step

    // **Compare Passwords**
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password Match:", isMatch); // Debugging Step

    if (!isMatch) return res.status(400).json({ message: "Invalid Credentials" });

    // **Generate JWT Token**
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: "1h" });

    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
