import { Request, Response } from "express";
import User from "../Model/userModel";

// Signup - create a new user
export const signup = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    if (!username || username.trim().length < 3) {
      return res.status(400).json({ msg: "Username must be at least 3 characters" });
    }
    if (!password || password.length < 4) {
      return res.status(400).json({ msg: "Password must be at least 4 characters" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ username: username.trim() });
    if (existingUser) {
      return res.status(400).json({ msg: "Username already exists" });
    }

    const user = await User.create({ username: username.trim(), password });
    res.status(201).json({ msg: "User created successfully", user });
  } catch (error: any) {
    res.status(500).json({ msg: "Error creating user", error: error.message });
  }
};

// Login is verification for username and password
export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ msg: "Username and password required" });
    }

    const user = await User.findOne({ username: username.trim(), password });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    res.status(200).json({ msg: "Login successful", user });
  } catch (error: any) {
    res.status(500).json({ msg: "Error logging in", error: error.message });
  }
};

// Get all users
export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ msg: "Error fetching users", error: error.message });
  }
};
