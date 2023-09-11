///////////////////////////////
// DEPENDENCIES
////////////////////////////////
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
///////////////////////////////
// MODELS
////////////////////////////////
const SubmissionSchema = new Schema({
  id: {
    type: String,
  },
  status: {
    type: String,
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
    submissions: [SubmissionSchema]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Problem", ProblemSchema);
