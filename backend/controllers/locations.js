///////////////////////////////
// DEPENDENCIES
////////////////////////////////

const express = require("express");
const { Location } = require("../models");
// we can use 'object de-structuring' to access just the model we need for this controller

///////////////////////////////
// CONTROLLERS
////////////////////////////////

// LOCATION INDEX ACTION
async function index(req, res, next) {
  try {
    // get all locations
    res.status(200).json(await Location.find({}).sort("name"));
  } catch (error) {
    //send error
    res.status(400).json({ error: error.message });
  }
}

// LOCATION CREATE ACTION
async function create(req, res, next) {
  try {
    // create new person
    res.status(201).json(await Location.create(req.body));
  } catch (error) {
    //send error
    res.status(400).json({ error: error.message });
  }
}

// LOCATION SHOW ACTION
async function show(req, res, next) {
  try {
    // send one person
    res.status(200).json(await Location.findById(req.params.id));
  } catch (error) {
    //send error
    res.status(400).json({ error: error.message });
  }
}

// LOCATION DESTROY ACTION
async function destroy(req, res) {
  try {
    res
      .status(204)
      .json(await Location.findOneAndDelete({ _id: req.params.id }));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// LOCATION UPDATE ACTION
async function update(req, res) {
  try {
    res
      .status(204)
      .json(
        await Location.findByIdAndUpdate(req.params.id, req.body, { new: true })
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
