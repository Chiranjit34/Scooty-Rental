const express = require("express");
const Bikes = require("../models/bikesModel.js");

const bikesRouter = express.Router();

bikesRouter.get("/getall", async (req, res) => {
  const bikes = await Bikes.find();
  res.send(bikes);
});

bikesRouter.get("/bike/:bikeId", async (req, res) => {
  const bike = await Bikes.findById({ _id: req.params.bikeId });
  if (bike) {
    res.send(bike);
  } else {
    res.status(404).send({ message: "Bike Not Found" });
  }
});

module.exports = bikesRouter;
