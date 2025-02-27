import express from "express";
import { registerUser, loginUser, getUserProfile } from "../controllers/User.controller.js";

const router = express.Router();

// Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile/:id", getUserProfile);

export default router;
