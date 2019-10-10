const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/user");

const userOne = {
  name: "User One",
  email: "email-User_One@example.com",
  password: "234234234fff"
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
    .send( userOne )
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

test("Should'nt login unknown user", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: "no@email",
      password: "NotARealPassword"
    })
    .expect(400);
});