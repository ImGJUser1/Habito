const express = require('express');
const webpush = require('web-push');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const User = require('../models/user');

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Configure VAPID keys for Web Push
webpush.setVapidDetails(
  'mailto:your-email@example.com',
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

// Generate and send nudge
router.post('/:userId', async (req, res) => {
  const { userId } = req.params;
  const { habitId } = req.body;
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  const prompt = `Generate a short, motivational message for a user working on habit ID ${habitId}. Example: "Great job on your streak! Keep it up!"`;

  try {
    const result = await model.generateContent(prompt);
    const message = result.response.text();

    // Find user subscription
    const user = await User.findOne({ userId });
    if (!user || !user.pushSubscription) {
      return res.status(404).json({ error: 'User or subscription not found' });
    }

    // Send push notification
    const payload = JSON.stringify({ title: 'Habito Nudge', body: message });
    await webpush.sendNotification(user.pushSubscription, payload);

    res.json({ message });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send nudge' });
  }
});

// Store push subscription
router.post('/subscription/:userId', async (req, res) => {
  const { userId } = req.params;
  const { subscription } = req.body;

  try {
    await User.updateOne({ userId }, { pushSubscription: subscription }, { upsert: true });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save subscription' });
  }
});

module.exports = router;