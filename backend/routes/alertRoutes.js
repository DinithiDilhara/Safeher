const express = require("express");
const {
  createAlert,
  getAllAlerts,
  updateAlertStatus,
} = require("../controllers/alertController");

const router = express.Router();

router.post("/", createAlert);
router.get("/", getAllAlerts);
router.put("/:id/status", updateAlertStatus);

module.exports = router;