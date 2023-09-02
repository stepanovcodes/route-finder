///////////////////////////////
// DEPENDENCIES
////////////////////////////////

const express = require('express')
const router = express.Router()

const servicesCtrl = require('../controllers/services')

///////////////////////////////
// ROUTES
////////////////////////////////

// PEOPLE INDEX ROUTE
router.get("/", servicesCtrl.index);

// services CREATE ROUTE
router.post("/", servicesCtrl.create);

// services SHOW ROUTE
router.get("/:id", servicesCtrl.show);
// services DELETE ROUTE
router.delete("/:id", servicesCtrl.delete);

// services UPDATE ROUTE
router.put("/:id", servicesCtrl.update);

module.exports = router

