import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge, Streak, UserLevel } from '@/types';

const GamificationLayer: React.FC = () => {
  const [badges, setBadges] = useState<Badge[]>([]);
  const [streaks, setStreaks] = useState<Streak[]>([]);
  const [userLevel, setUserLevel] = useState<UserLevel | null>(null);

  useEffect(() => {
    // Mock data
    const mockBadges: Badge[] = [
      {
        id: '1',
        name: 'Early Bird',
        description: 'Complete morning habits for 7 days',
        icon: '🌅',
        earned: true,
        earnedDate: new Date('2024-01-15'),
        rarity: 'common'
      },
      {
        id: '2',
        name: 'Streak Master',
        description: 'Maintain a 30-day streak',
        icon: '🔥',
        earned: true,
        earnedDate: new Date('2024-01-20'),
        rarity: 'rare'
      },
      {
        id: '3',
        name: 'Wellness Warrior',
        description: 'Complete all wellness habits for 14 days',
        icon: '⚡',
        earned: false,
        rarity: 'epic'
      },
      {
        id: '4',
        name: 'Habit Legend',
        description: 'Reach 100-day streak',
        icon: '👑',
        earned: false,
        rarity: 'legendary'
      }
    ];

    const mockStreaks: Streak[] = [
      { habitId: '1', habitName: 'Drink Water', currentStreak: 15, bestStreak: 23 },
      { habitId: '2', habitName: 'Exercise', currentStreak: 8, bestStreak: 12 },
      { habitId: '3', habitName: 'Meditate', currentStreak: 5, bestStreak: 18 },
      { habitId: '4', habitName: 'Read', currentStreak: 12, bestStreak: 20 }
    ];

    const mockUserLevel: UserLevel = {
      currentLevel: 7,
      currentXP: 2450,
      xpToNextLevel: 3000,
      totalXP: 12450
    };

    setBadges(mockBadges);
    setStreaks(mockStreaks);
    setUserLevel(mockUserLevel);
  }, []);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'from-gray-400 to-gray-600';
      case 'rare': return 'from-blue-400 to-cyan-400';
      case 'epic': return 'from-purple-400 to-pink-400';
      case 'legendary': return 'from-yellow-400 to-orange-400';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getRarityGlow = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'shadow-gray-500/25';
      case 'rare': return 'shadow-cyan-500/25';
      case 'epic': return 'shadow-purple-500/25';
      case 'legendary': return 'shadow-yellow-500/25';
      default: return 'shadow-gray-500/25';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-6xl font-black bg-gradient-to-r from-yellow-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
          Your Progress
        </h1>
        <p className="text-xl text-gray-300">Badges, streaks, and achievements</p>
      </div>

      {/* User Level */}
      {userLevel && (
        <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 p-8 rounded-3xl">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl flex items-center justify-center shadow-lg shadow-yellow-500/25">
                <span className="text-2xl font-bold text-white">{userLevel.currentLevel}</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Level {userLevel.currentLevel}</h3>
                <p className="text-gray-400">Habit Master</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-cyan-400 font-bold text-lg">{userLevel.currentXP.toLocaleString()} XP</p>
              <p className="text-gray-400 text-sm">Total: {userLevel.totalXP.toLocaleString()}</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Progress to Level {userLevel.currentLevel + 1}</span>
              <span className="text-white">{userLevel.currentXP}/{userLevel.xpToNextLevel}</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 rounded-full transition-all duration-1000"
                style={{ width: `${(userLevel.currentXP / userLevel.xpToNextLevel) * 100}%` }}
              ></div>
            </div>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Badges */}
        <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 p-6 rounded-3xl">
          <h3 className="text-3xl font-bold text-white mb-6 flex items-center">
            <span className="mr-3">🏆</span>
            Achievement Badges
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {badges.map((badge) => (
              <div
                key={badge.id}
                className={`relative p-6 rounded-2xl transition-all duration-300 hover:scale-105 ${
                  badge.earned
                    ? `bg-gradient-to-br ${getRarityColor(badge.rarity)} shadow-lg ${getRarityGlow(badge.rarity)}`
                    : 'bg-gray-800/50 border border-gray-700'
                } ${badge.earned ? 'hover:shadow-xl' : ''}`}
              >
                <div className="text-center space-y-3">
                  <div className={`text-4xl ${badge.earned ? '' : 'grayscale opacity-50'}`}>
                    {badge.icon}
                  </div>
                  <h4 className={`font-bold ${badge.earned ? 'text-white' : 'text-gray-500'}`}>
                    {badge.name}
                  </h4>
                  <p className={`text-xs ${badge.earned ? 'text-gray-200' : 'text-gray-600'}`}>
                    {badge.description}
                  </p>
                  {badge.earned && badge.earnedDate && (
                    <p className="text-xs text-gray-300">
                      Earned {badge.earnedDate.toLocaleDateString()}
                    </p>
                  )}
                </div>
                {badge.earned && (
                  <div className="absolute top-2 right-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Streaks */}
        <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 p-6 rounded-3xl">
          <h3 className="text-3xl font-bold text-white mb-6 flex items-center">
            <span className="mr-3">🔥</span>
            Habit Streaks
          </h3>
          <div className="space-y-4">
            {streaks.map((streak) => (
              <div key={streak.habitId} className="p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-all duration-300">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-white font-medium">{streak.habitName}</h4>
                  <div className="flex items-center space-x-2">
                    <span className="text-orange-400">🔥</span>
                    <span className="text-white font-bold">{streak.currentStreak}</span>
                  </div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Current Streak</span>
                  <span className="text-gray-400">Best: {streak.bestStreak}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                  <div 
                    className="h-full bg-gradient-to-r from-orange-400 to-red-400 rounded-full"
                    style={{ width: `${Math.min((streak.currentStreak / streak.bestStreak) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default GamificationLayer;