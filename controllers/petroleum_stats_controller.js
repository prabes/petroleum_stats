const PetroleumStat = require("../models/petroleum_stat");

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

module.exports = { getAll };
