import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Added name as required
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePic: {
    type: String, // Base64 encoded string
  },
  year: {
    type: Number,
    enum: [1, 2, 3, 4],
  },
  department: {
    type: String,
    enum: ["IT", "CS", "AI/ML", "Civil", "Mech", "EXTC"],
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Prefer Not to Say"],
  },
  skills: [{
    type: String,
  }],
  roles: [{
    type: String,
  }],
  experience: [{
    name: {
      type: String,
    },
    rank: {
      type: String,
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});
userSchema.pre('findOneAndUpdate', function() {
  this.set({ updatedAt: new Date() });
});
const User = mongoose.model("User", userSchema);
export default User;
