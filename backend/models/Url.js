const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  shortId: String,
  shortUrl: String,
  longUrl: String,
  userId: String, // Optional
  createdAt: {
    type: Date,
    default: Date.now,
  },
  useCount: {
    type: Number,
    default: 0,
  },
  expiry: Date,
});

module.exports = mongoose.model('Url', urlSchema);
