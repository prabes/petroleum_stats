const sequelize = require("../config/db");
const fs = require("fs");

const queryInterface = sequelize.getQueryInterface();

// queryInterface.

fs.readFile(__dirname + "/../data.json", "utf8", (err, jsonString) => {
	if (err) {
		console.log("Error reading file ::", err);
	}
	try {
		let parsedData = JSON.parse(jsonString);
		parsedData = parsedData.map((data) => {
			return {
				year: data.year,
				sale: data.sale,
				country: data.country,
				product: data.petroleum_product,
			};
		});
		// console.log(parsedData);
		queryInterface.bulkInsert("petroleum_stats", parsedData);
	} catch (error) {
		console.log("Error parsing JSON::", error);
	}
});
