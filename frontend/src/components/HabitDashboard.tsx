import React, { useState, useEffect } from 'react';
import { Habit } from '@/types';
import HabitCard from './HabitCard';

const HabitDashboard: React.FC = () => {
  const [habits, setHabits] = useState<Habit[]>([]);

  // Mock data - in real app would fetch from API
  useEffect(() => {
    const mockHabits: Habit[] = [
      {
        id: '1',
        name: 'Drink Water',
        description: 'Drink a glass of water to stay hydrated',
        category: 'Health',
        difficulty: 'easy',
        streak: 5,
        completed: false,
        icon: '💧'
      },
      {
        id: '2',
        name: '5-min Stretch',
        description: 'Quick stretching routine to improve flexibility',
        category: 'Fitness',
        difficulty: 'easy',
        streak: 3,
        completed: false,
        icon: '🧘'
      },
      {
        id: '3',
        name: 'Read 10 Pages',
        description: 'Read 10 pages of a book to expand knowledge',
        category: 'Learning',
        difficulty: 'medium',
        streak: 7,
        completed: false,
        icon: '📚'
      },
      {
        id: '4',
        name: 'Meditate',
        description: '5-minute mindfulness meditation',
        category: 'Wellness',
        difficulty: 'medium',
        streak: 2,
        completed: false,
        icon: '🧠'
      },
      {
        id: '5',
        name: 'Write Journal',
        description: 'Write down thoughts and reflections',
        category: 'Personal',
        difficulty: 'easy',
        streak: 4,
        completed: false,
        icon: '✍️'
      },
      {
        id: '6',
        name: 'Exercise 30min',
        description: 'Complete a 30-minute workout session',
        category: 'Fitness',
        difficulty: 'hard',
        streak: 1,
        completed: false,
        icon: '💪'
      }
    ];
    setHabits(mockHabits);
  }, []);

  const handleStartHabit = (habitId: string) => {
    console.log(`Starting habit: ${habitId}`);
    // Handle habit start logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6 space-y-8">
      {/* Floating particles background effect */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-pink-400 rounded-full animate-bounce opacity-40"></div>
        <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-purple-400 rounded-full animate-ping opacity-30"></div>
      </div>
      
      <div className="relative z-10 text-center space-y-4">
        <h1 className="text-6xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
          Your Daily Habits
        </h1>
        <p className="text-xl text-gray-300 font-light tracking-wide">
          AI-powered micro-habits designed for your success
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
        {habits.map((habit) => (
          <HabitCard 
            key={habit.id} 
            habit={habit} 
            onStart={handleStartHabit}
          />
        ))}
      </div>
    </div>
  );
};

export default HabitDashboard;