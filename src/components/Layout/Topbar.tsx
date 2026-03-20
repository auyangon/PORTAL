import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  HiOutlineSearch, 
  HiOutlineBell, 
  HiOutlineUser,
  HiOutlineClock,
  HiOutlineLogout,
  HiOutlineSun,
  HiOutlineMoon,
  HiOutlineMenu
} from 'react-icons/hi';
import { useStudent } from '../../context/StudentContext';

interface TopbarProps {
  title: string;
  isMobile?: boolean;
  onMenuClick?: () => void;
}

export function Topbar({ title, isMobile, onMenuClick }: TopbarProps) {
  const { currentStudent, logout } = useStudent();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header 
      className={`fixed top-0 right-0 z-30 glass border-b transition-all ${
        isMobile ? 'left-0' : 'left-72'
      }`}
      style={{ borderColor: 'rgba(45, 154, 138, 0.1)' }}
    >
      <div className={`${isMobile ? 'px-4 py-2' : 'px-8 py-4'} flex items-center justify-between`}>
        {/* Left: Menu Button (mobile) or Title (desktop) */}
        {isMobile ? (
          <button
            onClick={onMenuClick}
            className="p-2 rounded-xl hover:bg-white/50 transition-colors"
            style={{ color: '#247d70' }}
          >
            <HiOutlineMenu size={24} />
          </button>
        ) : (
          <motion.h1 
            key={title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-semibold"
            style={{ color: '#0d312c' }}
          >
            {title}
          </motion.h1>
        )}

        {/* Center: Live Clock - hide on very small screens */}
        {!isMobile && (
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3 px-4 py-2 rounded-2xl"
                 style={{ background: 'rgba(45, 154, 138, 0.05)' }}>
              <HiOutlineClock size={20} style={{ color: '#1b5f56' }} />
              <div className="text-sm">
                <span className="font-medium" style={{ color: '#0d312c' }}>{formatTime(currentTime)}</span>
                <span className="mx-2" style={{ color: '#66c3b7' }}>•</span>
                <span style={{ color: '#247d70' }}>{formatDate(currentTime)}</span>
              </div>
            </div>
          </div>
        )}

        {/* Mobile compact clock */}
        {isMobile && (
          <div className="flex items-center space-x-2 px-3 py-1 rounded-2xl"
               style={{ background: 'rgba(45, 154, 138, 0.05)' }}>
            <HiOutlineClock size={16} style={{ color: '#1b5f56' }} />
            <span className="text-xs font-medium" style={{ color: '#0d312c' }}>{formatTime(currentTime)}</span>
          </div>
        )}

        {/* Right: Actions */}
        <div className="flex items-center space-x-2 md:space-x-3">
          <button className="p-2 rounded-xl hover:bg-white/50 transition-colors"
                  style={{ color: '#247d70' }}>
            <HiOutlineSearch size={isMobile ? 18 : 22} />
          </button>

          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-xl hover:bg-white/50 transition-colors relative"
            style={{ color: '#247d70' }}
          >
            <HiOutlineBell size={isMobile ? 18 : 22} />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full"
                  style={{ background: 'linear-gradient(135deg, #1b5f56, #2d9a8a)' }} />
          </button>

          <button 
            onClick={toggleDarkMode}
            className="p-2 rounded-xl hover:bg-white/50 transition-colors hidden sm:block"
            style={{ color: '#247d70' }}
          >
            {isDarkMode ? <HiOutlineSun size={isMobile ? 18 : 22} /> : <HiOutlineMoon size={isMobile ? 18 : 22} />}
          </button>

          <button 
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center space-x-2 p-2 rounded-xl hover:bg-white/50 transition-colors"
          >
            <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white"
                 style={{ background: 'linear-gradient(135deg, #1b5f56, #247d70)' }}>
              <span className="font-medium text-sm">
                {currentStudent?.studentName?.charAt(0) || 'S'}
              </span>
            </div>
            {!isMobile && (
              <div className="text-left hidden lg:block">
                <p className="text-sm font-medium" style={{ color: '#0d312c' }}>
                  {currentStudent?.studentName || 'Student'}
                </p>
                <p className="text-xs" style={{ color: '#66c3b7' }}>
                  {currentStudent?.studentId || 'AUY Student'}
                </p>
              </div>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
