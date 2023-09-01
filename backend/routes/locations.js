///////////////////////////////
// DEPENDENCIES
////////////////////////////////

const express = require('express')
const router = express.Router()

///////////////////////////////
// ROUTES
////////////////////////////////

// PEOPLE INDEX ROUTE
router.get("/", async (req, res) => {
	res.status(200).json({message: "locations index route"})
});

// PEOPLE CREATE ROUTE
router.post("/", async (req, res) =>  {
	res.status(201).json({message: "locations create route"})
});

// PEOPLE SHOW ROUTE
router.get("/:id", (req, res) => {
	res.status(200).json({message: "people show route: " + req.params.id })
});

// PEOPLE DELETE ROUTE
router.delete("/:id", (req, res) => {
	res.status(204).json({message: "people delete route: " + req.params.id })
});

// PEOPLE UPDATE ROUTE
router.put("/:id", (req, res) => {
	console.log(req.body)
	res.status(204).json({message: "people update route: " + req.params.id })
});

module.exports = router

