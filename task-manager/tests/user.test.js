const request = require("supertest");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const app = require("../src/app");
const User = require("../src/models/user");
const userOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  name: "User One",
  email: "email-User_One@example.com",
  password: "234234234fff",
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, process.env.JWT_TOKEN)
    }
  ]
};

beforeEach(async () => {
  await User.deleteMany();
  await new User(userOne).save();
});

test("Should signup a new user", async () => {
  await request(app)
    .post("/users")
    .send({
      name: "Test User",
      email: "email@example.com",
      password: "jfjrj4j4j"
    })
    .expect(201);
});
test("Should'nt create existing user", async () => {
  await request(app)
    .post("/users")
    .send(userOne)
    .expect(400);
});

test("Should login existing user", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: userOne.password
    })
    .expect(200);
});

test("Shouldn't login unknown user", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: "no@email",
      password: "NotARealPassword"
    })
    .expect(400);
});

test("Should get profile for user", async () => {
  await request(app)
    .get("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test("Shouldn't get profile for user", async () => {
  await request(app)
    .get("/users/me")
    .send()
    .expect(401);
});

test("Shouldn't delete profile for user", async () => {
  await request(app)
    .delete("/users/me")
    .send()
    .expect(401);
});

test("Should delete profile for user", async () => {
  await request(app)
    .delete("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(202);
});
