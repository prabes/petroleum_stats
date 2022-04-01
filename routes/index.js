const { Router } = require("express");
const petroleum_stats_controller = require("../controllers/petroleum_stats_controller");

const router = Router();

router.get("/", petroleum_stats_controller.getAll);

module.exports = router;
