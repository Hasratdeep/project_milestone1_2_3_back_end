import { Router } from "express";
import { createUser, getUsers } from "../Controller/userControllers";

const router = Router();

router.post("/", createUser);
router.get("/", getUsers);

export default router;
