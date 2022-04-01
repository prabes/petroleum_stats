const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const queryInterface = sequelize.getQueryInterface();

queryInterface.createTable("petroleum_stats", {
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