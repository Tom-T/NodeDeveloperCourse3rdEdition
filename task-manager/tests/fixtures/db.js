const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../../src/models/user");
const Task = require("../../src/models/task");

const testUserId = [new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId()];
const testUsers = [
  {
    _id: testUserId[0],
    name: "Test User0",
    email: "email-Test_User0@example.com",
    password: "fff234234234",
    tokens: [
      {
        token: jwt.sign({ _id: testUserId[0] }, process.env.JWT_TOKEN)
      }
    ]
  },
  {
    _id: testUserId[1],
    name: "Test User1",
    email: "email-Test_User1@example.com",
    password: "234234234fff",
    tokens: [
      {
        token: jwt.sign({ _id: testUserId[1] }, process.env.JWT_TOKEN)
      }
    ]
  }
];

const testTasks = [
  {
    _id: new mongoose.Types.ObjectId(),
    description: "First task",
    completed: false,
    owner: testUsers[0]._id
  },
  {
    _id: new mongoose.Types.ObjectId(),
    description: "Second task",
    completed: true,
    owner: testUsers[0]._id
  },
  {
    _id: new mongoose.Types.ObjectId(),
    description: "Third task",
    completed: false,
    owner: testUsers[1]._id
  }
];

const setupDatabase = async () => {
  await User.deleteMany();
  await Task.deleteMany();
  await new User(testUsers[0]).save();
  await new User(testUsers[1]).save();
  await new Task(testTasks[0]).save();
  await new Task(testTasks[1]).save();
  await new Task(testTasks[2]).save();
};

module.exports = {
  testUsers,
  testTasks,
  setupDatabase
};
