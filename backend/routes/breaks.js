///////////////////////////////
// DEPENDENCIES
////////////////////////////////

const express = require('express')
const router = express.Router()

const breaksCtrl = require('../controllers/breaks')

///////////////////////////////
// ROUTES
////////////////////////////////

// BREAKS INDEX ROUTE
router.get("/", breaksCtrl.index);

// BREAKS CREATE ROUTE
router.post("/", breaksCtrl.create);

// BREAKS SHOW ROUTE
router.get("/:id", breaksCtrl.show);
// BREAKS DELETE ROUTE
router.delete("/:id", breaksCtrl.delete);

// BREAKS UPDATE ROUTE
router.put("/:id", breaksCtrl.update);

module.exports = router

