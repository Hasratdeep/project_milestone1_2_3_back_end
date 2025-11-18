import mongoose from "mongoose";

export interface Task {
  name: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  completed: { type: Boolean, default: false },
}); 

// Model
const Task = mongoose.model("Task", taskSchema);

export default Task;