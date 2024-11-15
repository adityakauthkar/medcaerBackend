const mongoose = require('mongoose');


const PharmacyStoreSchema = new mongoose.Schema({
    vendor_id: {
        type: String,
        required: true,
        unique: true,
    },
    logo: {
        type: String,
    },
    business_email: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    pin: {
        type: String,
        required: true,
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true,
        },
        coordinates: {
            type: [Number],
            required: true,
        }
    }
});

PharmacyStoreSchema.index({location:"2dsphere"});

module.exports = mongoose.model('PharmacyStore' , PharmacyStoreSchema);