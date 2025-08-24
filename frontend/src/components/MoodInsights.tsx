import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { MoodData, HabitCompletion } from '@/types';

const MoodInsights: React.FC = () => {
  const [moodData, setMoodData] = useState<MoodData[]>([]);
  const [habitData, setHabitData] = useState<HabitCompletion[]>([]);

  useEffect(() => {
    // Mock data
    const mockMoodData: MoodData[] = [
      { date: '2024-01-15', mood: 'happy', rating: 4, emoji: '😊' },
      { date: '2024-01-16', mood: 'excited', rating: 5, emoji: '🤩' },
      { date: '2024-01-17', mood: 'calm', rating: 4, emoji: '😌' },
      { date: '2024-01-18', mood: 'motivated', rating: 5, emoji: '💪' },
      { date: '2024-01-19', mood: 'happy', rating: 4, emoji: '😊' },
      { date: '2024-01-20', mood: 'energetic', rating: 5, emoji: '⚡' },
      { date: '2024-01-21', mood: 'peaceful', rating: 4, emoji: '🧘' }
    ];

    const mockHabitData: HabitCompletion[] = [
      { date: '2024-01-15', completed: 3, total: 5 },
      { date: '2024-01-16', completed: 5, total: 5 },
      { date: '2024-01-17', completed: 4, total: 5 },
      { date: '2024-01-18', completed: 5, total: 5 },
      { date: '2024-01-19', completed: 3, total: 5 },
      { date: '2024-01-20', completed: 4, total: 5 },
      { date: '2024-01-21', completed: 5, total: 5 }
    ];

    setMoodData(mockMoodData);
    setHabitData(mockHabitData);
  }, []);

  const aiInsights = [
    "Your mood significantly improves when you complete 4+ habits daily",
    "Morning meditation correlates with higher energy levels throughout the day",
    "You're most motivated on weekends - try scheduling challenging habits then"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-6xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Mood & Insights
        </h1>
        <p className="text-xl text-gray-300">AI-powered analytics for your wellbeing journey</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Mood Chart */}
        <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 p-6 rounded-3xl">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
            <span className="mr-3">📈</span>
            Weekly Mood Tracker
          </h3>
          <div className="space-y-4">
            {moodData.map((day, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-all duration-300">
                <div className="flex items-center space-x-4">
                  <span className="text-3xl">{day.emoji}</span>
                  <div>
                    <p className="text-white font-medium">{day.mood}</p>
                    <p className="text-gray-400 text-sm">{new Date(day.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className={`text-lg ${star <= day.rating ? 'text-yellow-400' : 'text-gray-600'}`}>
                        ⭐
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Habit Completion */}
        <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 p-6 rounded-3xl">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
            <span className="mr-3">🎯</span>
            Habit Completion Rate
          </h3>
          <div className="space-y-4">
            {habitData.map((day, index) => {
              const percentage = (day.completed / day.total) * 100;
              return (
                <div key={index} className="p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-all duration-300">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white font-medium">{new Date(day.date).toLocaleDateString()}</span>
                    <span className="text-cyan-400 font-bold">{day.completed}/{day.total}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <p className="text-gray-400 text-sm mt-1">{percentage.toFixed(0)}% completed</p>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* AI Insights */}
      <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 p-8 rounded-3xl">
        <h3 className="text-3xl font-bold text-white mb-6 flex items-center">
          <span className="mr-3">🤖</span>
          AI-Powered Insights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {aiInsights.map((insight, index) => (
            <div key={index} className="p-6 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-2xl border border-white/10 hover:border-white/30 transition-all duration-300">
              <div className="flex items-start space-x-3">
                <span className="text-2xl">💡</span>
                <p className="text-gray-200 leading-relaxed">{insight}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default MoodInsights;