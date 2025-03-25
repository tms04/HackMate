import express from "express";
import { 
  registerUser, 
  loginUser, 
  getUserProfile, 
  getUsername, 
  getProfile, 
  updateProfile, 
  getAllUsers, 
  logoutUser,
  checkEmailExists,
  registerOAuthUser,
  loginOAuthUser,
  deleteUser
} from "../controllers/User.controller.js";

const router = express.Router();

// Regular Auth Routes
router.get('/all', getAllUsers);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/profile/:id", getUserProfile);
router.get("/username/:userId", getUsername);
router.post('/update', updateProfile);
router.delete("/:userId", deleteUser);
router.get('/:userId', getProfile);

// OAuth Routes
router.post("/check-email", checkEmailExists);
router.post("/register-oauth", registerOAuthUser);
router.post("/oauth-login", loginOAuthUser);

export default router;
