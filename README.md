Habito: AI-Powered Daily Micro-Habit Coach
Overview
Habito is an open-source, AI-powered micro-habit coaching platform designed to help users build sustainable habits through personalized, data-driven guidance. Combining a React + TypeScript frontend with a Node.js + MongoDB backend, it leverages the Google Gemini API to deliver intelligent features like habit suggestions, motivational nudges, and conversational coaching. Hosted in a single GitHub repository, it supports standalone deployment on PCs or servers, ensuring zero hosting costs for development (using MongoDB local or Atlas free tier). The project is hosted on GitHub to encourage community contributions, with a robust security layer to protect intellectual property while fostering collaboration. Monetization is enabled through GitHub Sponsors, GitHub Marketplace, and a potential SaaS model, allowing you and contributors to earn through shared efforts, premium features, or consulting services.
Features
Habito offers a comprehensive set of features powered by AI, integrating frontend UI components with backend APIs. Below is a detailed explanation of each feature, including how it works.

Personalized Habit Formation:

Explanation: Suggests tiny, actionable habits tailored to user goals, routines, and preferences (e.g., "Drink water after meetings" for productivity goals).
How It Works: Frontend (HabitDashboard.tsx, HabitCard.tsx) sends user data to backend API (POST /api/habits/suggest), which uses Google Gemini API to generate suggestions. Results are stored in MongoDB (Habit model) and displayed in a responsive grid UI. Users select habits via buttons, triggering POST /api/habits to save data.


Adaptive Nudging Engine:

Explanation: Delivers dynamic reminders and motivational messages based on user behavior (e.g., "Keep up your streak!").
How It Works: Backend (nudge_routes.js) generates messages via Gemini and sends push notifications using Web Push API (push.js). Frontend (NotificationPanel.tsx) subscribes via POST /api/nudge/subscription/:userId and displays nudges with toast.tsx or sonner.tsx. Notifications appear as slide-in panels or toasts.


Mood & Behavior Insights:

Explanation: Analyzes mood inputs (emojis/ratings) against habit performance to provide progress insights (e.g., "Mood improves after exercise").
How It Works: Frontend (MoodInsights.tsx) collects mood data via forms (form.tsx, input.tsx) and sends to backend (GET /api/insights/:userId – to be added). Backend uses Gemini to correlate data from MongoDB (Journal and Habit models) and returns insights, visualized in charts (chart.tsx).


AI-Powered Journaling:

Explanation: Users log habit experiences; AI extracts themes and summarizes progress (e.g., "You overcame challenges today").
How It Works: Frontend (JournalingInterface.tsx) uses textarea.tsx for input, submits via POST /api/journal. Backend (journal_routes.js) processes with Gemini for sentiment analysis and stores summaries in MongoDB (Journal model). Summaries are displayed in progress views.


Conversational AI Coach:

Explanation: Interactive chatbot for habit advice (e.g., "How to stay motivated?").
How It Works: Frontend (ChatInterface.tsx) sends queries via POST /api/chat, using input.tsx and button.tsx for UI. Backend (chat_routes.js) generates responses with Gemini and stores history in MongoDB (Chat model). Responses appear in chat bubbles.


Smart Challenge Creation:

Explanation: Creates mini-challenges to boost motivation (e.g., "Complete 3 habits today").
How It Works: Backend (challenge_routes.js) generates challenges via Gemini based on user habits (POST /api/challenge/generate/:userId). Frontend (ChallengeCreation.tsx) displays in cards (card.tsx) with "Accept" buttons, fetching via GET /api/challenge/:userId.


Multilingual Support:

Explanation: App communicates in Indian languages (Hindi, Tamil) for wider accessibility.
How It Works: Frontend (LanguageSelector.tsx, dropdown-menu.tsx) sets language preference, sending parameters to backend APIs (e.g., ?language=hi). Backend uses Gemini's language capabilities for responses, with frontend handling UI localization via i18next.


Integration with Wearables & Health Data:

Explanation: Syncs activity/sleep data from Google Fit to tailor habits.
How It Works: Frontend sends OAuth tokens to backend (GET /api/integration/fit/:userId). Backend (integration_routes.js) fetches data and uses Gemini to optimize suggestions, displayed in calendar.tsx or insights UI.


Calendar Sync & Context Awareness:

Explanation: Schedules habits around calendar events.
How It Works: Frontend integrates Google Calendar API, sending data to backend (GET /api/integration/calendar/:userId). Backend analyzes with Gemini for timing suggestions, updating nudges or dashboards.


Social Sharing & Community Learning:

Explanation: Generates shareable motivational stories.
How It Works: Backend (planned /api/social/share) uses Gemini to create stories from user data. Frontend (button.tsx) triggers sharing to X or forums.


Gamification Layer:

Explanation: Rewards progress with badges/streaks.
How It Works: Backend stores in MongoDB (User model), generating descriptions via Gemini (GET /api/gamification/:userId – to be added). Frontend (GamificationLayer.tsx, badge.tsx, progress.tsx) displays grid with tooltips.



Looking for Contributions
We're seeking contributors to enhance Habito with a futuristic UI—think sleek, AI-driven interfaces with immersive animations, dark/light modes, and responsive designs. Join to innovate the frontend (React, TypeScript) or backend (Node.js, MongoDB). Contributors can earn via GitHub Sponsors, Marketplace, or SaaS revenue shares. See CONTRIBUTING.md for details and contact your-email@example.com to collaborate!
Tech Stack

Frontend: React, TypeScript, Tailwind CSS, shadcn/ui, React Query
Backend: Node.js, Express, MongoDB, Google Gemini API
Authentication: JSON Web Tokens (JWT)
Notifications: Web Push API

Getting Started
Prerequisites

Node.js (v18+)
MongoDB (local or Atlas free tier)
Google Cloud account with Gemini API key
VS Code

Installation

Clone the repository:git clone https://github.com/ImGJUser1/Habito.git


Install backend dependencies:cd Habito/backend
npm install


Configure backend environment:
Copy backend/.env.example to backend/.env and add:GEMINI_API_KEY=your-api-key
MONGODB_URI=mongodb://localhost/habito
JWT_SECRET=your-jwt-secret
VAPID_PUBLIC_KEY=your-vapid-public-key
VAPID_PRIVATE_KEY=your-vapid-private-key




Run MongoDB locally or use Atlas free tier.
Start backend:npm start


Install frontend dependencies:cd ../frontend
npm install


Run frontend:npm run dev



Integration

Frontend-Backend: Frontend (http://localhost:5173) calls backend APIs (http://localhost:3000/api) via frontend/src/services/api.ts.
Authentication: JWT tokens stored in localStorage via AppContext.tsx.
Notifications: Web Push subscriptions via frontend/public/service-worker.js and /api/nudge/subscription.

Security

IP Protection: MIT License requires attribution. Commercial use requires agreement (your-email@example.com).
API Security: JWT authentication, rate limiting (100 requests/15min).
Sensitive Data: API keys in backend/.env, tokens in localStorage (HTTPS in production).

Contributing
See CONTRIBUTING.md for guidelines. Contributors can earn via GitHub Sponsors or Marketplace (contact your-email@example.com).
Monetization

GitHub Sponsors: Support at github.com/sponsors/ImGJUser1 ($5–$100/month).
GitHub Marketplace: Premium APIs ($5–$100/month).
SaaS Plans: Hosted version (contact for details).
Consulting: Custom integrations (your-email@example.com).

License
MIT License. See LICENSE.
