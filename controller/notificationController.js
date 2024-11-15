const Notification = require('../models/notificationModel'); 

// Send Notification
const sendNotification = async (req, res) => {
  try {
    const { userId, message } = req.body;

    const notification = new Notification({ user: userId, message });

    await notification.save();

    res.status(201).json({
      success: true,
      msg: "Notification sent successfully",
      notification
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, msg: "Server error" });
  }
};

// Get All Notifications for a User
const getUserNotifications = async (req, res) => {
  try {
    const { userId } = req.params;

    const notifications = await Notification.find({ user: userId });

    res.status(200).json({
      success: true,
      notifications
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, msg: "Server error" });
  }
};

module.exports = { sendNotification, getUserNotifications };
