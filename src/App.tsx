import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';

import { StudentProvider, useStudent } from './context/StudentContext';
import { Login } from './components/Login';
import Sidebar from './components/Layout/Sidebar';

import { Dashboard } from './components/Dashboard/Dashboard';
import { Courses } from './components/Courses/Courses';
import { Quests } from './components/Quests/Quests';
import { Materials } from './components/Materials/Materials';
import { Schedule } from './components/Schedule/Schedule';
import { Attendance } from './components/Attendance/Attendance';
import { Announcements } from './components/Announcements/Announcements';
import { Requests } from './components/Requests/Requests';
import { Library } from './components/Library/Library';
import { LoadingScreen } from './components/UI/LoadingScreen';
import { LoadingSpinner } from './components/UI/LoadingSpinner';
import { pageVariants } from './utils/animations';
import type { NavigationPage } from './types';

const PAGE_TITLES: Record<NavigationPage, string> = {
  dashboard: 'Dashboard',
  courses: 'My Courses',
  quests: 'Quests',
  materials: 'Materials',
  schedule: 'Schedule',
  attendance: 'Attendance',
  announcements: 'Announcements',
  requests: 'Requests',
  library: 'Library',
};

function AppContent() {
  const [currentPage, setCurrentPage] = useState<NavigationPage>('dashboard');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { currentStudent, isLoading } = useStudent();
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setSidebarOpen(false);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [currentPage, isMobile]);

  useEffect(() => {
    if (isMobile && sidebarOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [isMobile, sidebarOpen]);

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => setShowLoading(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (!currentStudent) {
    return <Login />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'courses':
        return <Courses />;
      case 'quests':
        return <Quests />;
      case 'materials':
        return <Materials />;
      case 'schedule':
        return <Schedule />;
      case 'attendance':
        return <Attendance />;
      case 'announcements':
        return <Announcements />;
      case 'requests':
        return <Requests />;
      case 'library':
        return <Library />;
      default:
        return <Dashboard />;
    }
  };

  if (showLoading || isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-seafoam-50 to-white">
      {/* Mobile Header */}
      {isMobile && (
        <div className="fixed top-0 left-0 right-0 z-50 glass px-4 py-3 flex items-center justify-between safe-top">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-xl transition-colors"
            style={{ background: 'rgba(45, 154, 138, 0.1)' }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#1b5f56' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d={sidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
          <h1 className="text-lg font-semibold" style={{ color: '#0d312c' }}>{PAGE_TITLES[currentPage]}</h1>
          <div className="w-10" />
        </div>
      )}

      {/* Sidebar */}
      <div className={isMobile ? 'fixed inset-0 z-40 transition-transform duration-300 ' + (sidebarOpen ? 'translate-x-0' : '-translate-x-full') : ''}>
        <Sidebar 
          activeTab={currentPage} 
          setActiveTab={(tab) => setCurrentPage(tab as NavigationPage)}
          isMobile={isMobile}
          onClose={() => setSidebarOpen(false)}
        />
      </div>

      {/* Overlay */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Main Content */}
      <div className={isMobile ? 'pt-4' : 'ml-72'}>
        <Topbar 
          title={PAGE_TITLES[currentPage]} 
          isMobile={isMobile}
          onMenuClick={() => setSidebarOpen(true)}
        />
        
        <main className={isMobile ? 'px-4 pb-8 pt-4' : 'pt-8 px-8 pb-8'}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              variants={pageVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-full"
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: 'linear-gradient(135deg, #0d312c 0%, #1b5f56 100%)',
            color: '#fff',
            borderRadius: '16px',
            padding: '16px',
            fontFamily: 'Poppins, sans-serif',
          },
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <StudentProvider>
      <AppContent />
    </StudentProvider>
  );
}






