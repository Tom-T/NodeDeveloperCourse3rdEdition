const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();

app.use(express.json());

app.use(userRouter);
app.use(taskRouter);
app.use((err, req, res, next) => {
  return res.status(500).send({ error: err.message });
});

module.exports = app