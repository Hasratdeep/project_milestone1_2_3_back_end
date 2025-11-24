import { Router } from "express";
import { createUser, getUsers } from "../controllers/userController";

const router = Router();

router.post("/", createUser);
router.get("/", getUsers);
router.post("/signup", (req, res) => {
  res.json({ message: "Signup endpoint works" });
});

router.post("/login", (req, res) => {
  res.json({ message: "Login endpoint works" });
});

router.get("/", (req, res) => {
  res.json({ message: "Get all users works" });
});

export default router;

