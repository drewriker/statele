require("dotenv").config({ path: "../.env" });
const { CONNECTION_STRING } = process.env;
const Sequelize = require("sequelize");

const sequelize = new Sequelize(CONNECTION_STRING, {
	dialect: "postgres",
	dialectOption: {
		ssl: {
			rejectUnauthorized: false,
		},
	},
});

let currentState = "";
let getState = (req, res) => {
	sequelize
		.query(
			`SELECT *
        FROM states
        ORDER BY RANDOM()
        LIMIT 1;`
		)
		.then((dbResults) => {
			// console.log(dbResults[0][0]);
			currentState = dbResults[0][0].name;
			// console.log(currentState);
			res.status(200).send(dbResults[0]);
		})
		.catch((err) => console.log(err));
};

const getCurrentState = (req, res) => {
    console.log(currentState)
	res.status(200).send(currentState);
};

const userGuess = (req, res) => {
	const { guess } = req.body;
	console.log(guess);

	if (guess.toLowerCase() === currentState.toLowerCase()) {
		res.status(200).send({ guess: true });
	} else {
		res.status(200).send({ guess: false });
	}
};

module.exports = {
	getState,
	userGuess,
	getCurrentState,
};
