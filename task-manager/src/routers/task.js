const express = require("express");
const Task = require("../models/task");
const auth = require("../middleware/auth");
const router = new express.Router();

router.post("/tasks", auth, async (req, res) => {
  try {
    // const task = await new Task(req.body);
    const task = await new Task({
      ...req.body,
      owner: req.user._id
    });
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});
// GET /tasks?completed=true
// GET /tasks?limit=10&skip=10
// GET /tasks?sort=createdAt_asc  (or desc)
router.get("/tasks", auth, async (req, res) => {
  const match = {};

  if (req.query.completed) {
    match.completed = req.query.completed === "true";
  }
  if (req.query.sort) {
    const splitSort = req.query.sort.split("_");
    var sort = {};
    sort[splitSort[0]] = splitSort[1] === "desc" ? -1 : 1;
  }
  try {
    await req.user
      .populate({
        path: "tasks",
        match,
        options: {
          limit: parseInt(req.query.limit),
          skip: parseInt(req.query.skip),
          sort
        }
      })
      .execPopulate();
    res.status(200).send(req.user.tasks);
  } catch (e) {
    res.status(404).send();
  }
});
router.get("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;
  try {
    // const task = await Task.findById(_id);
    const task = await Task.findOne({ _id, owner: req.user._id });
    if (!task) {
      return res.status(404).send();
    }
    res.status(200).send(task);
  } catch (e) {
    res.status(500).send();
  }
});
router.patch("/tasks/:id", auth, async (req, res) => {
  const allowedProperties = ["description", "completed"];
  const changedProperties = Object.keys(req.body);
  const isValidProperties = changedProperties.every(property => allowedProperties.includes(property));

  if (!isValidProperties) {
    return res.status(500).send({ error: "Invalid Propertie(s)" });
  }
  try {
    const task = await Task.findOne({ _id: req.params.id, owner: req.user._id });
    if (!task) {
      return res.status(404).send();
    }

    changedProperties.forEach(property => (task[property] = req.body[property]));
    await task.save();
    res.status(200).send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});
router.delete("/tasks/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
    if (!task) {
      return res.status(404).send();
    }
    res.status(202).send(task);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
