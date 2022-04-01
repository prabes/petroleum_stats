const { Router } = require("express");
const petroleum_stats_controller = require("../controllers/petroleum_stats_controller");

const router = Router();

router.get("/index", petroleum_stats_controller.getAll);

router.get("/file_data", petroleum_stats_controller.getAllFromFile);

module.exports = router;
