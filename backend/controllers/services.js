///////////////////////////////
// DEPENDENCIES
////////////////////////////////

const express = require("express");
const { Service } = require("../models");
// we can use 'object de-structuring' to access just the model we need for this controller

///////////////////////////////
// CONTROLLERS
////////////////////////////////

// Service INDEX ACTION
async function index(req, res, next) {
  try {
    // get all Services
    res.status(200).json(await Service.find({}).populate("location","name").populate("requirements","name"));
  } catch (error) {
    //send error
    res.status(400).json({ error: error.message });
  }
}

// Service CREATE ACTION
async function create(req, res, next) {
  try {
    // create new person
    res.status(201).json(await Service.create(req.body));
  } catch (error) {
    //send error
    res.status(400).json({ error: error.message });
  }
}

// Service SHOW ACTION
async function show(req, res, next) {
  try {
    // send one person
    res.status(200).json(await Service.findById(req.params.id));
  } catch (error) {
    //send error
    res.status(400).json({ error: error.message });
  }
}

// Service DESTROY ACTION
async function destroy(req, res) {
  try {
    res
      .status(204)
      .json(await Service.findOneAndDelete({ _id: req.params.id }));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Service UPDATE ACTION
async function update(req, res) {
  try {
    res
      .status(204)
      .json(
        await Service.findByIdAndUpdate(req.params.id, req.body, { new: true })
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
