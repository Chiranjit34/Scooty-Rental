const mongoose = require("mongoose");

const bikesSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    image: { type: String, required: true },
    payPerDay: { type: Number, required: true },
    bookedTimeSlots: [
      {
        from: { type: String, required: true },
        to: { type: String, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Bikes = mongoose.model("Bikes", bikesSchema);

module.exports = Bikes;
