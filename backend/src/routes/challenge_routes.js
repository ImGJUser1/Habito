const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const Challenge = require('../models/challenge');
const Habit = require('../models/habit');

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Generate challenge
router.post('/generate/:userId', async (req, res) => {
  const { userId } = req.params;
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  try {
    const habits = await Habit.find({ userId });
    const habitNames = habits.map(h => h.habit).join(', ');
    const prompt = `Generate a mini-challenge for a user with habits: ${habitNames}. Example: "Complete 3 habits today for a streak boost!"`;

    const result = await model.generateContent(prompt);
    const challengeText = result.response.text();

    const challenge = new Challenge({ userId, challenge: challengeText });
    await challenge.save();
    res.json({ challenge: challengeText, id: challenge._id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate challenge' });
  }
});

// Get user challenges
router.get('/:userId', async (req, res) => {
  try {
    const challenges = await Challenge.find({ userId: req.params.userId });
    res.json(challenges);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch challenges' });
  }
});

module.exports = router;