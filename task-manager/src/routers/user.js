const express = require("express");
const multer = require("multer");
const sharp = require("sharp");
const User = require("../models/user");
const auth = require("../middleware/auth");
const fileType = require("file-type");
const router = new express.Router();

router.post("/users", async (req, res) => {
  try {
    const userExists = await User.exists({ email: req.body.email });
    if (userExists) {
      return res.status(400).send({ error: "Duplicate Email detected" });
    }
    const user = await new User(req.body);
    await user.save();
    const token = await user.generateAuthToken();

    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});
router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password);
    const token = await user.generateAuthToken();

    res.status(200).send({ user, token });
  } catch (e) {
    res.status(400).send();
  }
});
router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.status(200).send();
  } catch (e) {
    res.status(500).send();
  }
});
router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.status(200).send();
  } catch (e) {
    res.status(500).send();
  }
});
router.get("/users/me", auth, async (req, res) => {
  res.status(200).send(req.user);
});
router.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }
  try {
    updates.forEach(update => (req.user[update] = req.body[update]));
    await req.user.save();
    res.status(200).send(req.user);
  } catch (e) {
    res.status(500).send();
  }
});
router.delete("/users/me", auth, async (req, res) => {
  try {
    await req.user.remove();
    res.status(202).send(req.user);
  } catch (e) {
    res.status(500).send();
  }
});
var storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|png|jpeg)$/)) {
      return cb(new Error("Only PNG, JPG, and JPEG are accepted. "));
    }
    return cb(undefined, true);
  }
});
router.post("/users/me/avatar", auth, upload.single("avatar"), async (req, res) => {
  try {
    // req.user.avatar = req.file.buffer;
    await sharp(req.file.buffer)
      .resize({ height: 100 })
      .toBuffer()
      .then(data => {
        req.user.avatar = data;
      });
    await req.user.save();
    res.status(200).send();
  } catch (e) {
    res.status(500).send();
  }
});
router.delete("/users/me/avatar", auth, async (req, res) => {
  try {
    req.user.avatar = undefined;
    await req.user.save();
    res.status(200).send();
  } catch (e) {
    res.status(500).send({ error: e.body });
  }
});
router.get("/users/:id/avatar", auth, async (req, res) => {
  let user = req.user;
  if (req.params.id !== "me") {
    user = await User.findById(req.params.id);
  }
  if (!user.avatar) {
    return res.status(404).send();
  }
  try {
    res.set("Content-Type", fileType(user.avatar).mime);
    res.send(user.avatar);
  } catch (e) {}
});
module.exports = router;
