///////////////////////////////
// DEPENDENCIES
////////////////////////////////

const express = require('express')
const router = express.Router()

const locationsCtrl = require('../controllers/locations')

///////////////////////////////
// ROUTES
////////////////////////////////

// PEOPLE INDEX ROUTE
router.get("/", locationsCtrl.index);

// LOCATIONS CREATE ROUTE
router.post("/", locationsCtrl.create);

// LOCATIONS SHOW ROUTE
router.get("/:id", locationsCtrl.show);
// LOCATIONS DELETE ROUTE
router.delete("/:id", locationsCtrl.delete);

// LOCATIONS UPDATE ROUTE
router.put("/:id", locationsCtrl.update);

module.exports = router

