const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/user");
const { testUser, testUserId, setupDatabase } = require("./fixtures/db");


const newUser = {
  name: "New User",
  email: "email-New_User@example.com",
  password: "234234234fff"
};

beforeEach(setupDatabase);

test("Should signup a new user", async () => {
  const response = await request(app)
    .post("/users")
    .send({
      name: newUser.name,
      email: newUser.email,
      password: newUser.password
    })
    .expect(201);

  //Assert that the database was changed correctly
  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();

  //Assertions about the response
  expect(response.body).toMatchObject({
    user: {
      name: newUser.name,
      email: newUser.email.toLowerCase()
    }
  });
  expect(user.password).not.toBe(newUser.password);
});
test("Should'nt create existing user", async () => {
  await request(app)
    .post("/users")
    .send({
      name: testUser.name,
      email: testUser.email,
      password: testUser.password
    })
    .expect(400);
});

test("Should login existing user", async () => {
  response = await request(app)
    .post("/users/login")
    .send({
      email: testUser.email,
      password: testUser.password
    })
    .expect(200);

  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();
  expect(response.body.token).toBe(user.tokens[1].token);
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
    .set("Authorization", `Bearer ${testUser.tokens[0].token}`)
    .send()
    .expect(200);
});

test("Shouldn't get profile for user", async () => {
  await request(app)
    .get("/users/me")
    .send()
    .expect(401);
});

test("Shouldn't delete profile for unathenticated user", async () => {
  await request(app)
    .delete("/users/me")
    .send()
    .expect(401);
});

test("Should delete profile for user", async () => {
  response = await request(app)
    .delete("/users/me")
    .set("Authorization", `Bearer ${testUser.tokens[0].token}`)
    .send()
    .expect(202);
  const user = await User.findById(response.body._id);
  expect(user).toBeNull();
});

test("Should upload avatar image", async () => {
  await request(app)
    .post("/users/me/avatar")
    .set("Authorization", `Bearer ${testUser.tokens[0].token}`)
    .attach("avatar", "tests/fixtures/profile-pic.jpg")
    .expect(200);
  const user = await User.findById(testUserId);
  expect(user.avatar).toEqual(expect.any(Buffer));
});

test("Should update valid fields", async () => {
  await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${testUser.tokens[0].token}`)
    .send({ name: "New Name" })
    .expect(200);
  const user = await User.findById(testUserId);
  expect(user.name).toBe("New Name");
});

test("Shouldn't update invalid fields", async () => {
  await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${testUser.tokens[0].token}`)
    .send({ waffles: "Peanutbutter" })
    .expect(400);
});
