import mongoose, { Document } from "mongoose";

// The full ITask interface, including user, dueDate, and recurrence
export interface ITask extends Document {
    title: string;
    description?: string;
    completed: boolean;
    user: mongoose.Schema.Types.ObjectId;
    dueDate?: Date; // NEW: Optional due date
    recurrence?: 'daily' | 'weekly' | 'monthly' | 'yearly'; // NEW: Optional recurrence pattern
    createdAt: Date;
    updatedAt: Date;
}

const TaskSchema = new mongoose.Schema<ITask>({
    title: { type: String, required: true },
    description: String,
    completed: { type: Boolean, default: false },
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: 'User'
    },
    // --- NEW FIELDS ---
    dueDate: { 
        type: Date, 
        required: false // Due date is optional
    },
    recurrence: {
        type: String,
        enum: ['daily', 'weekly', 'monthly', 'yearly', null], // Only allow specific strings or null
        required: false
    }
}, { timestamps: true });

const Task = mongoose.model<ITask>("Task", TaskSchema);

export default Task;




