import { Request, Response } from "express";
import Task from "../models/taskModels";

/**
 * CRUD
 */

export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description, completed, user, dueDate, recurrence } = req.body;
    const task = await Task.create({ title, description, completed, user, dueDate, recurrence });
    return res.status(201).json(task);
  } catch (err) {
    return res.status(500).json({ message: "Error creating task", error: err });
  }
};

export const getTasks = async (req: Request, res: Response) => {
  try {
    // optional filter by user/query params
    const query: any = {};
    if (req.query.user) query.user = req.query.user;
    if (req.query.recurrence) query.recurrence = req.query.recurrence;
    const tasks = await Task.find(query).sort({ dueDate: 1, createdAt: -1 });
    return res.status(200).json(tasks);
  } catch (err) {
    return res.status(500).json({ message: "Error fetching tasks", error: err });
  }
};

export const getTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    return res.status(200).json(task);
  } catch (err) {
    return res.status(500).json({ message: "Error fetching task", error: err });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const updated = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Task not found" });
    return res.status(200).json(updated);
  } catch (err) {
    return res.status(500).json({ message: "Error updating task", error: err });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const removed = await Task.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404).json({ message: "Task not found" });
    return res.status(200).json({ message: "Task deleted" });
  } catch (err) {
    return res.status(500).json({ message: "Error deleting task", error: err });
  }
};

/**
 * Scheduling utilities
 *
 * - The idea: recurring tasks are stored with a `recurrence` and `dueDate`.
 * - A cron job runs daily, finds recurring tasks whose next due date falls today,
 *   and optionally creates a new task instance or advances the dueDate.
 *
 * Here we implement a generator that can be called manually (for demo) or by cron.
 */

function addRecurrenceToDate(date: Date, recurrence: string | null) {
  const dt = new Date(date);
  if (!recurrence) return null;
  switch (recurrence) {
    case "daily":
      dt.setDate(dt.getDate() + 1);
      return dt;
    case "weekly":
      dt.setDate(dt.getDate() + 7);
      return dt;
    case "monthly":
      dt.setMonth(dt.getMonth() + 1);
      return dt;
    case "yearly":
      dt.setFullYear(dt.getFullYear() + 1);
      return dt;
    default:
      return null;
  }
}

/**
 * Create next occurrences for recurring tasks that are due today or earlier.
 * Strategy (simple demo-friendly):
 * - Find tasks with recurrence != null and a non-null dueDate.
 * - If dueDate <= today AND task is completed OR even if not completed (configurable),
 *   create a new task for the next occurrence (same title/desc/user) and set its dueDate to next date.
 * - Optionally, mark the original as completed or leave it.
 */
export const generateRecurringTasks = async (markOriginalCompleted = false) => {
  const today = new Date();
  // normalize today's date (midnight)
  today.setHours(0, 0, 0, 0);

  const recurringTasks = await Task.find({
    recurrence: { $ne: null },
    dueDate: { $ne: null }
  });

  const created: any[] = [];

  for (const task of recurringTasks) {
    if (!task.dueDate) continue;
    const due = new Date(task.dueDate);
    due.setHours(0, 0, 0, 0);

    if (due.getTime() <= today.getTime()) {
      // compute next date
      const nextDate = addRecurrenceToDate(due, task.recurrence as string);
      if (!nextDate) continue;

      // create new task instance for next occurrence
      const nextTask = await Task.create({
        title: task.title,
        description: task.description,
        completed: false,
        user: task.user,
        dueDate: nextDate,
        recurrence: task.recurrence
      });
      created.push(nextTask);

      if (markOriginalCompleted) {
        task.completed = true;
        await task.save();
      } else {
        // Optionally advance the original task's dueDate forward instead of creating new
        // task.dueDate = nextDate;
        // await task.save();
      }
    }
  }

  return created;
};
