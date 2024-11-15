const mongoose = require('mongoose');

//Medicine Schema  
const medicineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  medicineImage: {
    type: String,
  },
  description: {
    type: String,
    trim: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    trim: true,
    ref: 'Category'
  },
  manufacturer: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
    default: 0,
  },
  expirationDate: {
    type: Date,
  },
  dosageForm: {
    type: String,
    required: true,
    trim: true,
  },
  dosageStrength: {
    type: String,
    required: true,
    trim: true,
  },
  instructions: {
    type: String,
    trim: true,
  },
  sideEffects: {
    type: [String],
    default: [],
  },
  interactions: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }, 
 
  topSelling: {
    type: Boolean , 
    default:false
    
  }
});

// Middleware to update the updatedAt field
medicineSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Medicine = mongoose.model('Medicine', medicineSchema);

module.exports = Medicine;
