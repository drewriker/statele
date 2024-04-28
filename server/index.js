require("dotenv").config({ path: "../.env" });
const express = require("express");
const app = express();
const cors = require("cors");
// SERVER_PORT = 4004
const { SERVER_PORT } = process.env;
const { seed } = require("./seed.js");
const { getState, userGuess, getCurrentState } = require("./controller.js")

app.use(express.json());
app.use(cors());

//seed database
app.post("/seed", seed);

//get random state
app.get("/state", getState)

//get current state
app.get("/current-state", getCurrentState)

//validate users guess
app.post("/validate", userGuess)


// setInterval(getState, 1000 * 20) // new state every hour
app.listen(SERVER_PORT, () => console.log(`up on ${SERVER_PORT}`));
