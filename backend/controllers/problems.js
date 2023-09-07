///////////////////////////////
// DEPENDENCIES
////////////////////////////////

const express = require("express");
const { Problem } = require("../models");
// we can use 'object de-structuring' to access just the model we need for this controller

///////////////////////////////
// CONTROLLERS
////////////////////////////////

// Problem INDEX ACTION
async function index(req, res, next) {
  try {
    // get all Problems
    res.status(200).json(await Problem.find({}).populate("locations","name").populate("vehicles","name").populate("services","name").populate("shipments","name"));
  } catch (error) {
    //send error
    res.status(400).json({ error: error.message });
  }
}

// Problem CREATE ACTION
async function create(req, res, next) {
  try {
    // create new person
    res.status(201).json(await Problem.create(req.body));
  } catch (error) {
    //send error
    res.status(400).json({ error: error.message });
  }
}

// Problem SHOW ACTION
async function show(req, res, next) {
  try {
    // send one person
    res.status(200).json(await Problem.findById(req.params.id));
  } catch (error) {
    //send error
    res.status(400).json({ error: error.message });
  }
}

// Problem DESTROY ACTION
async function destroy(req, res) {
  try {
    res
      .status(204)
      .json(await Problem.findOneAndDelete({ _id: req.params.id }));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Problem UPDATE ACTION
async function update(req, res) {
  try {
    res
      .status(204)
      .json(
        await Problem.findByIdAndUpdate(req.params.id, req.body, { new: true })
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
