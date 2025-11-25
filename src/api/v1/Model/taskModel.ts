
import { Schema, model } from "mongoose";

const taskSchema = new Schema({
    title: { type: String, required: true },
    completed: { type: Boolean, default: false },
});

export default model("Task", taskSchema);
