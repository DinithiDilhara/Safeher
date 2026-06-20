const Alert = require("../models/Alert");

exports.createAlert = async (req, res) => {
  try {
    const { name, emergencyType, location, message, trustedContact } = req.body;

    if (!name || !emergencyType || !location || !message) {
      return res.status(400).json({
        message: "Please fill all required fields",
      });
    }

    const alert = await Alert.create({
      studentId: req.user ? req.user._id : null,
      name,
      emergencyType,
      location,
      message,
      trustedContact,
    });

    res.status(201).json({
      message: "Emergency alert submitted successfully",
      alert,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to submit emergency alert",
      error: error.message,
    });
  }
};

exports.getAllAlerts = async (req, res) => {
  try {
    const alerts = await Alert.find()
      .populate("studentId", "name email role")
      .sort({ createdAt: -1 });

    res.status(200).json(alerts);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch alerts",
      error: error.message,
    });
  }
};

exports.getMyAlerts = async (req, res) => {
  try {
    const alerts = await Alert.find({ studentId: req.user._id }).sort({
      createdAt: -1,
    });

    res.status(200).json(alerts);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch your alerts",
      error: error.message,
    });
  }
};

exports.updateAlertStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["Pending", "In Progress", "Resolved"].includes(status)) {
      return res.status(400).json({
        message: "Invalid status value",
      });
    }

    const alert = await Alert.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!alert) {
      return res.status(404).json({
        message: "Alert not found",
      });
    }

    res.status(200).json({
      message: "Alert status updated successfully",
      alert,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update alert status",
      error: error.message,
    });
  }
};