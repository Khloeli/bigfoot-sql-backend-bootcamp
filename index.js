const cors = require("cors");
const express = require("express");
require("dotenv").config();

// importing Routers
const SightingsRouter = require("./routers/sightingsRouter");

// importing Controllers
const SightingsController = require("./controllers/sightingsController");

// importing DB
const db = require("./db/models/index");
const { comment, sighting } = db;

// initializing Controllers -> note the lowercase for the first word
const sightingsController = new SightingsController(sighting, comment);

// inittializing Routers
const sightingRouter = new SightingsRouter(sightingsController).routes();

const PORT = process.env.PORT;
const app = express();

// Enable CORS access to this server. This allows the server to accept requests from different origins.
app.use(cors());

// using the routers
app.use("/sightings", sightingRouter);

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});

// const express = require("express");
// const cors = require("cors");
// require("dotenv").config();
// const { getSightings } = require("./utils.js");

// const PORT = process.env.PORT;
// const app = express();

// // enable cors for all routes
// app.use(cors());

// app.get("/sightings", async (req, res) => {
//   const sightings = await getSightings();
//   res.json(sightings);
// });

// // set sightingIndex as the params
// app.get("/sightings/:sightingIndex", async (req, res) => {
//   const sightings = await getSightings();
//   res.json(sightings[req.params.sightingIndex]);
// });

// app.listen(PORT, () => {
//   console.log(`Express app listening on port ${PORT}!`);
// });
