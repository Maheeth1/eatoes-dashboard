const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true, index: true },
  description: String,
  category: {
    type: String,
    enum: ['Appetizer', 'Main Course', 'Dessert', 'Beverage'],
    required: true
  },
  price: { type: Number, required: true },
  ingredients: [String],
  isAvailable: { type: Boolean, default: true },
  imageUrl: { type: String, default: 'https://placehold.co/400' }
}, { timestamps: true });

// Text index for fast search
menuItemSchema.index({ name: 'text', ingredients: 'text' });

module.exports = mongoose.model('MenuItem', menuItemSchema);