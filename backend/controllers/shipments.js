///////////////////////////////
// DEPENDENCIES
////////////////////////////////

const express = require("express");
const { Shipment } = require("../models");
// we can use 'object de-structuring' to access just the model we need for this controller

///////////////////////////////
// CONTROLLERS
////////////////////////////////

// Shipment INDEX ACTION
async function index(req, res, next) {
  try {
    // get all Shipments
    res.status(200).json(await Shipment.find({}).populate("from","name").populate("to","name").populate("requirements","name"));
  } catch (error) {
    //send error
    res.status(400).json({ error: error.message });
  }
}

// Shipment CREATE ACTION
async function create(req, res, next) {
  try {
    // create new person
    res.status(201).json(await Shipment.create(req.body));
  } catch (error) {
    //send error
    res.status(400).json({ error: error.message });
  }
}

// Shipment SHOW ACTION
async function show(req, res, next) {
  try {
    // send one person
    res.status(200).json(await Shipment.findById(req.params.id));
  } catch (error) {
    //send error
    res.status(400).json({ error: error.message });
  }
}

// Shipment DESTROY ACTION
async function destroy(req, res) {
  try {
    res
      .status(204)
      .json(await Shipment.findOneAndDelete({ _id: req.params.id }));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Shipment UPDATE ACTION
async function update(req, res) {
  try {
    res
      .status(204)
      .json(
        await Shipment.findByIdAndUpdate(req.params.id, req.body, { new: true })
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
