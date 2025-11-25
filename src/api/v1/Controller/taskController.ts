import { Request, Response } from "express";
import Task from "../Model/taskModel";

// Create a new task with validation
export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, completed } = req.body;
    if (!title || typeof title !== "string" || title.trim().length < 3) {
      return res.status(400).json({ msg: "Title is required and must be at least 3 characters" });
    }

    const task = new Task({
      title: title.trim(),
      completed: completed === true
    });

    await task.save();
    res.status(201).json(task);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// Get all tasks with optional filtering and sorting
export const getTasks = async (req: Request, res: Response) => {
  try {
    const { completed, sortBy } = req.query;
    const filter: any = {};

    if (completed !== undefined) {
      if (completed === "true") filter.completed = true;
      else if (completed === "false") filter.completed = false;
    }

    // Sorting
    const sortOption: any = {};
    if (sortBy === "title") sortOption.title = 1; 
    else if (sortBy === "completed") sortOption.completed = 1;

    const tasks = await Task.find(filter).sort(sortOption);
    res.json(tasks);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single task by ID
export const getTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json(task);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// Update a task by ID with validation
export const updateTask = async (req: Request, res: Response) => {
  try {
    const { title, completed } = req.body;

    // Validation
    if (title && (typeof title !== "string" || title.trim().length < 3)) {
      return res.status(400).json({ msg: "Title must be at least 3 characters" });
    }

    const updatedData: any = {};
    if (title) updatedData.title = title.trim();
    if (completed !== undefined) updatedData.completed = completed === true;

    const task = await Task.findByIdAndUpdate(req.params.id, updatedData, { new: true, runValidators: true });
    if (!task) return res.status(404).json({ error: "Task not found" });

    res.json(task);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a task by ID
export const deleteTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json({ message: "Task deleted successfully" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
