const express = require("express");
const Bikes = require("../models/bikesModel.js");
const data = require("../data.js");

const seedRouter = express.Router();

seedRouter.get("/", async (req, res) => {
  await Bikes.remove({});
  const createdBikes = await Bikes.insertMany(data.bikes);

  res.send({ createdBikes });
});

module.exports = seedRouter;
