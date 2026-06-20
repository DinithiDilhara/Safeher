const express = require("express");

const {
  createAlert,
  getAllAlerts,
  getMyAlerts,
  updateAlertStatus,
} = require("../controllers/alertController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Student creates alert while logged in
router.post("/", protect, createAlert);

// Student gets only own alerts
router.get("/my", protect, getMyAlerts);

// Admin gets all alerts
router.get("/", getAllAlerts);

// Admin updates alert status
router.put("/:id/status", updateAlertStatus);

module.exports = router;