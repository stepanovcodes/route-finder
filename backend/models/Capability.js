///////////////////////////////
// DEPENDENCIES
////////////////////////////////
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
///////////////////////////////
// MODELS
////////////////////////////////
const CapabilitySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Capability", CapabilitySchema);
