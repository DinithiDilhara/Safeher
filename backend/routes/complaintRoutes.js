const express = require("express");

const {
  createComplaint,
  getAllComplaints,
  getMyComplaints,
  updateComplaintStatus,
} = require("../controllers/complaintController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Student creates complaint while logged in
router.post("/", protect, createComplaint);

// Student gets only own complaints
router.get("/my", protect, getMyComplaints);

// Admin gets all complaints
router.get("/", getAllComplaints);

// Admin updates complaint status
router.put("/:id/status", updateComplaintStatus);

module.exports = router;