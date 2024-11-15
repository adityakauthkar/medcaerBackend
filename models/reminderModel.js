const mongoose = require('mongoose'); 
const User = require('../models/userModel')
const Medicine = require('../models/medicineModel.js');

const reminderSchema = mongoose.Schema({

    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }, 
    medicine: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Medicine',
        required: true,
    },
    frequency: {
        type: String,
        enum: ['daily', 'weekly', 'monthly'],
        // required: true,
    },
    times: [
        {
            type: String,
            required: true,
        }
    ],
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active',
    },
    dosage: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },

   


});

reminderSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const Reminder = mongoose.model('Reminder', reminderSchema);

module.exports = Reminder;
