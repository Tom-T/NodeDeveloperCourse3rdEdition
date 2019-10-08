const express = require("express");
const Task = require("../models/task");
const router = new express.Router();

router.post("/tasks", async (req, res) => {
  try {
    const task = await new Task(req.body);
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});
router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).send(tasks);
  } catch (e) {
    res.status(404).send();
  }
});
router.get("/tasks/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Task.findById(_id);
    if (!task) {
      return res.status(404).send();
    }
    res.status(200).send(task);
  } catch (e) {
    res.status(500).send();
  }
});
router.patch("/tasks/:id", async (req, res) => {
  const allowedProperties = ["description", "completed"];
  const changedProperties = Object.keys(req.body);
  const isValidProperties = changedProperties.every(property => allowedProperties.includes(property));

  if (!isValidProperties) {
    return res.status(500).send({ error: "Invalid Propertie(s)" });
  }
  try {
    const task = await Task.findById(req.params.id);
    changedProperties.forEach(property => (task[property] = req.body[property]));
    await task.save();

    if (!task) {
      return res.status(404).send();
    }
    res.status(200).send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});
router.delete("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).send();
    }
    res.status(202).send(task);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
