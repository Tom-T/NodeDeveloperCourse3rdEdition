const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../../src/models/user");


const testUserId = new mongoose.Types.ObjectId();
const testUser = {
  _id: testUserId,
  name: "Test User1",
  email: "email-Test_User1@example.com",
  password: "234234234fff",
  tokens: [
    {
      token: jwt.sign({ _id: testUserId }, process.env.JWT_TOKEN)
    }
  ]
};


const setupDatabase = async () => {
  await User.deleteMany();
  await new User(testUser).save();
}

module.exports = {
  testUser,
  testUserId,
  setupDatabase
};