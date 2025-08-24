import axios from 'axios';

const API_URL = 'http://localhost:3000/api'; // Update for production

// Set up Axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add JWT token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Habit APIs
export const suggestHabits = async (data: { userId: string; goals: string; routine: string; preferences: string }) => {
  const response = await api.post('/habits/suggest', data);
  return response.data;
};

export const saveHabit = async (data: { userId: string; habit: string; description?: string }) => {
  const response = await api.post('/habits', data);
  return response.data;
};

export const getHabits = async (userId: string) => {
  const response = await api.get(`/habits/${userId}`);
  return response.data;
};

// Chat APIs
export const sendChatMessage = async (data: { userId: string; message: string }) => {
  const response = await api.post('/chat', data);
  return response.data;
};

// Journal APIs
export const submitJournal = async (data: { userId: string; entry: string }) => {
  const response = await api.post('/journal', data);
  return response.data;
};

export const getJournals = async (userId: string) => {
  const response = await api.get(`/journal/${userId}`);
  return response.data;
};

// Challenge APIs
export const generateChallenge = async (userId: string) => {
  const response = await api.post(`/challenge/generate/${userId}`);
  return response.data;
};

export const getChallenges = async (userId: string) => {
  const response = await api.get(`/challenge/${userId}`);
  return response.data;
};

// User APIs
export const registerUser = async (data: { userId: string; email: string; password: string }) => {
  const response = await api.post('/user/register', data);
  localStorage.setItem('token', response.data.token);
  return response.data;
};

export const loginUser = async (data: { email: string; password: string }) => {
  const response = await api.post('/user/login', data);
  localStorage.setItem('token', response.data.token);
  return response.data;
};

// Notification subscription
export const subscribeToPush = async (userId: string, subscription: PushSubscription) => {
  const response = await api.post(`/nudge/subscription/${userId}`, { subscription });
  return response.data;
};

// Integration APIs
export const getCalendarData = async (userId: string, accessToken: string) => {
  const response = await api.get(`/integration/calendar/${userId}`, { params: { accessToken } });
  return response.data;
};

export const getFitData = async (userId: string, accessToken: string) => {
  const response = await api.get(`/integration/fit/${userId}`, { params: { accessToken } });
  return response.data;
};