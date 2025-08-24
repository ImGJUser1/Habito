const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Hash in production
  pushSubscription: { type: Object }, // For Web Push API
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);