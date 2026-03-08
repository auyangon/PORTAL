// src/App.tsx
import { useState, useEffect } from 'react';
import { useRealtimeSheet } from './hooks/useRealtimeSheet';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ProfileCard from './components/ProfileCard';
import CourseProgressCard from './components/CourseProgressCard';
import AttendanceSummaryCard from './components/AttendanceSummaryCard';
import AnnouncementsCard from './components/AnnouncementsCard';
import DeadlinesCard from './components/DeadlinesCard';
import QuickStatsCard from './components/QuickStatsCard';
import SyncStatus from './components/SyncStatus';

function App() {
  const { data, loading, error, markAsRead, refresh } = useRealtimeSheet();
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activePage, setActivePage] = useState('dashboard');

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Check system dark mode preference
  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setDarkMode(darkModeMediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setDarkMode(e.matches);
    darkModeMediaQuery.addEventListener('change', handler);
    return () => darkModeMediaQuery.removeEventListener('change', handler);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1e3c2c] to-[#2d5a42]">
        <div className="text-center">
          <div className="w-24 h-24 border-4 border-[#c5a572] border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <h2 className="text-2xl font-bold text-white mb-2">Loading AUY Portal</h2>
          <p className="text-[#c5a572]">Connecting to Google Sheets...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1e3c2c] to-[#2d5a42]">
        <div className="bg-white rounded-3xl p-8 max-w-md text-center">
          <span className="text-6xl mb-4 block">🔒</span>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Authentication Required</h2>
          <p className="text-gray-600 mb-6">
            {error || 'Please login with your student Gmail account to access the portal.'}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-8 py-4 bg-gradient-to-r from-[#1e3c2c] to-[#2d5a42] text-white rounded-xl font-bold hover:shadow-xl transform hover:scale-105 transition-all"
          >
            Sign in with Google
          </button>
          <p className="text-sm text-gray-500 mt-4">
            Test account: chanmyae.au.edu.mm@gmail.com
          </p>
        </div>
      </div>
    );
  }

  const { student, courses, enrollments, attendance, notifications, announcements, isAdmin } = data;

  // Calculate derived data
  const gpa = enrollments.reduce((sum, e) => {
    const gradePoints: { [key: string]: number } = { 'A': 4, 'B': 3, 'C': 2, 'D': 1, 'F': 0 };
    return sum + (gradePoints[e.grade] || 0);
  }, 0) / (enrollments.length || 1);

  const attendanceRate = attendance.length > 0
    ? attendance.reduce((sum, a) => sum + (a.attendancePercentage || 0), 0) / attendance.length
    : 0;
  
  const unreadCount = notifications.filter(n => !n.read).length;

  const handleStudentChange = (studentId: string) => {
    // This would require admin privileges to switch students
    if (isAdmin) {
      alert('Admin student switching coming soon!');
    } else {
      alert('You can only view your own data');
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
      <Sidebar 
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        currentStudent={student}
        unreadCount={unreadCount}
        courseCount={enrollments.length}
        darkMode={darkMode}
        activePage={activePage}
        onPageChange={setActivePage}
      />
      
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <Header 
          currentStudent={student}
          currentTime={currentTime}
          onStudentChange={handleStudentChange}
          darkMode={darkMode}
          onToggleDarkMode={() => setDarkMode(!darkMode)}
          allStudents={[student]} // Only show current student for now
        />
        
        <main className="p-6 max-w-[1600px] mx-auto">
          {/* Admin Sync Status Banner */}
          {isAdmin && (
            <SyncStatus 
              darkMode={darkMode} 
              onSync={refresh}
            />
          )}
          
          {/* Page Content */}
          {activePage === 'dashboard' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              <ProfileCard 
                student={student}
                gpa={gpa}
                courseCount={enrollments.length}
                darkMode={darkMode}
              />
              
              <CourseProgressCard 
                enrollments={enrollments}
                courses={courses}
                attendance={attendance}
                darkMode={darkMode}
              />
              
              <AttendanceSummaryCard 
                attendanceData={attendance}
                darkMode={darkMode}
              />
              
              <AnnouncementsCard 
                announcements={announcements}
                notifications={notifications}
                studentId={student.studentId}
                darkMode={darkMode}
                onMarkAsRead={markAsRead}
              />
              
              <DeadlinesCard 
                darkMode={darkMode}
                enrollments={enrollments}
              />
              
              <QuickStatsCard 
                gpa={gpa}
                attendanceRate={attendanceRate}
                courseCount={enrollments.length}
                unreadCount={unreadCount}
                darkMode={darkMode}
                enrollments={enrollments}
              />
            </div>
          )}

          {activePage === 'courses' && (
            <div className="mt-6">
              <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>My Courses</h2>
              <CourseProgressCard 
                enrollments={enrollments}
                courses={courses}
                attendance={attendance}
                darkMode={darkMode}
              />
            </div>
          )}

          {activePage === 'analytics' && (
            <div className="mt-6">
              <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>📊 Analytics</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <AttendanceSummaryCard 
                  attendanceData={attendance}
                  darkMode={darkMode}
                />
                <QuickStatsCard 
                  gpa={gpa}
                  attendanceRate={attendanceRate}
                  courseCount={enrollments.length}
                  unreadCount={unreadCount}
                  darkMode={darkMode}
                  enrollments={enrollments}
                />
              </div>
            </div>
          )}

          {activePage === 'settings' && (
            <div className="mt-6">
              <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg p-8`}>
                <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>⚙️ Settings</h2>
                <div className="space-y-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Theme
                    </label>
                    <button
                      onClick={() => setDarkMode(!darkMode)}
                      className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900'}`}
                    >
                      {darkMode ? '🌙 Dark Mode' : '☀️ Light Mode'}
                    </button>
                  </div>
                  {isAdmin && (
                    <div className="mt-4 p-4 bg-yellow-100 rounded-xl">
                      <p className="text-yellow-800 font-bold">👑 Admin Mode</p>
                      <p className="text-sm text-yellow-700">You have full access to edit data</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;