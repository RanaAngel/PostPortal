const mongoose = require('mongoose');

// Define the Payment Schema
const PaymentSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      sessionId:{
        type: String,
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
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the Payment Model
const Payment = mongoose.model('Payment', PaymentSchema);

module.exports = Payment;
