///////////////////////////////
// DEPENDENCIES
////////////////////////////////
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
///////////////////////////////
// MODELS
////////////////////////////////
const CapacitySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    volume: {
      type: Number,
    },
    weight: {
      type: Number,
    },
    boxes: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Capacity", CapacitySchema);
