// src/components/AnnouncementsCard.tsx
import { Announcement, StudentNotification } from '../lib/googleSheets';

interface AnnouncementsCardProps {
  announcements: Announcement[];
  notifications: StudentNotification[];
  studentId: string;
  darkMode: boolean;
  onMarkAsRead: (announcementId: number) => void;
}

export default function AnnouncementsCard({ 
  announcements, 
  notifications, 
  studentId, 
  darkMode,
  onMarkAsRead 
}: AnnouncementsCardProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority?.toLowerCase()) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority?.toLowerCase()) {
      case 'high': return '🔴';
      case 'medium': return '🟡';
      case 'low': return '🟢';
      default: return '⚪';
    }
  };

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    } catch {
      return 'Invalid date';
    }
  };

  const isUnread = (announcementId: number) => {
    const notification = notifications.find(n => n.announcementId === announcementId);
    return notification ? !notification.read : true;
  };

  // Filter valid announcements
  const validAnnouncements = announcements
    .filter(a => a && a.title && a.title !== 'null' && a.content)
    .slice(0, 6);

  if (validAnnouncements.length === 0) {
    return (
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-3xl p-6 shadow-xl`}>
        <p className="text-center text-gray-500">No announcements</p>
      </div>
    );
  }

  return (
    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:transform hover:-translate-y-1`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Recent Announcements
          </h3>
          <p className="text-sm text-gray-500 mt-1">{validAnnouncements.length} notifications</p>
        </div>
        <span className="text-3xl">📢</span>
      </div>

      <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
        {validAnnouncements.map((announcement) => {
          const unread = isUnread(announcement.id);
          
          return (
            <div
              key={announcement.id}
              onClick={() => unread && onMarkAsRead(announcement.id)}
              className={`p-4 rounded-2xl cursor-pointer transition-all duration-200 ${
                darkMode 
                  ? 'bg-gray-700 hover:bg-gray-650' 
                  : unread 
                    ? 'bg-blue-50 hover:bg-blue-100' 
                    : 'bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2 flex-1">
                  <span className="text-lg">{getPriorityIcon(announcement.priority)}</span>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'} truncate`}>
                      {announcement.title}
                    </p>
                  </div>
                  {unread && (
                    <span className="px-2 py-1 bg-blue-500 text-white text-xs font-bold rounded-full animate-pulse">
                      NEW
                    </span>
                  )}
                </div>
              </div>

              <p className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-3 line-clamp-2`}>
                {announcement.content}
              </p>

              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <span className={`${getPriorityColor(announcement.priority)} text-white px-2 py-1 rounded-full font-bold`}>
                    {announcement.priority || 'NORMAL'}
                  </span>
                  <span className="text-gray-500">👤 {announcement.author}</span>
                </div>
                <span className="text-gray-500">📅 {formatDate(announcement.date)}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}