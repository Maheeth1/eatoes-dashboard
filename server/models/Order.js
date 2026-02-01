const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderNumber: { type: String, unique: true }, // Generated in controller
  customerName: { type: String, required: true },
  tableNumber: Number,
  items: [{
    menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' },
    quantity: Number,
    price: Number, // Snapshot price
    name: String   // Snapshot name
  }],
  totalAmount: Number,
  status: {
    type: String,
    enum: ['Pending', 'Preparing', 'Ready', 'Delivered', 'Cancelled'],
    default: 'Pending'
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);