import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  HiOutlineSearch, 
  HiOutlineBell, 
  HiOutlineUser,
  HiOutlineClock,
  HiOutlineLogout,
  HiOutlineMenu
} from 'react-icons/hi';
import { useStudent } from '../../context/StudentContext';
import { fetchUnreadCount } from '../../services/notificationService';

interface TopbarProps {
  title: string;
  isMobile?: boolean;
  onMenuClick?: () => void;
}

export function Topbar({ title, isMobile, onMenuClick }: TopbarProps) {
  const { currentStudent, logout } = useStudent();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch unread count when student changes
  useEffect(() => {
    if (currentStudent?.email) {
      const loadUnread = async () => {
        setIsLoading(true);
        const count = await fetchUnreadCount(currentStudent.email);
        setUnreadCount(count);
        setIsLoading(false);
      };
      loadUnread();
      
      // Refresh every 30 seconds
      const interval = setInterval(loadUnread, 30000);
      return () => clearInterval(interval);
    }
  }, [currentStudent?.email]);

  const formatTime = () => currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const formatDate = () => currentTime.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <header className={ixed top-0 right-0 z-30 glass border-b transition-all }
            style={{ borderColor: 'rgba(45, 154, 138, 0.1)' }}>
      <div className={${isMobile ? 'px-4 py-2' : 'px-8 py-4'} flex items-center justify-between}>
        {isMobile ? (
          <button onClick={onMenuClick} className="p-2 rounded-xl hover:bg-white/50 transition-colors" style={{ color: '#247d70' }}>
            <HiOutlineMenu size={24} />
          </button>
        ) : (
          <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} 
                     className="text-2xl font-semibold" style={{ color: '#0d312c' }}>
            {title}
          </motion.h1>
        )}

        {!isMobile && (
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3 px-4 py-2 rounded-2xl" style={{ background: 'rgba(45, 154, 138, 0.05)' }}>
              <HiOutlineClock size={20} style={{ color: '#1b5f56' }} />
              <div className="text-sm">
                <span className="font-medium" style={{ color: '#0d312c' }}>{formatTime()}</span>
                <span className="mx-2" style={{ color: '#66c3b7' }}>•</span>
                <span style={{ color: '#247d70' }}>{formatDate()}</span>
              </div>
            </div>
          </div>
        )}

        {isMobile && (
          <div className="flex items-center space-x-2 px-3 py-1 rounded-2xl" style={{ background: 'rgba(45, 154, 138, 0.05)' }}>
            <HiOutlineClock size={16} style={{ color: '#1b5f56' }} />
            <span className="text-xs font-medium" style={{ color: '#0d312c' }}>{formatTime()}</span>
          </div>
        )}

        <div className="flex items-center space-x-2 md:space-x-3">
          <button className="p-2 rounded-xl hover:bg-white/50 transition-colors" style={{ color: '#247d70' }}>
            <HiOutlineSearch size={isMobile ? 18 : 22} />
          </button>

          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-xl hover:bg-white/50 transition-colors relative"
              style={{ color: '#247d70' }}
            >
              <HiOutlineBell size={isMobile ? 18 : 22} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] rounded-full text-white text-xs flex items-center justify-center px-1"
                      style={{ background: '#ef4444' }}>
                  {unreadCount > 99 ? '99+' : unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 mt-2 w-80 glass-card rounded-2xl shadow-xl overflow-hidden z-50"
              >
                <div className="p-3 border-b" style={{ borderColor: 'rgba(45, 154, 138, 0.1)' }}>
                  <h3 className="font-semibold text-seafoam-900">Notifications</h3>
                  {isLoading && <p className="text-xs text-seafoam-400">Loading...</p>}
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {unreadCount === 0 ? (
                    <div className="p-4 text-center text-seafoam-500">No new notifications</div>
                  ) : (
                    <div className="p-4 text-center">
                      <p className="text-seafoam-600">You have {unreadCount} unread {unreadCount === 1 ? 'notification' : 'notifications'}</p>
                      <button className="mt-3 px-4 py-2 rounded-xl text-sm text-white bg-seafoam-600 hover:bg-seafoam-700">
                        View all
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </div>

          {/* Profile */}
          <div className="relative">
            <button className="flex items-center space-x-2 p-2 rounded-xl hover:bg-white/50 transition-colors">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white"
                   style={{ background: 'linear-gradient(135deg, #1b5f56, #247d70)' }}>
                <span className="font-medium text-sm">{currentStudent?.studentName?.charAt(0) || 'S'}</span>
              </div>
              {!isMobile && (
                <div className="text-left hidden lg:block">
                  <p className="text-sm font-medium text-seafoam-900">{currentStudent?.studentName || 'Student'}</p>
                  <p className="text-xs text-seafoam-500">{currentStudent?.studentId || 'AUY Student'}</p>
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
