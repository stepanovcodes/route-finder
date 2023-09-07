///////////////////////////////
// DEPENDENCIES
////////////////////////////////

const express = require("express");
const { Vehicle } = require("../models");
// we can use 'object de-structuring' to access just the model we need for this controller

///////////////////////////////
// CONTROLLERS
////////////////////////////////

// Vehicle INDEX ACTION
async function index(req, res, next) {
  try {
    // get all Vehicles
    res.status(200).json(await Vehicle.find({}).populate("start_location","name").populate("end_location","name").populate("capacities","name").populate("capabilities","name").populate("breaks","name"));
  } catch (error) {
    //send error
    res.status(400).json({ error: error.message });
  }
}

// Vehicle CREATE ACTION
async function create(req, res, next) {
  try {
    // create new person
    res.status(201).json(await Vehicle.create(req.body));
  } catch (error) {
    //send error
    res.status(400).json({ error: error.message });
  }
}

// Vehicle SHOW ACTION
async function show(req, res, next) {
  try {
    // send one person
    res.status(200).json(await Vehicle.findById(req.params.id));
  } catch (error) {
    //send error
    res.status(400).json({ error: error.message });
  }
}

// Vehicle DESTROY ACTION
async function destroy(req, res) {
  try {
    res
      .status(204)
      .json(await Vehicle.findOneAndDelete({ _id: req.params.id }));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Vehicle UPDATE ACTION
async function update(req, res) {
  try {
    res
      .status(204)
      .json(
        await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true })
      );
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// EXPORT Controller Action
module.exports = {
  index,
  create,
  show,
  delete: destroy,
  update
};
