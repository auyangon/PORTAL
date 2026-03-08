import { Student } from '../data/database';

interface HeaderProps {
  currentStudent: Student;
  currentTime: Date;
  onStudentChange: (studentId: string) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  allStudents: Student[];
}

export default function Header({ 
  currentStudent, 
  currentTime, 
  onStudentChange, 
  darkMode,
  onToggleDarkMode,
  allStudents 
}: HeaderProps) {
  const formatDate = (date: Date) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()} • ${
      String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
  };

  const initials = currentStudent.studentName
    .split(' ')
    .map(n => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  return (
    <header className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b sticky top-0 z-40 backdrop-blur-lg bg-opacity-90`}>
      <div className="px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          {/* Welcome Section */}
          <div>
            <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Welcome back, {currentStudent.studentName.split(' ')[0]} 👋
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {currentStudent.major} • Year 1 • {currentStudent.studyMode}
            </p>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Live Date/Time */}
            <div className={`hidden md:flex items-center space-x-2 px-4 py-2 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <span className="text-xl">🕐</span>
              <span className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                {formatDate(currentTime)}
              </span>
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={onToggleDarkMode}
              className={`p-3 rounded-xl transition-all ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}
            >
              <span className="text-xl">{darkMode ? '☀️' : '🌙'}</span>
            </button>

            {/* Profile Avatar */}
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-[#c5a572] to-[#d4b583] rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
                {initials}
              </div>
            </div>

            {/* Logout Button */}
            <button className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium transition-all shadow-lg hover:shadow-xl transform hover:scale-105">
              Logout
            </button>
          </div>
        </div>

        {/* Search Bar & Student Selector */}
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <div className="flex-1 max-w-md">
            <div className={`flex items-center space-x-3 px-4 py-3 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <span className="text-xl">🔍</span>
              <input
                type="text"
                placeholder="Search courses, announcements..."
                className={`flex-1 bg-transparent outline-none text-sm ${darkMode ? 'text-white placeholder-gray-400' : 'text-gray-900 placeholder-gray-500'}`}
              />
            </div>
          </div>

          {/* Student Selector */}
          <div className="flex items-center space-x-3">
            <label className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Switch Student:
            </label>
            <select
              value={currentStudent.studentId}
              onChange={(e) => onStudentChange(e.target.value)}
              className={`px-4 py-3 rounded-xl font-medium cursor-pointer transition-all ${
                darkMode 
                  ? 'bg-gray-700 text-white border-gray-600 hover:bg-gray-600' 
                  : 'bg-white text-gray-900 border-gray-300 hover:bg-gray-50'
              } border focus:outline-none focus:ring-2 focus:ring-[#c5a572]`}
            >
              {allStudents.map(student => (
                <option key={student.studentId} value={student.studentId}>
                  {student.studentId} - {student.studentName}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </header>
  );
}
