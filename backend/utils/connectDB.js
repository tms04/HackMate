import mongoose from "mongoose";

export const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI, console.log("Connected to MongoDB"))
    .then((c) => console.log("Database Connected"))
    .catch((e) => console.log(e));
};