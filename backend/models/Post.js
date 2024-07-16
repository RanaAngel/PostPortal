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
    required: true
  },
  content: {
    type: String,
    required: true
  },
  imageURL:{
    type: String,

  },
  uploadUrl:{
    type: String,
    
  },
  platforms: {
    type: [String],
    required: false
  },
  ayrsharePostId: {
    type: String,
    required: false
  },
  postedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Post', postSchema);