const Complaint = require("../models/Complaint");

exports.createComplaint = async (req, res) => {
  try {
    const { studentId, category, location, description, isAnonymous } = req.body;

    if (!category || !location || !description) {
      return res.status(400).json({
        message: "Please fill all required fields",
      });
    }

    const complaint = await Complaint.create({
      studentId,
      category,
      location,
      description,
      isAnonymous,
    });

    res.status(201).json({
      message: "Complaint submitted successfully",
      complaint,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to submit complaint",
      error: error.message,
    });
  }
};

exports.getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });

    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch complaints",
      error: error.message,
    });
  }
};

exports.updateComplaintStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!complaint) {
      return res.status(404).json({
        message: "Complaint not found",
      });
    }

    res.status(200).json({
      message: "Complaint status updated successfully",
      complaint,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update complaint status",
      error: error.message,
    });
  }
};