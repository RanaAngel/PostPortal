const mongoose = require('mongoose');

// Define the Payment Schema
const PaymentSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    default: 'USD',
  },
  status: {
    type: String,
    enum: ['completed', 'pending', 'failed'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  sessionID: {
    type: String, // Add this field to store Stripe session ID
    required: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the Payment Model
const Payment = mongoose.model('Payment', PaymentSchema);

module.exports = Payment;
