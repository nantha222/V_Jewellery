const mongoose = require('mongoose');

const jewelrySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  weight: {
    type: Number,
    required: true,
    min: 0
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  modelUrl: {
    type: String,
    required: true
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

const Jewelry = mongoose.model('Jewelry', jewelrySchema);

module.exports = Jewelry;
