import express from "express";
import { registerUser, loginUser, getUserProfile, getUsername, getProfile, updateProfile, getAllUsers } from "../controllers/User.controller.js";

const router = express.Router();

// Routes
router.get('/all', getAllUsers);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile/:id", getUserProfile);
router.get("/username/:userId", getUsername);
router.get('/:userId', getProfile);
router.post('/update', updateProfile);


export default router;
