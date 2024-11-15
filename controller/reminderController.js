const Reminder = require('../models/reminderModel');

// Create Reminder for authorized  user
const reminder = async (req, res) => {
  try {
    const { medicineId, dosage, frequency, times, startDate, endDate } = req.body;

    const newReminder = new Reminder({
      user: req.user._id,  // Use the authenticated user's ID from the protect middleware
      medicine: medicineId,
      dosage,
      frequency,
      times,
      startDate,
      endDate,
    });

    await newReminder.save();

    res.status(202).json({
      success: true,
      msg: "Reminder created successfully",
    });
  } catch (error) {
    console.error('Error creating reminder:', error);
    res.status(500).json({
      success: false,
      msg: "An error occurred while creating the reminder",
    });
  }
};



// Delete Reminder by userId
const deleteReminder = async (req, res) => {
  try {
    const reminder = await Reminder.findByIdAndDelete(req.params.id);

    if (!reminder) {
      return res.status(404).json({
        success: false,
        msg: "Reminder not found in database",
      });
    }

    res.status(200).json({
      success: true,
      data: reminder,
      msg: "Reminder deleted successfully",
    });
  } catch (error) {
    console.error('Error deleting reminder:', error);
    res.status(500).json({
      success: false,
      msg: "An error occurred while deleting the reminder",
    });
  }
};

// Get Reminder by User ID
const getReminderByUserId = async (req, res) => {
  try {
    const reminders = await Reminder.find({ user: req.user._id });  // Use the authenticated user's ID

    if (!reminders || reminders.length === 0) {
      return res.status(404).json({
        success: false,
        msg: 'No reminders for this user.',
      });
    }

    res.status(200).json({
      success: true,
      data: reminders,
    });
  } catch (error) {
    console.error('Error fetching reminders by userId:', error);
    res.status(500).json({
      success: false,
      msg: 'Internal server error',
    });
  }
};


//Get reminders by date : 
// Get Reminders by Date
const getRemindersByDate = async (req, res) => {
  try {
    const { date } = req.query; // Date passed as a query parameter (e.g., /reminders?date=2024-09-25)
    const reminders = await Reminder.find({
      user: req.user._id,
      startDate: { $lte: new Date(date) },  // Reminders starting on or before the date
      endDate: { $gte: new Date(date) },    // Reminders ending on or after the date
    });

    if (!reminders || reminders.length === 0) {
      return res.status(404).json({
        success: false,
        msg: 'No reminders for this date',
      });
    }

    res.status(200).json({
      success: true,
      data: reminders,
    });
  } catch (error) {
    console.error('Error fetching reminders by date:', error);
    res.status(500).json({
      success: false,
      msg: 'Internal server error',
    });
  }
};



module.exports = { reminder, deleteReminder, getReminderByUserId , getRemindersByDate };
