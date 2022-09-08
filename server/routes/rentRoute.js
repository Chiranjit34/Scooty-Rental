const express = require("express");
const Bikes = require("../models/bikesModel.js");
const Rent = require("../models/rentModel.js");

const rentRouter = express.Router();

rentRouter.post("/rentbike", async (req, res) => {
  try {
    const newRent = new Rent(req.body);
    await newRent.save();

    const bike = await Bikes.findById({ _id: req.body.bike });
    bike.bookedTimeSlots.push(req.body.bookedTimeSlots);
    await bike.save();

    res.send("Your Rent is Successfull!");
  } catch (error) {
    return res.status(400).json(error);
  }
});

module.exports = rentRouter;
