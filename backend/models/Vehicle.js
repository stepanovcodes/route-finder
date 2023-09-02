///////////////////////////////
// DEPENDENCIES
////////////////////////////////
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
///////////////////////////////
// MODELS
////////////////////////////////
const VehicleSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    routing_profile: {
      type: String,
      enum: [
        "mapbox/driving",
        "mapbox/driving-traffic",
        "mapbox/cycling",
        "mapbox/walking",
      ],
    },
    start_location: {
        type: Schema.Types.ObjectId,
        ref: "Location",
    },
    end_location: {
        type: Schema.Types.ObjectId,
        ref: "Location",
    },
    capacities: {
        type: Schema.Types.ObjectId,
        ref: "Capacity",
    },
    capabilities: {
        type: Schema.Types.ObjectId,
        ref: "Capability",
    },
    earliest_start: {
        type: Date,
    },
    latest_end: {
        type: Date,
    },
    breaks: {
        type: Schema.Types.ObjectId,
        ref: "Break",
    },
    loading_policy: {
        type: String,
      enum: [
        "any",
        "fifo",
        "lifo",
      ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Vehicle", VehicleSchema);
