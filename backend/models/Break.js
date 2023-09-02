///////////////////////////////
// DEPENDENCIES
////////////////////////////////
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
///////////////////////////////
// MODELS
////////////////////////////////
const BreakSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    earliest_start: {
      type: Date,
      required: true,
    },
    latest_end: {
      type: Date,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Break", BreakSchema);
