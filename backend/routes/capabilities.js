///////////////////////////////
// DEPENDENCIES
////////////////////////////////

const express = require('express')
const router = express.Router()

const capabilitiesCtrl = require('../controllers/capabilities')

///////////////////////////////
// ROUTES
////////////////////////////////

// PEOPLE INDEX ROUTE
router.get("/", capabilitiesCtrl.index);

// capabilities CREATE ROUTE
router.post("/", capabilitiesCtrl.create);

// capabilities SHOW ROUTE
router.get("/:id", capabilitiesCtrl.show);
// capabilities DELETE ROUTE
router.delete("/:id", capabilitiesCtrl.delete);

// capabilities UPDATE ROUTE
router.put("/:id", capabilitiesCtrl.update);

module.exports = router