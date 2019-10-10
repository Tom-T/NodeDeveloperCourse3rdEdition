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
const userTwo = {
  name: "User Two",
  email: "email-User_Two@example.com",
  password: "234234234fff"
};

beforeEach(async () => {
  await User.deleteMany();
  await new User(userOne).save();
});

test("Should signup a new user", async () => {
  const response = await request(app)
    .post("/users")
    .send({
      name: userTwo.name,
      email: userTwo.email,
      password: userTwo.password
    })
    .expect(201);

  //Assert that the database was changed correctly
  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();

  //Assertions about the response
  expect(response.body).toMatchObject({
    user: {
      name: userTwo.name,
      email: userTwo.email.toLowerCase()
    }
  });
  expect(user.password).not.toBe(userTwo.password);
});
test("Should'nt create existing user", async () => {
  await request(app)
    .post("/users")
    .send({
      name: userOne.name,
      email: userOne.email,
      password: userOne.password
    })
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
