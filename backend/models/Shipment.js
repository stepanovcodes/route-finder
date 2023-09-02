///////////////////////////////
// DEPENDENCIES
////////////////////////////////
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
///////////////////////////////
// MODELS
////////////////////////////////
const PickupDropoffTimeSchema = new Schema({
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

const ShipmentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true, // Ensures each shipment has a unique name
    },
    from: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Location",
    },
    to: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Location",
    },
    size: {
      weight: Number,
      volume: Number,
      boxes: {
        type: Number,
        validate: {
          validator: Number.isInteger,
          message: "Boxes must be an integer.",
        },
      },
    },
    requirements: {
      type: [Schema.Types.ObjectId],
      ref: "Capability",
    },
    pickup_duration: {
      type: Number,
      validate: {
        validator: Number.isInteger, // Custom validator to check if it's an integer
        message: "Pickup Duration must be an integer.",
      },
    },
    dropoff_duration: {
      type: Number,
      validate: {
        validator: Number.isInteger, // Custom validator to check if it's an integer
        message: "Dropoff Duration must be an integer.",
      },
    },
    pickup_times: [PickupDropoffTimeSchema],
    dropoff_times: [PickupDropoffTimeSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Shipment", ShipmentSchema);
