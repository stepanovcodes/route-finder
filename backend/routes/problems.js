///////////////////////////////
// DEPENDENCIES
////////////////////////////////

const express = require('express')
const router = express.Router()

const problemsCtrl = require('../controllers/problems')

///////////////////////////////
// ROUTES
////////////////////////////////

// PEOPLE INDEX ROUTE
router.get("/", problemsCtrl.index);

// problems CREATE ROUTE
router.post("/", problemsCtrl.create);

// problems SHOW ROUTE
router.get("/:id", problemsCtrl.show);
// problems DELETE ROUTE
router.delete("/:id", problemsCtrl.delete);

// problems UPDATE ROUTE
router.put("/:id", problemsCtrl.update);

module.exports = router

