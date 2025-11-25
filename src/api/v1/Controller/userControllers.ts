import { Request, Response } from "express";
import User, { IUser } from "../Model/userModel";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const user: IUser = new User({ username, email, password });
    await user.save();
    res.status(201).json(user);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
