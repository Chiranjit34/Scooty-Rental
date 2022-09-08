const mongoose = require("mongoose");

const typeSchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
  },
  {
    timestamps: true, //for date
  }
);

const Category = mongoose.model("Category", typeSchema);

module.exports = Category;
