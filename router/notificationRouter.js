const express = require('express');
const { sendNotification, getUserNotifications } = require('../controller/notificationController'); 

const router = express.Router();

// Send Notification
router.post('/send', sendNotification);

// Get All Notifications for a User
router.get('/user/:userId', getUserNotifications);

module.exports = router;
