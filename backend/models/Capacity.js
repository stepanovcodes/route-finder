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
      validate: {
        validator: Number.isInteger, // Custom validator to check if it's an integer
        message: 'Duration must be an integer.',
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Capacity", CapacitySchema);
