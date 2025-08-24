const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const Chat = require('../models/chat');

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Handle chat queries
router.post('/', async (req, res) => {
  const { userId, message } = req.body;
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  const prompt = `You are a habit coach. Respond to: "${message}" in a friendly, motivational tone.`;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response.text();
    const chat = new Chat({ userId, message, response });
    await chat.save();
    res.json({ response });
  } catch (error) {
    res.status(500).json({ error: 'Failed to process chat' });
  }
});

module.exports = router;