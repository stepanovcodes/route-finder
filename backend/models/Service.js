///////////////////////////////
// DEPENDENCIES
////////////////////////////////
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
///////////////////////////////
// MODELS
////////////////////////////////
const ServiceTimeSchema = new Schema({
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

const ServiceSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    location: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Location",
    },
    duration: {
      type: Number,
      validate: {
        validator: Number.isInteger, // Custom validator to check if it's an integer
        message: "Duration must be an integer.",
      },
    },
    requirements: {
      type: [Schema.Types.ObjectId],
      ref: "Capability",
    },
    service_times: [ServiceTimeSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", ServiceSchema);
