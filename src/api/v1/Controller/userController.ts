import { Request, Response } from "express";
import User from "../Model/userModel";

// Simple s
export const createUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ msg: "All fields required" });
    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ msg: "User created", user });
};

// Simple login
export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });
    res.json({ msg: "Login successful", user });
};

// Get all users with optional filtering
export const getUsers = async (req: Request, res: Response) => {
    const { username } = req.query;
    const filter: any = {};
    if (username) filter.username = username;
    const users = await User.find(filter).sort({ username: 1 });
    res.json(users);
};
