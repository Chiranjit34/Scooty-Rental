const express = require('express');
const Category = require("../models/typeModel.js");

const typeRouter = express.Router();


typeRouter.get("/", async (req, res) => {
  const category = await Category.find();
  res.send(category);
});

module.exports = typeRouter;
