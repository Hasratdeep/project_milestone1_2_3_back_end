import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import taskRoutes from "./api/v1/Routes/taskRoutes";
import userRoutes from "./api/v1/Routes/userRoutes";

dotenv.config();
mongoose
  .connect("mongodb://localhost:27017/Milestone3")
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log("Error:", err));

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1/tasks", taskRoutes);
app.use("/api/v1/users", userRoutes);

export default app;

