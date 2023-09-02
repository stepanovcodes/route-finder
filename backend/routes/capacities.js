///////////////////////////////
// DEPENDENCIES
////////////////////////////////

const express = require('express')
const router = express.Router()

const capacitiesCtrl = require('../controllers/capacities')

///////////////////////////////
// ROUTES
////////////////////////////////

// PEOPLE INDEX ROUTE
router.get("/", capacitiesCtrl.index);

// capacities CREATE ROUTE
router.post("/", capacitiesCtrl.create);

// capacities SHOW ROUTE
router.get("/:id", capacitiesCtrl.show);
// capacities DELETE ROUTE
router.delete("/:id", capacitiesCtrl.delete);

// capacities UPDATE ROUTE
router.put("/:id", capacitiesCtrl.update);

module.exports = router

