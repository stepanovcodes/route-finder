///////////////////////////////
// DEPENDENCIES
////////////////////////////////

const express = require('express')
const router = express.Router()

const vehiclesCtrl = require('../controllers/vehicles')

///////////////////////////////
// ROUTES
////////////////////////////////

// PEOPLE INDEX ROUTE
router.get("/", vehiclesCtrl.index);

// vehicles CREATE ROUTE
router.post("/", vehiclesCtrl.create);

// vehicles SHOW ROUTE
router.get("/:id", vehiclesCtrl.show);
// vehicles DELETE ROUTE
router.delete("/:id", vehiclesCtrl.delete);

// vehicles UPDATE ROUTE
router.put("/:id", vehiclesCtrl.update);

module.exports = router

