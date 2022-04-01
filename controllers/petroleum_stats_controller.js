const PetroleumStat = require("../models/petroleum_stat");
const fs = require("fs");
const sequelize = require("../config/db");
const { Op } = require("sequelize");
const { groupBy, sum } = require("lodash");

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

const highestSaleCountry = async (req, res) => {
	try {
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

const lowestSaleCountry = async (req, res) => {
	try {
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

const averageSale = async (req, res) => {
	try {
		let avgSale = await PetroleumStat.findAll({
			attributes: ["product", "year", "sale"],
			where: {
				sale: { [Op.gt]: 0 },
			},
			raw: true,
		});
		console.log(avgSale);
		groupedSale = groupBy(avgSale, "product");

		// groupByYear =
		return res.status(200).send(groupedSale);
	} catch (error) {
		return res.status(500).send(error.message);
	}
};

const getFourYearAverage = async (req, res) => {
	let petroleum_stats = await PetroleumStat.findAll({
		attributes: ["year", "product", "sale", "country"],
		raw: true,
	});
	try {
		const groupedData = groupBy(petroleum_stats, "product");
		const finalResult = Object.keys(groupedData).map((product) => {
			const firstGroup = groupedData[product].filter(
				(productItem) => productItem.year < 2011 && productItem.year > 2007
			);
			const secondGroup = groupedData[product].filter(
				(productItem) => productItem.year > 2011 && productItem.year > 2007
			);
			const firstGroupSale = firstGroup.map((firstG) => firstG.sale);
			const secondGroupSale = secondGroup.map((secondG) => secondG.sale);
			const firstGroupAvg = sum(firstGroupSale) / firstGroupSale.length;
			const secondGroupAvg = sum(secondGroupSale) / secondGroupSale.length;
			return [
				{
					product,
					range: "2007-2011",
					avg: firstGroupAvg,
				},
				{
					product,
					range: "2011-2014",
					avg: secondGroupAvg,
				},
			];
		});
		return res.status(200).send(finalResult);
	} catch (error) {
		console.log("Error parsing JSON::", error);
	}
};

module.exports = {
	getAll,
	getAllFromFile,
	fetchTotalSale,
	highestSaleCountry,
	lowestSaleCountry,
	averageSale,
	getFourYearAverage,
};
