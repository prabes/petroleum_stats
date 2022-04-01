const PetroleumStat = require("../models/petroleum_stat");
const fs = require("fs");
const sequelize = require("../config/db");
const { Op } = require("sequelize");
const { groupBy, sumBy, orderBy } = require("lodash");

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
		const avgData = [];
		const finalResult = Object.keys(groupedData).map((product) => {
			const minMaxValues = findMinMax(groupedData[product]);
			const ranges = findRange(minMaxValues[0], minMaxValues[1]);
			for (i = 0; i < ranges.length - 1; i++) {
				const minimumRange = ranges[i] + i;
				const maximumRange = ranges[i + 1] + i;
				const group = groupedData[product].filter((productItem) => {
					return (
						parseInt(productItem.year) >= minimumRange &&
						parseInt(productItem.year) <= maximumRange
					);
				});
				const groupSale = sumBy(group, (ind) => parseInt(ind.sale));
				const avgGroupSale = groupSale / group.length;
				avgData.push({
					product: product,
					range: `${minimumRange}-${maximumRange}`,
					avg: avgGroupSale,
				});
			}
		});
		return res.status(200).send(avgData);
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

const findMinMax = (list) => {
	const orderedList = orderBy(list, "year", "asc");
	return [orderedList[0].year, orderedList[orderedList.length - 1].year];
};

const findRange = (min, max) => {
	const list = [];
	for (var i = min; i <= max; i++) {
		if (i - min == 3 || i - min == 0) {
			if (i != min) {
				i = i;
			}
			list.push(parseInt(i));
			min = parseInt(i);
		}
	}
	return list;
};
