import { Router } from "express";
import { createUser, getUsers } from "../Controller/userController";

const router = Router();
/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Create user
 */
router.post("/", createUser);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users with optional filtering
 */
router.get("/", getUsers);
router.post("/", createUser);
router.get("/", getUsers);

export default router;
