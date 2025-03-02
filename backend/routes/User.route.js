import express from "express";
import { registerUser, loginUser, getUserProfile, getUsername } from "../controllers/User.controller.js";

const router = express.Router();

// Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile/:id", getUserProfile);
router.get("/username/:userId", getUsername);

export default router;
