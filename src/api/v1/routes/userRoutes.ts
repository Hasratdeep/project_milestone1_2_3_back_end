import { Router } from "express";
import { signup, login, getUsers } from "../Controller/userController";

const router = Router();

// POST /signup
router.post("/signup", signup);

// POST /login
router.post("/login", login);

// GET all users
router.get("/", getUsers);

export default router;
