import Task from "../src/api/v1/models/taskModels";

describe("Task Model", () => {
  it("should create a new task with given details", () => {
    const task = new Task({
      title: "My First Task",
      description: "Testing task model",
      completed: false,
    });

    // Check if the fields are correctly assigned
    expect(task.title).toBe("My First Task");
    expect(task.description).toBe("Testing task model");
    expect(task.completed).toBe(false);
  });

  it("should automatically set 'completed' to false if not provided", () => {
    const task = new Task({ title: "Incomplete Task" });
    expect(task.completed).toBe(false);
  });
});

