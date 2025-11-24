import express from "express";
import {
  createTask, getTasks, getTask, updateTask, deleteTask
} from "../controllers/taskController";

const router = express.Router();

// CRUD
router.post("/", createTask);
router.get("/", getTasks);
router.get("/:id", getTask);
router.patch("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
