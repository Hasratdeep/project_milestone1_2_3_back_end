import { Request, Response } from "express";
import Task from "../Model/taskModel";

// Create task
export const createTask = async (req: Request, res: Response) => {
    const { title, completed } = req.body;
    if (!title) return res.status(400).json({ msg: "Title required" });
    const task = new Task({ title, completed: completed || false });
    await task.save();
    res.status(201).json(task);
};

// Get tasks with filtering & sorting
export const getTasks = async (req: Request, res: Response) => {
    const { completed } = req.query;
    const filter: any = {};
    if (completed !== undefined) filter.completed = completed === "true";
    const tasks = await Task.find(filter).sort({ title: 1 });
    res.json(tasks);
};

export const getTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json(task);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json(task);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json({ message: "Task deleted successfully" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}; 