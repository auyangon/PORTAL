import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { GoogleOAuthProvider } from '@react-oauth/google';

import { StudentProvider, useStudent } from './context/StudentContext';
import { Login } from './components/Login';
import Sidebar from './components/Layout/Sidebar';
import { Topbar } from './components/Layout/Topbar';
import { Dashboard } from './components/Dashboard/Dashboard';
import { Courses } from './components/Courses/Courses';
import { Quests } from './components/Quests/Quests';
import { Materials } from './components/Materials/Materials';
import { Schedule } from './components/Schedule/Schedule';
import { Attendance } from './components/Attendance/Attendance';
import { Announcements } from './components/Announcements/Announcements';
import { Requests } from './components/Requests/Requests';

import { LoadingSpinner } from './components/UI/LoadingSpinner';
import { pageVariants } from './utils/animations';
import type { NavigationPage } from './types';

const GOOGLE_CLIENT_ID = '316467644383-78ueu8svimuqvshpplpeg0vs3d5ro49r.apps.googleusercontent.com';

const PAGE_TITLES: Record<NavigationPage, string> = {
  dashboard: 'Dashboard',
  courses: 'My Courses',
  quests: 'Quests',
  materials: 'Materials',
  schedule: 'Schedule',
  attendance: 'Attendance',
  announcements: 'Announcements',
  requests: 'Requests',
  
};

function AppContent() {
  const [currentPage, setCurrentPage] = useState<NavigationPage>('dashboard');
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { currentStudent, isLoading } = useStudent();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setSidebarOpen(false);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!currentStudent) {
    return <Login />;
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <Dashboard />;
      case 'courses': return <Courses />;
      case 'quests': return <Quests />;
      case 'materials': return <Materials />;
      case 'schedule': return <Schedule />;
      case 'attendance': return <Attendance />;
      case 'announcements': return <Announcements />;
      case 'requests': return <Requests />;
      
      default: return <Dashboard />;
    }
  };

  const sidebarClass = isMobile 
    ? 'fixed inset-0 z-40 transition-transform duration-300 ' + (sidebarOpen ? 'translate-x-0' : '-translate-x-full')
    : '';

  const overlayClass = isMobile && sidebarOpen ? 'fixed inset-0 bg-black bg-opacity-50 z-30' : '';
  const mainMargin = isMobile ? 'pt-16' : 'ml-72';
  const mainPadding = isMobile ? 'px-4 pb-8 pt-4' : 'pt-20 px-8 pb-8';

  return (
    <div className="min-h-screen">
      {isMobile && (
        <div className="fixed top-0 left-0 right-0 z-50 glass px-4 py-3 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-xl" style={{ background: 'rgba(45, 154, 138, 0.1)' }}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#1b5f56' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={sidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
          <h1 className="text-lg font-semibold text-seafoam-900">{PAGE_TITLES[currentPage]}</h1>
          <div className="w-10" />
        </div>
      )}

      {sidebarClass && (
        <div className={sidebarClass}>
          <Sidebar activeTab={currentPage} setActiveTab={(tab) => setCurrentPage(tab as NavigationPage)} isMobile={isMobile} onClose={() => setSidebarOpen(false)} />
        </div>
      )}

      {overlayClass && <div className={overlayClass} onClick={() => setSidebarOpen(false)} />}
      
      <div className={mainMargin}>
        <main className={mainPadding}>
          <AnimatePresence mode="wait">
            <motion.div key={currentPage} variants={pageVariants} initial="hidden" animate="visible" exit="exit" className="w-full">
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <Toaster position="bottom-right" toastOptions={{ style: { background: 'linear-gradient(135deg, #0d312c 0%, #1b5f56 100%)', color: '#fff', borderRadius: '16px', padding: '16px', fontFamily: 'Poppins, sans-serif' } }} />
    </div>
  );
}

export default function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <StudentProvider>
        <AppContent />
      </StudentProvider>
    </GoogleOAuthProvider>
  );
}

