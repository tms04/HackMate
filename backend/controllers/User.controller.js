import {User} from "../models/User.model.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/sendCookie.js";

// ✅ Register User

export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(userId)
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(402).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Profile deleted successfully" });
  } catch (error) {
    console.error("Error deleting profile:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const registerUser = async (req, res) => {
  try {
    const { name, username, email, password, profilePicture, experience, role, skills } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: "Username or Email already exists" });
    }
    console.log(password);
    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log(hashedPassword);
    // Create User
    const newUser = new User({
      name,
      username,
      email,
      password: hashedPassword,
      profilePicture,
      experience,
      role,
      skills,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    res.status(500).json({ message: "Error registering user", error: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, {
      password: 0,
      __v: 0
    }).lean();

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No users found'
      });
    }

    // Return users
    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      success: false,
      message: 'Server error occurred while fetching users',
      error: error.message
    });
  }
};

// ✅ Login User
export const loginUser = async (req, res) => {
  try {
    const { emailOrUsername, password } = req.body;
    console.log("Email/Username:", emailOrUsername); // Debugging Step
    // Find User in Database
    const user = await User.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
    });

    if (!user) return res.status(400).json({ message: "Invalid username or email" });

    console.log("Stored Password (Hashed):", user.password); // Debugging Step
    console.log("Entered Password (Plain):", password); // Debugging Step

    // Compare Passwords
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password Match:", isMatch); // Debugging Step

    if (!isMatch) return res.status(400).json({ message: "Invalid Credentials" });

    // Generate JWT Token
    const token = sendCookie(user._id, res);

    res.json({ message: "Login successful", token, userId: user._id });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// ✅ Logout User
export const logoutUser = (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", "", {
        maxAge: 0,
      })
      .json({
        success: true,
        message: "Successfully logged out",
      });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ✅ Get User Profile
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password"); // Exclude password
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile", error: error.message });
  }
};

export const getUsername = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ username: user.username });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getProfile = async (req, res) => {
  try {
    const userId = req.params.userId;
    
    // Find user without returning password
    const user = await User.findById(userId).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(200).json({
      name: user.name,
      year: user.year,
      department: user.department,
      gender: user.gender,
      skills: user.skills,
      roles: user.roles,
      experience: user.experience,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update user profile
export const updateProfile = async (req, res) => {
  try {
    const { 
      name,
      userId, 
      year, 
      department, 
      gender, 
      skills, 
      roles, 
      experience, 
      profilePic 
    } = req.body;
    console.log("Skills:", skills); // Debugging Step
    // Ensure userId matches authenticated user
    // if (userId !== req.user.id) {
    //   return res.status(403).json({ message: 'Not authorized to update this profile' });
    // }
    
    // Check if the profilePic is too large (optional size limit check)
    if (profilePic && profilePic.length > 5000000) { // Roughly 5MB limit
      return res.status(400).json({ message: 'Profile picture too large. Please upload a smaller image.' });
    }
    
    // Update user
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        name, // Added name field
        year,
        department,
        gender,
        skills,
        roles,
        experience,
        profilePic,
      },
      { new: true, runValidators: true }
    ).select('-password');
    
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(200).json({
      message: 'Profile updated successfully',
      user: {
        name: updatedUser.name, // Added name field in response
        year: updatedUser.year,
        department: updatedUser.department,
        gender: updatedUser.gender,
        skills: updatedUser.skills,
        roles: updatedUser.roles,
        experience: updatedUser.experience,
        // Don't send back the full profilePic to reduce response size
        hasProfilePic: !!updatedUser.profilePic
      }
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


// Check if a user with a given email exists
export const checkEmailExists = async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ 
        message: "Email is required", 
        exists: false 
      });
    }
    
    const user = await User.findOne({ email });
    
    return res.status(200).json({ 
      exists: !!user 
    });
  } catch (error) {
    return res.status(500).json({ 
      message: "Server error", 
      error: error.message, 
      exists: false 
    });
  }
};

// Register user via OAuth
export const registerOAuthUser = async (req, res) => {
  try {
    const { name, username, email, profilePic, clerkUserId } = req.body;
    console.log("OAuth registration request:", { name, username, email, clerkUserId });

    // Validate required fields
    if (!name || !username || !email || !clerkUserId) {
      return res.status(400).json({ 
        success: false, 
        message: "Missing required fields" 
      });
    }

    // Check if user exists with the same email or username
    const existingUser = await User.findOne({ 
      $or: [{ email }, { username }]
    });
    
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: "Username or Email already exists" 
      });
    }

    // Create new user with OAuth information
    const newUser = new User({
      name,
      username,
      email,
      profilePic,
      clerkUserId,
      // No password for OAuth users
    });

    await newUser.save();
    console.log("New OAuth user created:", newUser._id);

    // Generate JWT token
    const token = sendCookie(newUser._id, res);

    return res.status(201).json({ 
      success: true, 
      message: "User registered successfully with OAuth", 
      token,
      userId: newUser._id
    });
  } catch (error) {
    console.error("OAuth registration error:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Error registering OAuth user", 
      error: error.message 
    });
  }
};

// Login user via OAuth
export const loginOAuthUser = async (req, res) => {
  try {
    const { email, clerkUserId } = req.body;
    console.log("OAuth login request:", { email, clerkUserId });

    // Validate required fields
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      console.log("OAuth login failed: User not found with email", email);
      return res.status(404).json({ message: "User not found" });
    }

    console.log("OAuth login: User found", user._id);

    // Update the clerkUserId if it's not set
    if (!user.clerkUserId && clerkUserId) {
      user.clerkUserId = clerkUserId;
      await user.save();
      console.log("Updated clerkUserId for user", user._id);
    }

    // Generate JWT token
    const token = sendCookie(user._id, res);
    console.log("OAuth login successful for user", user._id);

    return res.status(200).json({ 
      message: "OAuth login successful", 
      token, 
      userId: user._id 
    });
  } catch (error) {
    console.error("OAuth login error:", error);
    return res.status(500).json({ 
      message: "Server error during OAuth login", 
      error: error.message 
    });
  }
};