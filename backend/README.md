Habito Backend: AI-Powered Daily Micro-Habit Coach
The backend for Habito, a standalone Node.js + MongoDB API using Google Gemini AI to power habit coaching features, designed for integration with a React frontend.
Features

Personalized Habit Formation: Generates micro-habit suggestions via Gemini API.
Adaptive Nudging Engine: Sends motivational messages using Web Push API.
Mood & Behavior Insights: Stores and analyzes mood/habit data.
AI-Powered Journaling: Summarizes user journal entries with Gemini API.
Conversational AI Coach: Handles chat queries with natural language responses.
Smart Challenge Creation: Generates mini-challenges for user engagement.
Multilingual Support: Supports Indian languages (Hindi, Tamil, etc.).
Wearable & Calendar Integration: Integrates with Google Fit and Calendar APIs.
Gamification: Manages badges and streaks.
Social Sharing: Generates shareable motivational stories.

Tech Stack

Backend: Node.js, Express
Database: MongoDB (local or Atlas free tier)
AI: Google Gemini API
Authentication: JSON Web Tokens (JWT)
Notifications: Web Push API

Getting Started
Prerequisites

Node.js (v18+)
MongoDB (local or Atlas free tier)
Google Cloud account with Gemini API key
VS Code

Installation

Clone the repository:git clone https://github.com/your-username/habito-backend.git


Install dependencies:cd habito-backend
npm install


Configure environment variables:
Create a .env file with:GEMINI_API_KEY=your-api-key
MONGODB_URI=mongodb://localhost/habito
JWT_SECRET=your-jwt-secret
VAPID_PUBLIC_KEY=your-vapid-public-key
VAPID_PRIVATE_KEY=your-vapid-private-key




Run MongoDB locally (or use Atlas free tier).
Start the server:npm start



Monetization

GitHub Sponsors: Support Habito at github.com/sponsors/your-username.
GitHub Marketplace: Coming soon with premium APIs.
SaaS Plans: Hosted version with subscriptions (contact for details).

Contributing
Contributions welcome! See CONTRIBUTING.md for guidelines.
License
MIT License. See LICENSE for details.