// models/Twitter.js

const mongoose = require('mongoose');

const twitterSchema = new mongoose.Schema({
  accessToken: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model('Twitter', twitterSchema);
