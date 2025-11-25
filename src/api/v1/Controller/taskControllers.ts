import { Request, Response } from "express";
import Task, { ITask } from "../Model/taskModel";

export const createTask = async (req: Request, res: Response) => {
  try {
    const task: ITask = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const getTasks = async (req: Request, res: Response) => {
  try {
    const { status, sortBy, order } = req.query;
    const filter: any = {};
    if (status) filter.status = status;

    const sort: any = {};
    if (sortBy) sort[sortBy as string] = order === "desc" ? -1 : 1;

    const tasks = await Task.find(filter).sort(sort);
    res.json(tasks);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
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
