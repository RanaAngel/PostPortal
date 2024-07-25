// backend/models/Post.js
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: false
  },
  content: {
    type: String,
    required: true
  },
  imageURL:{
    type: String,

  },
  name:{
    type: String,
    required: false
    
  },
  platforms: {
    type: String,
    required: false
  },
  ayrsharePostId: {
    type: String,
    required: false
  },
  postedAt: {
    type: Date,
    default: Date.now
  },
 scheduledAt: {
  type: String,
    required: false
  },
  status: {
    type: String,
    enum: ['draft', 'scheduled', 'published'],
    default: 'draft'
  }
});

module.exports = mongoose.model('Post', postSchema);