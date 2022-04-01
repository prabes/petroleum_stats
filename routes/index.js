const { Router } = require("express");
const petroleum_stats_controller = require("../controllers/petroleum_stats_controller");

const router = Router();

router.get("/index", petroleum_stats_controller.getAll);

router.get("/file_data", petroleum_stats_controller.getAllFromFile);

router.get("/total_sale", petroleum_stats_controller.fetchTotalSale);

router.get("/top_country", petroleum_stats_controller.highestSaleCountry);

router.get("/low_country", petroleum_stats_controller.lowestSaleCountry);

router.get("/average_sale", petroleum_stats_controller.averageSale);

router.get("/four_year_average", petroleum_stats_controller.getFourYearAverage);

module.exports = router;
