interface QuickStatsCardProps {
  gpa: number;
  attendanceRate: number;
  courseCount: number;
  unreadCount: number;
  darkMode: boolean;
}

export default function QuickStatsCard({ gpa, attendanceRate, courseCount, unreadCount, darkMode }: QuickStatsCardProps) {
  const stats = [
    {
      icon: '📊',
      label: 'GPA',
      value: gpa.toFixed(2),
      color: gpa >= 3.5 ? 'text-green-500' : gpa >= 2.5 ? 'text-yellow-500' : 'text-red-500',
      bgColor: gpa >= 3.5 ? 'bg-green-50' : gpa >= 2.5 ? 'bg-yellow-50' : 'bg-red-50',
      darkBg: 'bg-gray-700'
    },
    {
      icon: '📈',
      label: 'Attendance Rate',
      value: `${attendanceRate.toFixed(1)}%`,
      color: attendanceRate >= 90 ? 'text-green-500' : attendanceRate >= 75 ? 'text-yellow-500' : 'text-red-500',
      bgColor: attendanceRate >= 90 ? 'bg-green-50' : attendanceRate >= 75 ? 'bg-yellow-50' : 'bg-red-50',
      darkBg: 'bg-gray-700'
    },
    {
      icon: '✅',
      label: 'Completed Courses',
      value: '0/6',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
      darkBg: 'bg-gray-700'
    },
    {
      icon: '📚',
      label: 'Credits Enrolled',
      value: '18',
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
      darkBg: 'bg-gray-700'
    },
    {
      icon: '🏆',
      label: 'Active Courses',
      value: courseCount.toString(),
      color: 'text-[#c5a572]',
      bgColor: 'bg-orange-50',
      darkBg: 'bg-gray-700'
    },
    {
      icon: '📅',
      label: 'Days Until Finals',
      value: '38',
      color: 'text-red-500',
      bgColor: 'bg-red-50',
      darkBg: 'bg-gray-700'
    },
    {
      icon: '📖',
      label: 'Unread Announcements',
      value: unreadCount.toString(),
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
      darkBg: 'bg-gray-700'
    }
  ];

  return (
    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:transform hover:-translate-y-1`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Quick Statistics
          </h3>
          <p className="text-sm text-gray-500 mt-1">Your academic overview</p>
        </div>
        <span className="text-3xl">📈</span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`p-4 rounded-2xl ${darkMode ? stat.darkBg : stat.bgColor} transition-all duration-200 hover:transform hover:scale-105 cursor-pointer`}
          >
            <div className="flex items-center space-x-3 mb-2">
              <span className="text-2xl">{stat.icon}</span>
              <p className="text-xs text-gray-500 font-medium">
                {stat.label}
              </p>
            </div>
            <p className={`text-2xl font-bold ${stat.color}`}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Progress Summary */}
      <div className={`mt-6 p-4 rounded-2xl ${darkMode ? 'bg-gray-700' : 'bg-gradient-to-r from-[#1e3c2c] to-[#2d5a42]'}`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white text-xs font-medium mb-1">Semester Progress</p>
            <p className="text-white text-2xl font-bold">Week 8 of 16</p>
          </div>
          <div className="text-right">
            <p className="text-white text-xs font-medium mb-1">Overall Performance</p>
            <p className="text-[#c5a572] text-2xl font-bold">Excellent</p>
          </div>
        </div>
        <div className="mt-4 h-2 bg-white bg-opacity-20 rounded-full overflow-hidden">
          <div className="h-full bg-[#c5a572] rounded-full transition-all duration-1000" style={{ width: '50%' }}></div>
        </div>
      </div>
    </div>
  );
}
