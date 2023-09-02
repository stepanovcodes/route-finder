///////////////////////////////
// DEPENDENCIES
////////////////////////////////

const express = require("express");
const { Break } = require("../models");
// we can use 'object de-structuring' to access just the model we need for this controller

///////////////////////////////
// CONTROLLERS
////////////////////////////////

// Break INDEX ACTION
async function index(req, res, next) {
  try {
    // get all Breaks
    res.status(200).json(await Break.find({}));
  } catch (error) {
    //send error
    res.status(400).json({ error: error.message });
  }
}

// Break CREATE ACTION
async function create(req, res, next) {
  try {
    // create new person
    res.status(201).json(await Break.create(req.body));
  } catch (error) {
    //send error
    res.status(400).json({ error: error.message });
  }
}

// Break SHOW ACTION
async function show(req, res, next) {
  try {
    // send one person
    res.status(200).json(await Break.findById(req.params.id));
  } catch (error) {
    //send error
    res.status(400).json({ error: error.message });
  }
}

// Break DESTROY ACTION
async function destroy(req, res) {
  try {
    res
      .status(204)
      .json(await Break.findOneAndDelete({ _id: req.params.id }));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Break UPDATE ACTION
async function update(req, res) {
  try {
    res
      .status(204)
      .json(
        await Break.findByIdAndUpdate(req.params.id, req.body, { new: true })
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
