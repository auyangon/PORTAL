interface DeadlinesCardProps {
  darkMode: boolean;
}

export default function DeadlinesCard({ darkMode }: DeadlinesCardProps) {
  const deadlines = [
    {
      title: 'BUS101 Assignment',
      course: 'BUS101',
      date: '2026-03-15',
      daysLeft: 5,
      urgent: true,
      icon: '📝'
    },
    {
      title: 'ENG101 Essay',
      course: 'ENG101',
      date: '2026-03-18',
      daysLeft: 8,
      urgent: false,
      icon: '✍️'
    },
    {
      title: 'Final Exam Period',
      course: 'All Courses',
      date: '2026-04-15',
      daysLeft: 38,
      urgent: false,
      icon: '🎓'
    },
    {
      title: 'Thingyan Break',
      course: 'Holiday',
      date: '2026-03-30',
      daysLeft: 22,
      urgent: false,
      icon: '🎉'
    },
    {
      title: 'STAT100 Quiz',
      course: 'STAT100',
      date: '2026-03-25',
      daysLeft: 17,
      urgent: false,
      icon: '📊'
    },
    {
      title: 'Course Registration',
      course: 'Academic',
      date: '2026-04-10',
      daysLeft: 33,
      urgent: false,
      icon: '📋'
    }
  ];

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  };

  const getUrgencyColor = (daysLeft: number) => {
    if (daysLeft <= 7) return 'bg-red-500';
    if (daysLeft <= 14) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:transform hover:-translate-y-1`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Upcoming Deadlines
          </h3>
          <p className="text-sm text-gray-500 mt-1">{deadlines.length} upcoming events</p>
        </div>
        <span className="text-3xl">⏰</span>
      </div>

      <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
        {deadlines.map((deadline, index) => (
          <div
            key={index}
            className={`p-4 rounded-2xl ${
              darkMode 
                ? 'bg-gray-700 hover:bg-gray-650' 
                : deadline.urgent 
                  ? 'bg-red-50 hover:bg-red-100' 
                  : 'bg-gray-50 hover:bg-gray-100'
            } transition-all duration-200 cursor-pointer`}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3 flex-1">
                <span className="text-2xl">{deadline.icon}</span>
                <div className="flex-1">
                  <p className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {deadline.title}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    📚 {deadline.course}
                  </p>
                </div>
              </div>
              {deadline.urgent && (
                <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-full animate-pulse">
                  URGENT
                </span>
              )}
            </div>

            {/* Date Info */}
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">
                📅 {formatDate(deadline.date)}
              </span>
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${getUrgencyColor(deadline.daysLeft)}`}></div>
                <span className={`text-xs font-bold ${
                  deadline.daysLeft <= 7 ? 'text-red-500' :
                  deadline.daysLeft <= 14 ? 'text-yellow-500' :
                  'text-green-500'
                }`}>
                  {deadline.daysLeft} days left
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className={`mt-3 h-1.5 ${darkMode ? 'bg-gray-600' : 'bg-gray-200'} rounded-full overflow-hidden`}>
              <div
                className={`h-full transition-all duration-500 ${
                  deadline.daysLeft <= 7 ? 'bg-red-500' :
                  deadline.daysLeft <= 14 ? 'bg-yellow-500' :
                  'bg-green-500'
                }`}
                style={{ width: `${Math.max(10, 100 - deadline.daysLeft * 2)}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Add to Calendar Button */}
      <button className={`w-full mt-4 py-3 rounded-xl font-medium transition-all ${
        darkMode 
          ? 'bg-gradient-to-r from-[#1e3c2c] to-[#2d5a42] hover:from-[#2d5a42] hover:to-[#1e3c2c] text-white' 
          : 'bg-gradient-to-r from-[#1e3c2c] to-[#2d5a42] hover:from-[#2d5a42] hover:to-[#1e3c2c] text-white'
      } shadow-lg hover:shadow-xl transform hover:scale-105`}>
        📅 Add to Calendar
      </button>
    </div>
  );
}
