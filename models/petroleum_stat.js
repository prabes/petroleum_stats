const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const PetroleumStat = sequelize.define("petroleum_stats", {
	year: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	product: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	sale: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	country: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});

module.exports = PetroleumStat;
