import { Student } from '../data/database';

interface ProfileCardProps {
  student: Student;
  gpa: number;
  courseCount: number;
  darkMode: boolean;
}

export default function ProfileCard({ student, gpa, courseCount, darkMode }: ProfileCardProps) {
  const initials = student.studentName
    .split(' ')
    .map(n => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  return (
    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:transform hover:-translate-y-1`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Student Profile
        </h3>
        <span className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
          {student.status}
        </span>
      </div>

      <div className="flex items-start space-x-6">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="w-24 h-24 bg-gradient-to-br from-[#c5a572] to-[#d4b583] rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-lg">
            {initials}
          </div>
        </div>

        {/* Student Details */}
        <div className="flex-1 space-y-3">
          <div>
            <p className="text-xs text-gray-500 mb-1">Student ID</p>
            <p className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {student.studentId}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-500 mb-1">Full Name</p>
            <p className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {student.studentName}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-500 mb-1">Email Address</p>
            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {student.email}
            </p>
          </div>
        </div>
      </div>

      {/* Additional Info Grid */}
      <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
          <p className="text-xs text-gray-500 mb-1">Major Program</p>
          <p className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {student.major}
          </p>
        </div>

        <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
          <p className="text-xs text-gray-500 mb-1">Study Mode</p>
          <p className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {student.studyMode}
          </p>
        </div>

        <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
          <p className="text-xs text-gray-500 mb-1">GPA</p>
          <p className={`text-2xl font-bold ${gpa >= 3.5 ? 'text-green-500' : gpa >= 2.5 ? 'text-yellow-500' : 'text-red-500'}`}>
            {gpa.toFixed(2)}
          </p>
        </div>

        <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
          <p className="text-xs text-gray-500 mb-1">Enrolled Courses</p>
          <p className={`text-2xl font-bold text-[#c5a572]`}>
            {courseCount}
          </p>
        </div>
      </div>

      {/* QR Code Placeholder */}
      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500 mb-1">Student ID Card</p>
            <p className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Scan for verification
            </p>
          </div>
          <div className={`w-16 h-16 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-xl flex items-center justify-center`}>
            <span className="text-3xl">📱</span>
          </div>
        </div>
      </div>
    </div>
  );
}
