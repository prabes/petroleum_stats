const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./config/db");
const data = require("./fileIO");

var corsOptions = {
	origin: "http://localhost:8081",
};
app.use(cors(corsOptions));
app.use(express.json());

// connect DB
db.authenticate()
	.then((result) => {
		console.log("Connected to DB");
	})
	.catch((err) => {
		console.log("Can't connect to DB::", err);
	});

app.get("/", (req, res) => {
	res.json({ message: "Welcome to petrolprices.com" });
});

// set port
const PORT = process.env.PORT || 8080;

//listen for requests
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});
