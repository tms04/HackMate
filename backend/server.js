import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/User.route.js";
import teamRoutes from "./routes/team.routes.js";
import cors from "cors";
import morgan from "morgan";
import { connectDB } from "./utils/connectDB.js";

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json()); // Middleware for JSON parsing

// CORS Configuration
const allowedOrigins = [
  "http://localhost:5173",  // Local development
  "https://your-frontend-url.onrender.com", // Replace with your frontend URL on Render
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl requests)
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true, // Allow credentials (cookies, authorization headers)
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  })
);

app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' })); // Increased limit for base64 images
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/team", teamRoutes);

// Basic Route to check if the server is working
app.get("/", (req, res) => {
  res.send("Working");
});

// Database Connection
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});