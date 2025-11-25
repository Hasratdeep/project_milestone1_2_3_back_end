import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, minlength: 3, trim: true },
    password: { type: String, required: true, minlength: 4 },
  },
  { timestamps: true } 
);

export default model("User", userSchema);
