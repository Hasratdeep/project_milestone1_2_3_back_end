import { Request, Response } from "express";
import * as taskController from "../src/api/v1/controllers/taskController";
import Task from "../src/api/v1/models/taskModels";

// Mock the Task model
jest.mock("../src/api/v1/models/taskModels");

describe("Task Controller", () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;

  beforeEach(() => {
    jest.clearAllMocks();

    mockReq = {
      params: {},
      body: {},
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  // GET
  describe("getTasks", () => {
    it("should return all tasks", async () => {
      const mockTasks = [{ title: "Test Task" }];
      (Task.find as jest.Mock).mockResolvedValue(mockTasks);

      await taskController.getTasks(mockReq as Request, mockRes as Response);

      expect(Task.find).toHaveBeenCalled();
      expect(mockRes.json).toHaveBeenCalledWith(mockTasks);
    });
  });

  // CREATE
  describe("createTask", () => {
    it("should create a new task", async () => {
      const mockTask = { title: "New Task" };
      mockReq.body = mockTask;

      (Task as unknown as jest.Mock).mockImplementation(() => ({
        save: jest.fn().mockResolvedValue(mockTask),
      }));

      await taskController.createTask(mockReq as Request, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith(mockTask);
    });
  });

  // UPDATE
  describe("updateTask", () => {
    it("should update a task", async () => {
      const updatedTask = { _id: "1", title: "Updated Task" };
      mockReq.params = { id: "1" };
      mockReq.body = { title: "Updated Task" };

      (Task.findByIdAndUpdate as jest.Mock).mockResolvedValue(updatedTask);

      await taskController.updateTask(mockReq as Request, mockRes as Response);

      expect(Task.findByIdAndUpdate).toHaveBeenCalledWith("1", { title: "Updated Task" }, { new: true });
      expect(mockRes.json).toHaveBeenCalledWith(updatedTask);
    });
  });

  // DELETE
  describe("deleteTask", () => {
    it("should delete a task", async () => {
      mockReq.params = { id: "1" };
      (Task.findByIdAndDelete as jest.Mock).mockResolvedValue({});

      await taskController.deleteTask(mockReq as Request, mockRes as Response);

      expect(Task.findByIdAndDelete).toHaveBeenCalledWith("1");
      expect(mockRes.json).toHaveBeenCalledWith({ message: "Task deleted" });
    });
  });
});
