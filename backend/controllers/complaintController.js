const Complaint = require("../models/Complaint");

exports.createComplaint = async (req, res) => {
  try {
    const { category, location, description, isAnonymous, anonymous } = req.body;

    if (!category || !location || !description) {
      return res.status(400).json({
        message: "Please fill all required fields",
      });
    }

    const complaint = await Complaint.create({
      studentId: req.user ? req.user._id : null,
      category,
      location,
      description,
      isAnonymous: isAnonymous !== undefined ? isAnonymous : anonymous,
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
    const complaints = await Complaint.find()
      .populate("studentId", "name email role")
      .sort({ createdAt: -1 });

    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch complaints",
      error: error.message,
    });
  }
};

exports.getMyComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({
      studentId: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch your complaints",
      error: error.message,
    });
  }
};

exports.updateComplaintStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["Pending", "In Progress", "Resolved"].includes(status)) {
      return res.status(400).json({
        message: "Invalid status value",
      });
    }

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