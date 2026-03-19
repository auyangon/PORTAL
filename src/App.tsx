import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';


import { StudentProvider, useStudent } from './context/StudentContext';
import { Login } from './components/Login';  // This is now Google Login
import Sidebar from './components/Layout/Sidebar';
import { Topbar } from './components/Layout/Topbar';
import { Dashboard } from './components/Dashboard/Dashboard';
import { Courses } from './components/Courses/Courses';
import { Quests } from './components/Quests/Quests';
import { Materials } from './components/Materials/Materials';
import { Schedule } from './components/Schedule/Schedule';
import { Announcements } from './components/Announcements/Announcements';
import { Requests } from './components/Requests/Requests';
import { LoadingScreen } from './components/UI/LoadingScreen';
import { pageVariants } from './utils/animations';
import type { NavigationPage } from './types';



const PAGE_TITLES: Record<NavigationPage, string> = {
  dashboard: 'Dashboard',
  courses: 'My Courses',
  quests: 'Quests',
  materials: 'Materials',
  schedule: 'Schedule',
  announcements: 'Announcements',
  requests: 'Requests',
};

function AppContent() {
  const [currentPage, setCurrentPage] = useState<NavigationPage>('dashboard');
  const { currentStudent, isLoading } = useStudent();
  const [showLoading, setShowLoading] = useState(true);

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
      case 'announcements':
        return <Announcements />;
      case 'requests':
        return <Requests />;
      default:
        return <Dashboard />;
    }
  };

  if (showLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen">
      <Sidebar activeTab={currentPage} setActiveTab={(tab) => setCurrentPage(tab as NavigationPage)} />
      
      <div className="ml-72">
        <Topbar title={PAGE_TITLES[currentPage]} />
        
        <main className="pt-28 px-8 pb-8">
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

