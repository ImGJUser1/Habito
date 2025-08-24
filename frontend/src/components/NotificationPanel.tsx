import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Notification } from '@/types';

const NotificationPanel: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Mock notifications
    const mockNotifications: Notification[] = [
      {
        id: '1',
        message: "🔥 Amazing! You're on a 5-day streak with your morning routine. Keep the momentum going!",
        type: 'motivational',
        timestamp: new Date(),
        read: false,
        priority: 'high'
      },
      {
        id: '2',
        message: "💡 Tip: Try pairing your meditation habit with your morning coffee for better consistency.",
        type: 'tip',
        timestamp: new Date(Date.now() - 3600000),
        read: false,
        priority: 'medium'
      },
      {
        id: '3',
        message: "🎯 Your weekly goal is 85% complete! Just 2 more habits to go.",
        type: 'progress',
        timestamp: new Date(Date.now() - 7200000),
        read: false,
        priority: 'medium'
      },
      {
        id: '4',
        message: "🌟 You've unlocked the 'Early Bird' badge! Check your achievements.",
        type: 'achievement',
        timestamp: new Date(Date.now() - 10800000),
        read: true,
        priority: 'high'
      }
    ];
    setNotifications(mockNotifications);
  }, []);

  const handleDismiss = (notificationId: string) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  };

  const handleMarkAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
    );
  };

  const getNotificationStyle = (type: string, priority: string) => {
    const baseStyle = "transform hover:scale-105 transition-all duration-300 hover:shadow-xl";
    
    switch (type) {
      case 'motivational':
        return `${baseStyle} bg-gradient-to-r from-orange-500/20 to-red-500/20 border-orange-400/30 shadow-orange-500/25`;
      case 'tip':
        return `${baseStyle} bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-cyan-400/30 shadow-cyan-500/25`;
      case 'progress':
        return `${baseStyle} bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-400/30 shadow-purple-500/25`;
      case 'achievement':
        return `${baseStyle} bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-400/30 shadow-yellow-500/25`;
      default:
        return `${baseStyle} bg-gradient-to-r from-gray-500/20 to-gray-600/20 border-gray-400/30`;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'motivational': return '🔥';
      case 'tip': return '💡';
      case 'progress': return '📊';
      case 'achievement': return '🏆';
      default: return '📢';
    }
  };

  const getPriorityIndicator = (priority: string) => {
    switch (priority) {
      case 'high': return '🔴';
      case 'medium': return '🟡';
      case 'low': return '🟢';
      default: return '⚪';
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 z-50 w-96 max-w-[90vw] space-y-4">
      {/* Header */}
      <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 p-4 rounded-2xl">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white flex items-center space-x-2">
            <span>📢</span>
            <span>Smart Notifications</span>
          </h3>
          <Button
            onClick={() => setIsVisible(false)}
            variant="ghost"
            className="text-gray-400 hover:text-white p-2 rounded-xl hover:bg-white/10"
          >
            ✕
          </Button>
        </div>
      </Card>

      {/* Notifications */}
      <div className="space-y-3 max-h-[70vh] overflow-y-auto">
        {notifications.map((notification, index) => (
          <Card
            key={notification.id}
            className={`${getNotificationStyle(notification.type, notification.priority)} backdrop-blur-xl border p-4 rounded-2xl animate-slide-in-right`}
            style={{
              animationDelay: `${index * 0.1}s`,
              animationFillMode: 'both'
            }}
          >
            <div className="flex items-start space-x-3">
              {/* Type Icon */}
              <div className="flex-shrink-0 w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                <span className="text-lg">{getTypeIcon(notification.type)}</span>
              </div>

              {/* Content */}
              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between">
                  <p className={`text-sm leading-relaxed ${notification.read ? 'text-gray-300' : 'text-white font-medium'}`}>
                    {notification.message}
                  </p>
                  <div className="flex items-center space-x-1 ml-2">
                    <span className="text-xs">{getPriorityIndicator(notification.priority)}</span>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                    )}
                  </div>
                </div>

                {/* Timestamp and Actions */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">
                    {notification.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  
                  <div className="flex space-x-2">
                    {!notification.read && (
                      <Button
                        onClick={() => handleMarkAsRead(notification.id)}
                        variant="ghost"
                        className="text-xs px-2 py-1 text-cyan-400 hover:text-cyan-300 hover:bg-white/10 rounded-lg"
                      >
                        Mark Read
                      </Button>
                    )}
                    <Button
                      onClick={() => handleDismiss(notification.id)}
                      variant="ghost"
                      className="text-xs px-2 py-1 text-gray-400 hover:text-gray-300 hover:bg-white/10 rounded-lg"
                    >
                      Dismiss
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress bar for progress notifications */}
            {notification.type === 'progress' && (
              <div className="mt-3 w-full bg-gray-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-purple-400 to-pink-400 h-2 rounded-full transition-all duration-500" style={{ width: '85%' }}></div>
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Clear All Button */}
      {notifications.length > 0 && (
        <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 p-3 rounded-2xl">
          <Button
            onClick={() => setNotifications([])}
            className="w-full bg-gradient-to-r from-red-500/20 to-pink-500/20 hover:from-red-500/30 hover:to-pink-500/30 text-red-300 hover:text-red-200 border border-red-500/30 rounded-xl py-2"
          >
            Clear All Notifications
          </Button>
        </Card>
      )}

      {/* Empty State */}
      {notifications.length === 0 && (
        <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 p-6 rounded-2xl text-center">
          <div className="text-4xl mb-2">🎉</div>
          <p className="text-gray-300">All caught up!</p>
          <p className="text-gray-400 text-sm">No new notifications</p>
        </Card>
      )}
    </div>
  );
};

export default NotificationPanel;