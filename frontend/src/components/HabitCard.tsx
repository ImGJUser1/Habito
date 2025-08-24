import React from 'react';
import { Habit } from '@/types';
import { Button } from '@/components/ui/button';

interface HabitCardProps {
  habit: Habit;
  onStart: (habitId: string) => void;
}

const HabitCard: React.FC<HabitCardProps> = ({ habit, onStart }) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'from-emerald-400 to-cyan-400';
      case 'medium': return 'from-amber-400 to-orange-400';
      case 'hard': return 'from-red-400 to-pink-400';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getCategoryGlow = (category: string) => {
    switch (category) {
      case 'Health': return 'shadow-cyan-500/25';
      case 'Fitness': return 'shadow-emerald-500/25';
      case 'Learning': return 'shadow-purple-500/25';
      case 'Wellness': return 'shadow-pink-500/25';
      case 'Personal': return 'shadow-amber-500/25';
      default: return 'shadow-blue-500/25';
    }
  };

  return (
    <div className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 p-6 transition-all duration-500 hover:scale-105 hover:shadow-2xl ${getCategoryGlow(habit.category)} hover:border-white/40`}>
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Floating icon */}
      <div className="relative z-10 flex items-center justify-between mb-4">
        <div className="text-4xl transform group-hover:scale-110 transition-transform duration-300 group-hover:rotate-12">
          {habit.icon}
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${getDifficultyColor(habit.difficulty)} text-white shadow-lg`}>
          {habit.difficulty.toUpperCase()}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 space-y-3">
        <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors duration-300">
          {habit.name}
        </h3>
        
        <p className="text-gray-300 text-sm leading-relaxed">
          {habit.description}
        </p>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400 font-medium">
            {habit.category}
          </span>
          <div className="flex items-center space-x-2">
            <span className="text-orange-400">🔥</span>
            <span className="text-white font-bold">{habit.streak}</span>
          </div>
        </div>

        {/* Action button */}
        <Button
          onClick={() => onStart(habit.id)}
          className="w-full mt-4 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white font-bold py-3 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 border-0"
        >
          <span className="flex items-center justify-center space-x-2">
            <span>Start Now</span>
            <span className="text-lg">⚡</span>
          </span>
        </Button>
      </div>

      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/10 to-transparent rounded-bl-3xl opacity-50"></div>
    </div>
  );
};

export default HabitCard;