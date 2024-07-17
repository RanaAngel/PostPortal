const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
  userID: { type: String, required: true },
  postId: { type: String, required: true },
  platform: { type: String, required: true },
  analytics: mongoose.Schema.Types.Mixed, // This will store the analytics data
  createdAt: { type: Date, default: Date.now },
});

const Analytics = mongoose.model('Analytics', analyticsSchema);

module.exports = Analytics;
