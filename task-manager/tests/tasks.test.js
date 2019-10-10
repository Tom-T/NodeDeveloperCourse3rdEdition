const request = require("supertest");
const app = require("../src/app");
const Task = require("../src/models/task");
const { testUsers, testTasks, setupDatabase } = require("./fixtures/db");

beforeEach(setupDatabase);

test("Should create task for user", async () => {
  const response = await request(app)
    .post("/tasks")
    .set("Authorization", `Bearer ${testUsers[1].tokens[0].token}`)
    .send({ description: "Tests" })
    .expect(201);
  const task = await Task.findById(response.body._id);
  expect(task).not.toBeNull();
  expect(task.completed).toEqual(false);
});

test("Get all tasks for user[0]", async () => {
  const response = await request(app)
    .get("/tasks")
    .set("Authorization", `Bearer ${testUsers[0].tokens[0].token}`)
    .send()
    .expect(200);
    expect(response.body.length).toEqual(2)
});

test("user[1] Shouldn't be able to delete task[0] owned by user[0]", async () => {
  const response = await request(app)
    .delete(`/tasks/${testTasks[0]._id}`)
    .set("Authorization", `Bearer ${testUsers[1].tokens[0].token}`)
    .send()
    .expect(404);
});