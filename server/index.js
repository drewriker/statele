require("dotenv").config({ path: "../.env" });
const express = require("express");
const app = express();
const cors = require("cors");
// SERVER_PORT = 4004
const { SERVER_PORT } = process.env;
const { seed } = require("./seed.js");
const {
	getState,
	userGuess,
	getCurrentState,
	fetchStatesList,
} = require("./controller.js");

app.use(express.json());
app.use(cors());
app.use(express.static(__dirname + '/../client'));
console.log(`${__dirname}`)

//seed database
app.post("/seed", seed);

//get random state
app.get("/state", getState);

//get current state
app.get("/current-state", getCurrentState);

//get list of all states for input
app.get("/states-list", fetchStatesList);

//validate users guess
app.post("/validate", userGuess);

// setInterval(getState, 1000 * 20) // new state every hour
app.listen(SERVER_PORT, () => console.log(`up on ${SERVER_PORT}`));
