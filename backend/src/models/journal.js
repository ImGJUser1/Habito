const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  challenge: { type: String, required: true },
  accepted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Challenge', challengeSchema);