import mongoose, { Document, Schema } from "mongoose";

export interface ITask extends Document {
  title: string;
  description?: string;
  status: "pending" | "completed";
  dueDate?: Date;
}

const taskSchema: Schema<ITask> = new Schema({
  title: { type: String, required: true, minlength: 3, maxlength: 100 },
  description: { type: String, maxlength: 500 },
  status: { type: String, enum: ["pending", "completed"], default: "pending" },
  dueDate: {
    type: Date,
    validate: {
      validator: (v: Date) => !v || v >= new Date(),
      message: "Due date cannot be in the past",
    },
  },
}, { timestamps: true });

export default mongoose.model<ITask>("Task", taskSchema);
