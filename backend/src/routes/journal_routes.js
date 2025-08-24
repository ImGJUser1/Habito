const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const Journal = require('../models/journal');

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Submit journal entry and get AI summary
router.post('/', async (req, res) => {
  const { userId, entry } = req.body;
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  const prompt = `Summarize this journal entry in 2-3 sentences, focusing on the user's mood and progress: "${entry}"`;

  try {
    const result = await model.generateContent(prompt);
    const summary = result.response.text();

    const journal = new Journal({ userId, entry, summary });
    await journal.save();
    res.json({ summary, id: journal._id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to process journal entry' });
  }
});

// Get user journal entries
router.get('/:userId', async (req, res) => {
  try {
    const journals = await Journal.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(journals);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch journal entries' });
  }
});

module.exports = router;