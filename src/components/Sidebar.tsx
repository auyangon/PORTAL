import { Student } from '../data/database';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  currentStudent: Student;
  unreadCount: number;
  courseCount: number;
  darkMode: boolean;
  activePage: string;
  onPageChange: (page: string) => void;
}

export default function Sidebar({ 
  isOpen, 
  currentStudent, 
  unreadCount, 
  courseCount, 
  darkMode, 
  activePage, 
  onPageChange 
}: SidebarProps) {
  const menuItems = [
    { icon: '🏠', label: 'Dashboard', id: 'dashboard', badge: null },
    { icon: '📚', label: 'My Courses', id: 'courses', badge: courseCount },
    { icon: '📅', label: 'Calendar', id: 'calendar', badge: null },
    { icon: '💬', label: 'Messages', id: 'messages', badge: 3 },
    { icon: '📝', label: 'Assignments', id: 'assignments', badge: null },
    { icon: '📊', label: 'Analytics', id: 'analytics', badge: null },
    { icon: '⚙️', label: 'Settings', id: 'settings', badge: null },
  ];

  const initials = currentStudent.studentName
    .split(' ')
    .map(n => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  if (!isOpen) return null;

  return (
    <aside className={`fixed left-0 top-0 h-screen w-64 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl z-50 transition-all duration-300`}>
      {/* Logo Section */}
      <div className={`p-6 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-[#1e3c2c] to-[#2d5a42] rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-2xl font-bold text-[#c5a572]">A</span>
          </div>
          <div>
            <h1 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>AUY Portal</h1>
            <p className="text-xs text-[#c5a572]">Assumption University</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onPageChange(item.id)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 hover:scale-105 ${
              activePage === item.id
                ? 'bg-[#1e3c2c] text-white shadow-lg'
                : `${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`
            }`}
          >
            <div className="flex items-center space-x-3">
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium text-sm">{item.label}</span>
            </div>
            {item.badge && (
              <span className={`${activePage === item.id ? 'bg-[#c5a572]' : 'bg-red-500'} text-white text-xs px-2 py-1 rounded-full font-bold min-w-[24px] text-center`}>
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* Notification Badge */}
      {unreadCount > 0 && (
        <div className="px-4 mt-4">
          <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white p-3 rounded-xl shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Unread Notifications</span>
              <span className="bg-white text-red-500 text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                {unreadCount}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* User Profile Section */}
      <div className={`absolute bottom-0 left-0 right-0 p-4 border-t ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-[#c5a572] to-[#d4b583] rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className={`text-sm font-semibold truncate ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {currentStudent.studentName}
            </p>
            <p className="text-xs text-gray-500 truncate">{currentStudent.studentId}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
