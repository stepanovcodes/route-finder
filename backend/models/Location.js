///////////////////////////////
// DEPENDENCIES
////////////////////////////////
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
///////////////////////////////
// MODELS
////////////////////////////////
const LocationSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    coordinates: {
      type: [Number],
      required: true,
      validate: {
        validator: function (value) {
          // Check that coordinates is an array of two numbers
          return (
            Array.isArray(value) &&
            value.length === 2 &&
            typeof value[0] === "number" &&
            typeof value[1] === "number"
          );
        },
        message:
          'Coordinates must be an array of two numbers in "longitude,latitude" order.',
      },
    },
    title: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Location", LocationSchema);
