const Alert = require("../models/Alert");

exports.createAlert = async (req, res) => {
  try {
    const { studentId, name, emergencyType, location, message } = req.body;

    if (!name || !emergencyType || !location || !message) {
      return res.status(400).json({
        message: "Please fill all required fields",
      });
    }

    const alert = await Alert.create({
      studentId,
      name,
      emergencyType,
      location,
      message,
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
    const alerts = await Alert.find().sort({ createdAt: -1 });

    res.status(200).json(alerts);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch alerts",
      error: error.message,
    });
  }
};

exports.updateAlertStatus = async (req, res) => {
  try {
    const { status } = req.body;

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