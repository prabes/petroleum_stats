// const sqlite3 = require("sqlite3").verbose();
const Sequelize = require("sequelize");

const db = new Sequelize({
	dialect: "sqlite",
	storage: "petroleum_stats.db",
});

module.exports = db;
