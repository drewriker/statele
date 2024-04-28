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

// Define the states data
const statesData = [
	{ name: "Alabama", image: "../state_img/Alabama-Outline-Map.jpg" },
	{ name: "Alaska", image: "../state_img/Alaska-Outline-Map.jpg" },
	{ name: "Arizona", image: "../state_img/Arizona-Outline-Map.jpg" },
	{ name: "Arkansas", image: "../state_img/Arkansas-Outline-Map.jpg" },
	{ name: "California", image: "../state_img/California-Outline-Map.jpg" },
	{ name: "Colorado", image: "../state_img/Colorado-Outline-Map.jpg" },
	{ name: "Connecticut", image: "../state_img/Connecticut-Outline-Map.jpg" },
	{ name: "Delaware", image: "../state_img/Delaware-Outline-Map.jpg" },
	{ name: "Florida", image: "../state_img/Florida-Outline-Map.jpg" },
	{ name: "Georgia", image: "../state_img/Georgia-Outline-Map.jpg" },
	{ name: "Hawaii", image: "../state_img/Hawaii-Outline-Map.jpg" },
	{ name: "Idaho", image: "../state_img/Idaho-Outline-Map.jpg" },
	{ name: "Illinois", image: "../state_img/Illinois-Outline-Map.jpg" },
	{ name: "Indiana", image: "../state_img/Indiana-Outline-Map.jpg" },
	{ name: "Iowa", image: "../state_img/Iowa-Outline-Map.jpg" },
	{ name: "Kansas", image: "../state_img/Kansas-Outline-Map.jpg" },
	{ name: "Kentucky", image: "../state_img/Kentucky-Outline-Map.jpg" },
	{ name: "Louisiana", image: "../state_img/Louisiana-Outline-Map.jpg" },
	{ name: "Maine", image: "../state_img/Maine-Outline-Map.jpg" },
	{ name: "Maryland", image: "../state_img/Maryland-Outline-Map.jpg" },
	{
		name: "Massachusetts",
		image: "../state_img/Massachusetts-Outline-Map.jpg",
	},
	{ name: "Michigan", image: "../state_img/Michigan-Outline-Map.jpg" },
	{ name: "Minnesota", image: "../state_img/Minnesota-Outline-Map.jpg" },
	{ name: "Mississippi", image: "../state_img/Mississippi-Outline-Map.jpg" },
	{ name: "Missouri", image: "../state_img/Missouri-Outline-Map.jpg" },
	{ name: "Montana", image: "../state_img/Montana-Outline-Map.jpg" },
	{ name: "Nebraska", image: "../state_img/Nebraska-Outline-Map.jpg" },
	{ name: "Nevada", image: "../state_img/Nevada-Outline-Map.jpg" },
	{
		name: "New Hampshire",
		image: "../state_img/New-Hampshire-Outline-Map.jpg",
	},
	{ name: "New Jersey", image: "../state_img/New-Jersey-Outline-Map.jpg" },
	{ name: "New Mexico", image: "../state_img/New-Mexico-Outline-Map.jpg" },
	{ name: "New York", image: "../state_img/New-York-Outline-Map.jpg" },
	{
		name: "North Carolina",
		image: "../state_img/North-Carolina-Outline-Map.jpg",
	},
	{ name: "North Dakota", image: "../state_img/North-Dakota-Outline-Map.jpg" },
	{ name: "Ohio", image: "../state_img/Ohio-Outline-Map.jpg" },
	{ name: "Oklahoma", image: "../state_img/Oklahoma-Outline-Map.jpg" },
	{ name: "Oregon", image: "../state_img/Oregon-Outline-Map.jpg" },
	{ name: "Pennsylvania", image: "../state_img/Pennsylvania-Outline-Map.jpg" },
	{ name: "Rhode Island", image: "../state_img/Rhode-Island-Outline-Map.jpg" },
	{
		name: "South Carolina",
		image: "../state_img/South-Carolina-Outline-Map.jpg",
	},
	{ name: "South Dakota", image: "../state_img/South-Dakota-Outline-Map.jpg" },
	{ name: "Tennessee", image: "../state_img/Tennessee-Outline-Map.jpg" },
	{ name: "Texas", image: "../state_img/Texas-Outline-Map.jpg" },
	{ name: "Utah", image: "../state_img/Utah-Outline-Map.jpg" },
	{ name: "Vermont", image: "../state_img/Vermont-Outline-Map.jpg" },
	{ name: "Virginia", image: "../state_img/Virginia-Outline-Map.jpg" },
	{ name: "Washington", image: "../state_img/Washington-Outline-Map.jpg" },
	{
		name: "West Virginia",
		image: "../state_img/West-Virginia-Outline-Map.jpg",
	},
	{ name: "Wisconsin", image: "../state_img/Wisconsin-Outline-Map.jpg" },
	{ name: "Wyoming", image: "../state_img/Wyoming-Outline-Map.jpg" },
];

// Function to seed the states table
module.exports = {
	seed: (req, res) => {
		sequelize
			.query(
				`
    
    drop table if exists states;
    
    CREATE TABLE states (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) UNIQUE NOT NULL,
        image VARCHAR(255) NOT NULL
      );

      INSERT INTO states (name, image) VALUES
        ('Alabama', '../state_img/Alabama-Outline-Map.jpg'),
        ('Alaska', '../state_img/Alaska-Outline-Map.jpg'),
        ('Arizona', '../state_img/Arizona-Outline-Map.jpg'),
        ('Arkansas', '../state_img/Arkansas-Outline-Map.jpg'),
        ('California', '../state_img/California-Outline-Map.jpg'),
        ('Colorado', '../state_img/Colorado-Outline-Map.jpg'),
        ('Connecticut', '../state_img/Connecticut-Outline-Map.jpg'),
        ('Delaware', '../state_img/Delaware-Outline-Map.jpg'),
        ('Florida', '../state_img/Florida-Outline-Map.jpg'),
        ('Georgia', '../state_img/Georgia-Outline-Map.jpg'),
        ('Hawaii', '../state_img/Hawaii-Outline-Map.jpg'),
        ('Idaho', '../state_img/Idaho-Outline-Map.jpg'),
        ('Illinois', '../state_img/Illinois-Outline-Map.jpg'),
        ('Indiana', '../state_img/Indiana-Outline-Map.jpg'),
        ('Iowa', '../state_img/Iowa-Outline-Map.jpg'),
        ('Kansas', '../state_img/Kansas-Outline-Map.jpg'),
        ('Kentucky', '../state_img/Kentucky-Outline-Map.jpg'),
        ('Louisiana', '../state_img/Louisiana-Outline-Map.jpg'),
        ('Maine', '../state_img/Maine-Outline-Map.jpg'),
        ('Maryland', '../state_img/Maryland-Outline-Map.jpg'),
        ('Massachusetts', '../state_img/Massachusetts-Outline-Map.jpg'),
        ('Michigan', '../state_img/Michigan-Outline-Map.jpg'),
        ('Minnesota', '../state_img/Minnesota-Outline-Map.jpg'),
        ('Mississippi', '../state_img/Mississippi-Outline-Map.jpg'),
        ('Missouri', '../state_img/Missouri-Outline-Map.jpg'),
        ('Montana', '../state_img/Montana-Outline-Map.jpg'),
        ('Nebraska', '../state_img/Nebraska-Outline-Map.jpg'),
        ('Nevada', '../state_img/Nevada-Outline-Map.jpg'),
        ('New Hampshire', '../state_img/New-Hampshire-Outline-Map.jpg'),
        ('New Jersey', '../state_img/New-Jersey-Outline-Map.jpg'),
        ('New Mexico', '../state_img/New-Mexico-Outline-Map.jpg'),
        ('New York', '../state_img/New-York-Outline-Map.jpg'),
        ('North Carolina', '../state_img/North-Carolina-Outline-Map.jpg'),
        ('North Dakota', '../state_img/North-Dakota-Outline-Map.jpg'),
        ('Ohio', '../state_img/Ohio-Outline-Map.jpg'),
        ('Oklahoma', '../state_img/Oklahoma-Outline-Map.jpg'),
        ('Oregon', '../state_img/Oregon-Outline-Map.jpg'),
        ('Pennsylvania', '../state_img/Pennsylvania-Outline-Map.jpg'),
        ('Rhode Island', '../state_img/Rhode-Island-Outline-Map.jpg'),
        ('South Carolina', '../state_img/South-Carolina-Outline-Map.jpg'),
        ('South Dakota', '../state_img/South-Dakota-Outline-Map.jpg'),
        ('Tennessee', '../state_img/Tennessee-Outline-Map.jpg'),
        ('Texas', '../state_img/Texas-Outline-Map.jpg'),
        ('Utah', '../state_img/Utah-Outline-Map.jpg'),
        ('Vermont', '../state_img/Vermont-Outline-Map.jpg'),
        ('Virginia', '../state_img/Virginia-Outline-Map.jpg'),
        ('Washington', '../state_img/Washington-Outline-Map.jpg'),
        ('West Virginia', '../state_img/West-Virginia-Outline-Map.jpg'),
        ('Wisconsin', '../state_img/Wisconsin-Outline-Map.jpg'),
        ('Wyoming', '../state_img/Wyoming-Outline-Map.jpg');`
			)
			.then(() => {
				console.log("DB seeded!");
				res.status(200);
			})
			.catch((err) => console.log("error seeding DB", err));
	},
};
