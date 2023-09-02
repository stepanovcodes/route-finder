///////////////////////////////
// DEPENDENCIES
////////////////////////////////

const express = require("express");
const { Capability } = require("../models");
// we can use 'object de-structuring' to access just the model we need for this controller

///////////////////////////////
// CONTROLLERS
////////////////////////////////

// Capability INDEX ACTION
async function index(req, res, next) {
  try {
    // get all Capabilitys
    res.status(200).json(await Capability.find({}));
  } catch (error) {
    //send error
    res.status(400).json({ error: error.message });
  }
}

// Capability CREATE ACTION
async function create(req, res, next) {
  try {
    // create new person
    res.status(201).json(await Capability.create(req.body));
  } catch (error) {
    //send error
    res.status(400).json({ error: error.message });
  }
}

// Capability SHOW ACTION
async function show(req, res, next) {
  try {
    // send one person
    res.status(200).json(await Capability.findById(req.params.id));
  } catch (error) {
    //send error
    res.status(400).json({ error: error.message });
  }
}

// Capability DESTROY ACTION
async function destroy(req, res) {
  try {
    res
      .status(204)
      .json(await Capability.findOneAndDelete({ _id: req.params.id }));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Capability UPDATE ACTION
async function update(req, res) {
  try {
    res
      .status(204)
      .json(
        await Capability.findByIdAndUpdate(req.params.id, req.body, { new: true })
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
