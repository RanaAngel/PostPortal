// models/TokenEntry.js

const {Schema, model} = require("mongoose");

const FacebookSchema = new Schema({
  
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
  facebookAccessToken: {
    type: String,
    required: true,
  },
  
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Facebook = new model('Facebook',FacebookSchema);
module.exports =Facebook;

