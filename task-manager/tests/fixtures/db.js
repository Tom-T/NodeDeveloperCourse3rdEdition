const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../../src/models/user");

const testUserId = [new mongoose.Types.ObjectId(),new mongoose.Types.ObjectId()];
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

const setupDatabase = async () => {
  await User.deleteMany();
  await new User(testUsers[0]).save();
  await new User(testUsers[1]).save();
};

module.exports = {
  testUsers,
  setupDatabase
};
