import { Request, Response } from "express";
import Task from "../models/taskModels";

export const getTasks = async (req: Request, res: Response) => {
  const tasks = await Task.find();
  res.json(tasks);
};

export const createTask = async (req: Request, res: Response) => {
  const task = new Task(req.body);
  await task.save();
  res.status(201).json(task);
};

export const updateTask = async (req: Request, res: Response) => {
  const updated = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

export const deleteTask = async (req: Request, res: Response) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
};