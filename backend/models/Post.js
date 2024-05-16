// backend/models/Post.js
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  imageURL: String, // Assuming it's optional
  dateTime: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Post', postSchema);
