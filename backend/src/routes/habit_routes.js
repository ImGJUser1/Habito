const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const Habit = require('../models/habit');

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Generate habit suggestions
router.post('/suggest', async (req, res) => {
  const { userId, goals, routine, preferences } = req.body;
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  const prompt = `Suggest 3 micro-habits for a user with goals: ${goals}, routine: ${routine}, preferences: ${preferences}. Keep habits simple and actionable.`;

  try {
    const result = await model.generateContent(prompt);
    const habits = result.response.text();
    res.json({ habits });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate habits' });
  }
});

// Save habit
router.post('/', async (req, res) => {
  const { userId, habit, description } = req.body;
  try {
    const newHabit = new Habit({ userId, habit, description });
    await newHabit.save();
    res.json({ id: newHabit._id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save habit' });
  }
});

// Get user habits
router.get('/:userId', async (req, res) => {
  try {
    const habits = await Habit.find({ userId: req.params.userId });
    res.json(habits);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch habits' });
  }
});

module.exports = router;
