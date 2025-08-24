import React, { useState } from 'react';
import Navigation from './Navigation';
import HabitDashboard from './HabitDashboard';
import MoodInsights from './MoodInsights';
import JournalingInterface from './JournalingInterface';
import ChatInterface from './ChatInterface';
import ChallengeCreation from './ChallengeCreation';
import GamificationLayer from './GamificationLayer';
import LanguageSelector from './LanguageSelector';
import NotificationPanel from './NotificationPanel';

const AppLayout: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <HabitDashboard />;
      case 'insights':
        return <MoodInsights />;
      case 'journal':
        return <JournalingInterface />;
      case 'chat':
        return <ChatInterface />;
      case 'challenges':
        return <ChallengeCreation />;
      case 'gamification':
        return <GamificationLayer />;
      case 'language':
        return <LanguageSelector />;
      default:
        return <HabitDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-cyan-400/10 to-purple-400/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Navigation */}
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      {/* Main Content */}
      <main className="relative z-10">
        {renderActiveComponent()}
      </main>

      {/* Notification Panel */}
      <NotificationPanel />

      {/* Floating Action Button for Language */}
      <button
        onClick={() => setActiveTab('language')}
        className="fixed bottom-6 left-6 w-14 h-14 bg-gradient-to-r from-green-500 to-blue-500 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center z-40 hover:shadow-blue-500/25"
        title="Language Settings"
      >
        <span className="text-xl">🌍</span>
      </button>

      {/* Floating particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/5 w-1 h-1 bg-cyan-400 rounded-full animate-ping opacity-60" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-2/3 right-1/5 w-2 h-2 bg-purple-400 rounded-full animate-pulse opacity-40" style={{ animationDelay: '3s' }}></div>
        <div className="absolute bottom-1/3 left-2/3 w-1 h-1 bg-pink-400 rounded-full animate-bounce opacity-50" style={{ animationDelay: '5s' }}></div>
      </div>
    </div>
  );
};

export default AppLayout;