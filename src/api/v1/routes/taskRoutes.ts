import { Router } from "express";
import { createTask, getTasks, getTask, updateTask, deleteTask } from "../Controller/taskController";

const router = Router();

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all tasks (with optional filtering)
 *     parameters:
 *       - in: query
 *         name: completed
 *         schema:
 *           type: string
 *           enum: [true, false]
 *         description: Filter by completion status
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [title, completed]
 *         description: Sort tasks by field
 *     responses:
 *       200:
 *         description: List of tasks
 */
router.get("/", getTasks);

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Get a task by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task details
 */
router.get("/:id", getTask);

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               completed:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Task created
 */
router.post("/", createTask);

/**
 * @swagger
 * /tasks/{id}:
 *   patch:
 *     summary: Update a task by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               completed:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Task updated
 */
router.patch("/:id", updateTask);

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete a task by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task deleted
 */
router.delete("/:id", deleteTask);

export default router;
