import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Added name as required
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture: { type: String }, // Profile picture field
  experience: [
    {
      name: String, // Hackathon name or experience name
      rank: String, // Rank achieved
    },
  ],
  role: { type: [String] }, // User's selected roles
  skills: { type: [String] }, // User's selected skills
});

const User = mongoose.model("User", userSchema);
export default User;
