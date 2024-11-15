const express = require('express'); 
const router = express.Router() ; 
const {reminder  , deleteReminder , getReminderByUserId , getRemindersByDate} = require('../controller/reminderController'); 
const protect = require('../middleware/authMiddleware');



router.route('/reminder').post(protect , reminder);  //create reminder for user 
router.route('/deleteReminder/:id').delete(protect , deleteReminder);  //deletereminder by userid
router.route('/getReminderByUserId/:id').get( protect , getReminderByUserId); //get all reminders according to userid
router.route('/by-date').get(protect , getRemindersByDate);


module.exports = router ; 