const express = require("express");
const {
  createComplaint,
  getAllComplaints,
  updateComplaintStatus,
} = require("../controllers/complaintController");

const router = express.Router();

router.post("/", createComplaint);
router.get("/", getAllComplaints);
router.put("/:id/status", updateComplaintStatus);

module.exports = router;