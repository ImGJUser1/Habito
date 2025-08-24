const express = require('express');
const axios = require('axios');

const router = express.Router();

// Google Calendar integration (requires OAuth2 setup)
router.get('/calendar/:userId', async (req, res) => {
  const { userId } = req.params;
  const { accessToken } = req.query; // Assume token from frontend

  try {
    const response = await axios.get('https://www.googleapis.com/calendar/v3/users/me/calendarList', {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch calendar data' });
  }
});

// Google Fit integration (requires OAuth2 setup)
router.get('/fit/:userId', async (req, res) => {
  const { userId } = req.params;
  const { accessToken } = req.query;

  try {
    const response = await axios.get('https://www.googleapis.com/fitness/v1/users/me/dataSources', {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch fitness data' });
  }
});

module.exports = router;