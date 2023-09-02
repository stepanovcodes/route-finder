///////////////////////////////
// DEPENDENCIES
////////////////////////////////

const express = require('express')
const router = express.Router()

const shipmentsCtrl = require('../controllers/shipments')

///////////////////////////////
// ROUTES
////////////////////////////////

// PEOPLE INDEX ROUTE
router.get("/", shipmentsCtrl.index);

// shipments CREATE ROUTE
router.post("/", shipmentsCtrl.create);

// shipments SHOW ROUTE
router.get("/:id", shipmentsCtrl.show);
// shipments DELETE ROUTE
router.delete("/:id", shipmentsCtrl.delete);

// shipments UPDATE ROUTE
router.put("/:id", shipmentsCtrl.update);

module.exports = router

