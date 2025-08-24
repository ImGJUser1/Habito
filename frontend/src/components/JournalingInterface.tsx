import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { JournalEntry, JournalSummary } from '@/types';

const JournalingInterface: React.FC = () => {
  const [entry, setEntry] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [summary, setSummary] = useState<JournalSummary | null>(null);
  const [recentEntries, setRecentEntries] = useState<JournalEntry[]>([]);

  const handleSubmit = async () => {
    if (!entry.trim()) return;

    setIsSubmitting(true);

    // Simulate API call for AI summarization
    setTimeout(() => {
      const newEntry: JournalEntry = {
        id: Date.now().toString(),
        content: entry,
        date: new Date(),
        mood: 'positive'
      };

      const mockSummary: JournalSummary = {
        id: Date.now().toString(),
        summary: "You felt accomplished after completing your morning routine and noticed increased energy levels throughout the day. Your reflection shows strong commitment to personal growth.",
        insights: [
          "Morning habits positively impact your entire day",
          "You're building strong self-awareness",
          "Consistency is becoming your superpower"
        ],
        mood: 'positive',
        date: new Date()
      };

      setRecentEntries(prev => [newEntry, ...prev.slice(0, 4)]);
      setSummary(mockSummary);
      setEntry('');
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-6xl font-black bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
          AI Journal
        </h1>
        <p className="text-xl text-gray-300">Reflect, analyze, and grow with AI insights</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Journal Input */}
        <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 p-8 rounded-3xl">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
            <span className="mr-3">✍️</span>
            Today's Reflection
          </h3>
          
          <div className="space-y-6">
            <Textarea
              value={entry}
              onChange={(e) => setEntry(e.target.value)}
              placeholder="How did your habits make you feel today? What did you learn about yourself? Share your thoughts..."
              className="min-h-[200px] bg-white/5 border-white/20 text-white placeholder-gray-400 rounded-2xl p-6 focus:border-cyan-400 focus:ring-cyan-400/20 backdrop-blur-xl resize-none"
              disabled={isSubmitting}
            />
            
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">
                {entry.length}/500 characters
              </span>
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting || !entry.trim()}
                className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-white font-bold rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25"
              >
                {isSubmitting ? (
                  <span className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Analyzing...</span>
                  </span>
                ) : (
                  <span className="flex items-center space-x-2">
                    <span>Get AI Insights</span>
                    <span>🤖</span>
                  </span>
                )}
              </Button>
            </div>
          </div>
        </Card>

        {/* AI Summary */}
        <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 p-8 rounded-3xl">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
            <span className="mr-3">🤖</span>
            AI Analysis
          </h3>
          
          {summary ? (
            <div className="space-y-6">
              <div className="p-6 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-2xl border border-white/10">
                <h4 className="text-lg font-semibold text-cyan-300 mb-3">Summary</h4>
                <p className="text-gray-200 leading-relaxed">{summary.summary}</p>
              </div>
              
              <div className="space-y-3">
                <h4 className="text-lg font-semibold text-white">Key Insights</h4>
                {summary.insights.map((insight, index) => (
                  <div key={index} className="flex items-start space-x-3 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300">
                    <span className="text-yellow-400 text-lg">💡</span>
                    <p className="text-gray-300 flex-1">{insight}</p>
                  </div>
                ))}
              </div>
              
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                <span className="text-gray-400">Mood Detected:</span>
                <span className="text-emerald-400 font-semibold capitalize">{summary.mood}</span>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full mx-auto flex items-center justify-center">
                <span className="text-2xl">🤖</span>
              </div>
              <p className="text-gray-400">Write your journal entry to get AI-powered insights</p>
            </div>
          )}
        </Card>
      </div>

      {/* Recent Entries */}
      {recentEntries.length > 0 && (
        <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 p-8 rounded-3xl">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
            <span className="mr-3">📚</span>
            Recent Reflections
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recentEntries.map((entry) => (
              <div key={entry.id} className="p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-gray-400 text-sm">{entry.date.toLocaleDateString()}</span>
                  <span className="text-emerald-400 text-sm capitalize">{entry.mood}</span>
                </div>
                <p className="text-gray-300 text-sm line-clamp-3">{entry.content}</p>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default JournalingInterface;