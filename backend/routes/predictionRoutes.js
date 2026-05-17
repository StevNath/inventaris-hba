const express = require("express");
const router = express.Router();

const predictionController = require("../controllers/predictionController");
const auth = require("../middleware/auth");
const role = require("../middleware/role");

router.get(
  "/",
  auth,
  role(["owner", "admin", "auditor"]),
  predictionController.getStockPredictions
);

module.exports = router;