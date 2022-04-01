const PetroleumStat = require("../models/petroleum_stat");
const fs = require("fs");
const sequelize = require("../config/db");

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

const fetchTotalSale = async (req, res) => {
	try {
		// fetch rows of a group
		const saleSum = await PetroleumStat.findAll({
			attributes: [
				"product",
				[sequelize.fn("sum", sequelize.col("sale")), "total_sale"],
			],
			group: ["product"],
			raw: true,
		});
		return res.status(200).send(saleSum);
	} catch (error) {
		return res.status(500).send(error.message);
	}
};

const topCountry = async (req, res) => {
	try {
		// fetch rows of a group
		const saleSum = await PetroleumStat.findAll({
			attributes: [
				"country",
				[sequelize.fn("sum", sequelize.col("sale")), "total_sale"],
			],
			group: ["country"],
			order: [[sequelize.col("total_sale"), "DESC"]],
			limit: 3,
			raw: true,
		});
		console.log(saleSum);

		return res.status(200).send(saleSum);
	} catch (error) {
		return res.status(500).send(error.message);
	}
};

const lowCountry = async (req, res) => {
	try {
		// fetch rows of a group
		const saleSum = await PetroleumStat.findAll({
			attributes: [
				"country",
				[sequelize.fn("sum", sequelize.col("sale")), "total_sale"],
			],
			group: ["country"],
			order: [[sequelize.col("total_sale"), "ASC"]],
			limit: 3,
			raw: true,
		});
		console.log(saleSum);

		return res.status(200).send(saleSum);
	} catch (error) {
		return res.status(500).send(error.message);
	}
};

module.exports = {
	getAll,
	getAllFromFile,
	fetchTotalSale,
	topCountry,
	lowCountry,
};
