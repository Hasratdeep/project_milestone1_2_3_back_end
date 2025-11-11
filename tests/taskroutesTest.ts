import express from "express";
import request from "supertest";
import taskRoutes from "../src/api/v1/routes/taskRoutes";

// Create a mini Express app for testing routes
const app = express();
app.use(express.json());
app.use("/api/tasks", taskRoutes);

describe("Task Routes", () => {
  it("should handle GET api tasks", async () => {
    const res = await request(app).get("/api/tasks");
    expect(res.status).toBe(200);
  });

  it("should handle POST api tasks", async () => {
    const res = await request(app)
      .post("/api/tasks")
      .send({ title: "Test Task", description: "Testing POST route" });
    expect(res.status).toBe(201);
  });

  it("should handle PUT api tasks ", async () => {
    const res = await request(app)
      .put("/api/tasks/1")
      .send({ title: "Updated Task" });
    expect(res.status).toBe(200);
  });

  it("should handle DELETE api tasks", async () => {
    const res = await request(app).delete("/api/tasks/1");
    expect(res.status).toBe(200);
  });
});
