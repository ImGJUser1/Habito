// TypeScript interfaces for Habito app

export interface Habit {
  id: string;
  name: string;
  description: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  streak: number;
  completed: boolean;
  icon: string;
}

export interface Notification {
  id: string;
  message: string;
  type: 'motivation' | 'reminder' | 'achievement';
  timestamp: Date;
  read: boolean;
}

export interface MoodData {
  id: string;
  date: string;
  mood: 'very_sad' | 'sad' | 'neutral' | 'happy' | 'very_happy';
  emoji: string;
  habitCompletionRate: number;
}

export interface JournalEntry {
  id: string;
  content: string;
  date: string;
  aiSummary?: string;
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  reward: string;
  duration: string;
  accepted: boolean;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedDate?: Date;
}

export interface Language {
  code: string;
  name: string;
  nativeName: string;
}