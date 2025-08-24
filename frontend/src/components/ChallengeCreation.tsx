import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Challenge } from '@/types';

const ChallengeCreation: React.FC = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [acceptedChallenges, setAcceptedChallenges] = useState<string[]>([]);

  useEffect(() => {
    // Mock AI-generated challenges
    const mockChallenges: Challenge[] = [
      {
        id: '1',
        title: 'Morning Momentum',
        description: 'Complete 3 habits before 10 AM for the next 5 days',
        difficulty: 'medium',
        duration: 5,
        reward: 250,
        category: 'Productivity',
        requirements: ['Complete morning routine', 'Exercise for 15 minutes', 'Drink 2 glasses of water'],
        icon: '🌅'
      },
      {
        id: '2',
        title: 'Mindful Week',
        description: 'Practice mindfulness through meditation and journaling daily',
        difficulty: 'easy',
        duration: 7,
        reward: 150,
        category: 'Wellness',
        requirements: ['5-minute meditation', 'Write in journal', 'Practice gratitude'],
        icon: '🧘'
      },
      {
        id: '3',
        title: 'Fitness Streak',
        description: 'Maintain a 10-day exercise streak with varied activities',
        difficulty: 'hard',
        duration: 10,
        reward: 500,
        category: 'Fitness',
        requirements: ['30 minutes exercise', 'Try different activities', 'Track progress'],
        icon: '💪'
      },
      {
        id: '4',
        title: 'Learning Sprint',
        description: 'Dedicate 30 minutes daily to learning something new',
        difficulty: 'medium',
        duration: 7,
        reward: 300,
        category: 'Growth',
        requirements: ['Read for 20 minutes', 'Practice new skill', 'Take notes'],
        icon: '📚'
      }
    ];
    setChallenges(mockChallenges);
  }, []);

  const handleAcceptChallenge = (challengeId: string) => {
    if (!acceptedChallenges.includes(challengeId)) {
      setAcceptedChallenges(prev => [...prev, challengeId]);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'from-emerald-400 to-cyan-400';
      case 'medium': return 'from-amber-400 to-orange-400';
      case 'hard': return 'from-red-400 to-pink-400';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Productivity': return 'shadow-blue-500/25';
      case 'Wellness': return 'shadow-purple-500/25';
      case 'Fitness': return 'shadow-emerald-500/25';
      case 'Growth': return 'shadow-amber-500/25';
      default: return 'shadow-gray-500/25';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-6xl font-black bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent">
          Smart Challenges
        </h1>
        <p className="text-xl text-gray-300">AI-generated challenges tailored for your growth</p>
      </div>

      {/* Challenge Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 p-6 rounded-3xl text-center">
          <div className="text-3xl mb-2">🎯</div>
          <div className="text-2xl font-bold text-white">{acceptedChallenges.length}</div>
          <div className="text-gray-400">Active Challenges</div>
        </Card>
        
        <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 p-6 rounded-3xl text-center">
          <div className="text-3xl mb-2">⚡</div>
          <div className="text-2xl font-bold text-cyan-400">{acceptedChallenges.length * 200}</div>
          <div className="text-gray-400">XP Potential</div>
        </Card>
        
        <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 p-6 rounded-3xl text-center">
          <div className="text-3xl mb-2">🏆</div>
          <div className="text-2xl font-bold text-yellow-400">{challenges.length}</div>
          <div className="text-gray-400">Available</div>
        </Card>
      </div>

      {/* Challenges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {challenges.map((challenge, index) => {
          const isAccepted = acceptedChallenges.includes(challenge.id);
          return (
            <Card
              key={challenge.id}
              className={`group relative overflow-hidden bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 p-8 rounded-3xl transition-all duration-500 hover:scale-105 hover:shadow-2xl ${getCategoryColor(challenge.category)} ${
                isAccepted ? 'ring-2 ring-cyan-400 shadow-cyan-500/25' : ''
              }`}
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              {/* Floating particles */}
              <div className="absolute top-4 right-4 w-2 h-2 bg-cyan-400 rounded-full animate-pulse opacity-60"></div>
              <div className="absolute bottom-8 left-6 w-1 h-1 bg-purple-400 rounded-full animate-bounce opacity-40"></div>
              
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="text-5xl transform group-hover:scale-110 transition-transform duration-300 group-hover:rotate-12">
                    {challenge.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors duration-300">
                      {challenge.title}
                    </h3>
                    <p className="text-gray-400 text-sm">{challenge.category}</p>
                  </div>
                </div>
                
                <div className={`px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${getDifficultyColor(challenge.difficulty)} text-white shadow-lg`}>
                  {challenge.difficulty.toUpperCase()}
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-300 mb-6 leading-relaxed">
                {challenge.description}
              </p>

              {/* Requirements */}
              <div className="mb-6">
                <h4 className="text-white font-semibold mb-3">Requirements:</h4>
                <div className="space-y-2">
                  {challenge.requirements.map((req, reqIndex) => (
                    <div key={reqIndex} className="flex items-center space-x-3 text-sm">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                      <span className="text-gray-300">{req}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between mb-6 text-sm">
                <div className="flex items-center space-x-4">
                  <span className="text-gray-400">Duration: <span className="text-white font-medium">{challenge.duration} days</span></span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-yellow-400">⚡</span>
                  <span className="text-white font-bold">{challenge.reward} XP</span>
                </div>
              </div>

              {/* Action Button */}
              <Button
                onClick={() => handleAcceptChallenge(challenge.id)}
                disabled={isAccepted}
                className={`w-full py-4 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 ${
                  isAccepted
                    ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white cursor-default'
                    : 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 text-white hover:shadow-lg hover:shadow-red-500/25'
                }`}
              >
                {isAccepted ? (
                  <span className="flex items-center justify-center space-x-2">
                    <span>Challenge Accepted!</span>
                    <span>✅</span>
                  </span>
                ) : (
                  <span className="flex items-center justify-center space-x-2">
                    <span>Accept Challenge</span>
                    <span>🚀</span>
                  </span>
                )}
              </Button>

              {/* Accepted overlay */}
              {isAccepted && (
                <div className="absolute top-0 right-0 bg-gradient-to-bl from-emerald-400/20 to-transparent w-24 h-24 rounded-3xl"></div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ChallengeCreation;