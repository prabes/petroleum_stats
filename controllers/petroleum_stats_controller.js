const PetroleumStat = require("../models/petroleum_stat");
const fs = require("fs");

const getAll = async (req, res) => {
	try {
		const petroleum_stats = await PetroleumStat.findAll({
			attributes: ["year", "product", "sale", "country"],
		});
		return res.status(200).json({ petroleum_stats });
	} catch (error) {
		return res.status(500).send(error.message);
	}
};

const getAllFromFile = async (req, res) => {
	fs.readFile(__dirname + "/../data.json", "utf8", (err, jsonString) => {
		if (err) {
			console.log("Error reading file ::", err);
			return res.status(500).send(err.message);
		}
		try {
			const parsedData = JSON.parse(jsonString);
			return res.status(200).json({ fileData: parsedData });
		} catch (error) {
			console.log("Error parsing JSON::", error);
			return res.status(500).send(error.message);
		}
	});
};

module.exports = { getAll, getAllFromFile };
