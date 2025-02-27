import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/User.route.js";
import cors from "cors";
import morgan from "morgan";
import { connectDB } from "./utils/connectDB.js";

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json()); // Middleware for JSON parsing
app.use(cors()); // Middleware for CORS
app.use(morgan('dev'));

// Routes
app.use("/api/users", userRoutes);

// Basic Route to check if the server is working
app.get("/", (req, res) => {
  res.send("Working");
});

// Database Connection
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});