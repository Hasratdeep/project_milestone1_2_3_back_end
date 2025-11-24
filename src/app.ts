import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./api/v1/config/database";
import taskRoutes from "./api/v1/routes/taskRoutes";

// Load environment variables
dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/v1/tasks", taskRoutes); 

export default app;
