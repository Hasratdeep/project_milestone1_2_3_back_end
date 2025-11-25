import { Router } from "express";
import { login, createUser, getUsers } from "../Controller/userController";

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
 * /users/signup:
 *   post:
 *     summary: Register a new user
 */
router.post("/", login);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users with optional filtering
 */
router.get("/", getUsers);

router.post("/", createUser);
router.get("/", getUsers);
router.get("/", login);

export default router;


