const cors = require("cors");
const express = require("express");
require("dotenv").config();
const SightingsRouter = require("./routers/sightingsRouter");
const SightingsController = require("./controllers/sightingsController");
const db = require("./db/models/index");
const { comment, sighting } = db;

// initializing Controllers -> note the lowercase for the first word
const sightingsController = new SightingsController(sighting, comment);

// initializing Routers
const sightingRouter = new SightingsRouter(sightingsController).routes();

const PORT = process.env.PORT;
const app = express();

// Enable CORS access to this server
app.use(cors());
app.use(express.json()); // to parse incoming JSON data in the request body.

// using the routers
app.use("/sightings", sightingRouter);

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);

  console.log("testing");
});
