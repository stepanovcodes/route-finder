///////////////////////////////
// DEPENDENCIES
////////////////////////////////
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
///////////////////////////////
// MODELS
////////////////////////////////
const problemTimeSchema = new Schema({
  earliest: {
    type: Date,
    required: true,
  },
  latest: {
    type: Date,
    required: true,
  },
  type: {
    type: String,
    enum: ["strict", "soft", "soft_start", "soft_end"],
    required: true,
  },
});

const ProblemSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    version: {
      type: Number,
      default: 1,
      required: true,
    },
    locations: {
      type: [Schema.Types.ObjectId],
      required: true,
      ref: "Location",
    },
    vehicles: {
      type: [Schema.Types.ObjectId],
      required: true,
      ref: "Vehicle",
    },
    services: {
      type: [Schema.Types.ObjectId],
      ref: "Service",
    },
    shipments: {
      type: [Schema.Types.ObjectId],
      ref: "Shipment",
    },
    options: {
      objectives: {
        type: [String],
        enum: ["min-schedule-completion-time", "min-total-travel-duration"],
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Problem", ProblemSchema);
