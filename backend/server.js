///////////////////////////////
// DEPENDENCIES
////////////////////////////////

// initialize .env variables
require("dotenv").config();

// start the mongoose db connection
require("./config/db.connection.js");

// pull PORT from .env, give default value of 4000 and establish DB Connection
const { PORT } = process.env;

// import express
const express = require("express");

// create application object
const app = express();

// import routers
const locationsRouter = require("./routes/locations");
const capacitiesRouter = require("./routes/capacities");
const capabilitiesRouter = require("./routes/capabilities");
const breaksRouter = require("./routes/breaks");
const vehiclesRouter = require("./routes/vehicles");
const servicesRouter = require("./routes/services");
const shipmentsRouter = require("./routes/shipments");

const cors = require("cors");
const morgan = require("morgan");
///////////////////////////////
// MIDDLEWARE
////////////////////////////////
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // parse json bodies - this will run before our request accesses the people router

app.use(cors()); // to minimize cors errors, open access to all origins
app.use(morgan("dev")); // logging for development

// all requests for endpoints that begin with '/locations'
app.use("/locations", locationsRouter);
// all requests for endpoints that begin with '/capacities'
app.use("/capacities", capacitiesRouter);
// all requests for endpoints that begin with '/capabilities'
app.use("/capabilities", capabilitiesRouter);
// all requests for endpoints that begin with '/breaks'
app.use("/breaks", breaksRouter);
// all requests for endpoints that begin with '/vehicles'
app.use("/vehicles", vehiclesRouter);
// all requests for endpoints that begin with '/services'
app.use("/services", servicesRouter);
// all requests for endpoints that begin with '/shipments'
app.use("/shipments", shipmentsRouter);
///////////////////////////////
// ROUTES
////////////////////////////////
// create a test route
app.get("/", (req, res) => {
  res.send("hello world");
});

///////////////////////////////
// LISTENER
////////////////////////////////
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));
