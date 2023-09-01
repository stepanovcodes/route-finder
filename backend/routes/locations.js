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

// PEOPLE CREATE ROUTE
router.post("/", locationsCtrl.create);

// PEOPLE SHOW ROUTE
router.get("/:id", locationsCtrl.show);
// PEOPLE DELETE ROUTE
router.delete("/:id", locationsCtrl.delete);

// PEOPLE UPDATE ROUTE
router.put("/:id", locationsCtrl.update);

module.exports = router

