const express = require("express");
const User = require("../models/userModel.js");
const bcrypt = require("bcrypt");

const userRouter = express.Router();

userRouter.post("/login", async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (user) {
    if (bcrypt.compareSync(req.body.password, user.password)) {
      res.send({
        _id: user._id,
        username: user.username,
      });
      return;
    }
  }
  res.status(401).send({ message: "Invalid Email or Password" });
});

userRouter.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password),
  });
  const user = await newUser.save();
  res.send({
    _id: user._id,
    username: user.username,
  });
});

module.exports = userRouter;
