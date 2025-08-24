const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const habitRoutes = require('./routes/habit_routes');
const chatRoutes = require('./routes/chat_routes');
const nudgeRoutes = require('./routes/nudge_routes');
const journalRoutes = require('./routes/journal_routes');
const challengeRoutes = require('./routes/challenge_routes');
const userRoutes = require('./routes/user_routes');
const integrationRoutes = require('./routes/integration_routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // 100 requests per window
});
app.use(limiter);

// CORS configuration
app.use(cors({
  origin: 'http://localhost:5173', // Frontend URL
  credentials: true,
}));

// Middleware
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/habits', habitRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/nudge', nudgeRoutes);
app.use('/api/journal', journalRoutes);
app.use('/api/challenge', challengeRoutes);
app.use('/api/user', userRoutes);
app.use('/api/integration', integrationRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));