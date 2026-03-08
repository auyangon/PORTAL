import { AttendanceSummary } from '../data/database';

interface AttendanceSummaryCardProps {
  studentId: string;
  attendanceData: AttendanceSummary[];
  darkMode: boolean;
}

export default function AttendanceSummaryCard({ attendanceData, darkMode }: AttendanceSummaryCardProps) {
  // Calculate overall percentages
  const totalClasses = attendanceData.reduce((sum, a) => sum + a.totalClasses, 0);
  const totalPresent = attendanceData.reduce((sum, a) => sum + a.present, 0);
  const totalLate = attendanceData.reduce((sum, a) => sum + a.late, 0);
  const totalAbsent = attendanceData.reduce((sum, a) => sum + a.absent, 0);

  const presentPercent = totalClasses > 0 ? (totalPresent / totalClasses * 100) : 0;
  const latePercent = totalClasses > 0 ? (totalLate / totalClasses * 100) : 0;
  const absentPercent = totalClasses > 0 ? (totalAbsent / totalClasses * 100) : 0;

  return (
    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:transform hover:-translate-y-1`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Attendance Summary
          </h3>
          <p className="text-sm text-gray-500 mt-1">Overall Performance</p>
        </div>
        <span className="text-3xl">📊</span>
      </div>

      {/* Donut Chart Representation */}
      <div className="flex items-center justify-center mb-8">
        <div className="relative w-48 h-48">
          <svg className="transform -rotate-90" viewBox="0 0 200 200">
            {/* Present - Green */}
            <circle
              cx="100"
              cy="100"
              r="80"
              fill="none"
              stroke="#10b981"
              strokeWidth="30"
              strokeDasharray={`${presentPercent * 5.03} 502.65`}
              className="transition-all duration-1000"
            />
            {/* Late - Yellow */}
            <circle
              cx="100"
              cy="100"
              r="80"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="30"
              strokeDasharray={`${latePercent * 5.03} 502.65`}
              strokeDashoffset={-presentPercent * 5.03}
              className="transition-all duration-1000"
            />
            {/* Absent - Red */}
            <circle
              cx="100"
              cy="100"
              r="80"
              fill="none"
              stroke="#ef4444"
              strokeWidth="30"
              strokeDasharray={`${absentPercent * 5.03} 502.65`}
              strokeDashoffset={-(presentPercent + latePercent) * 5.03}
              className="transition-all duration-1000"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {presentPercent.toFixed(0)}%
            </span>
            <span className="text-xs text-gray-500">Present</span>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className={`p-3 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-green-50'}`}>
          <div className="flex items-center space-x-2 mb-1">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-xs text-gray-500">Present</span>
          </div>
          <p className={`text-lg font-bold text-green-500`}>
            {presentPercent.toFixed(1)}%
          </p>
        </div>

        <div className={`p-3 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-yellow-50'}`}>
          <div className="flex items-center space-x-2 mb-1">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="text-xs text-gray-500">Late</span>
          </div>
          <p className={`text-lg font-bold text-yellow-500`}>
            {latePercent.toFixed(1)}%
          </p>
        </div>

        <div className={`p-3 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-red-50'}`}>
          <div className="flex items-center space-x-2 mb-1">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-xs text-gray-500">Absent</span>
          </div>
          <p className={`text-lg font-bold text-red-500`}>
            {absentPercent.toFixed(1)}%
          </p>
        </div>
      </div>

      {/* Course-wise Breakdown */}
      <div className="space-y-3">
        <h4 className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-3`}>
          Course-wise Attendance
        </h4>
        {attendanceData.map((course, index) => (
          <div key={index} className={`p-3 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className="flex items-center justify-between mb-2">
              <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {course.courseCode}
              </span>
              <span className={`text-sm font-bold ${
                course.attendancePercentage >= 90 ? 'text-green-500' :
                course.attendancePercentage >= 75 ? 'text-yellow-500' :
                'text-red-500'
              }`}>
                {course.attendancePercentage.toFixed(1)}%
              </span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <span>✅ {course.present}</span>
              <span>⏰ {course.late}</span>
              <span>❌ {course.absent}</span>
              <span className="ml-auto">Total: {course.totalClasses}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
