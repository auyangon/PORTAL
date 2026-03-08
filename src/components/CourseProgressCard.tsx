interface CourseData {
  courseCode?: string;
  courseName?: string;
  teacher?: string;
  googleClassroomLink?: string;
  grade?: string;
  attendance?: number;
  present?: number;
  totalClasses?: number;
}

interface CourseProgressCardProps {
  courses: CourseData[];
  darkMode: boolean;
}

export default function CourseProgressCard({ courses, darkMode }: CourseProgressCardProps) {
  const getGradeColor = (grade?: string) => {
    switch (grade) {
      case 'A': return 'text-green-500';
      case 'B': return 'text-blue-500';
      case 'C': return 'text-yellow-500';
      case 'D': return 'text-orange-500';
      default: return 'text-gray-500';
    }
  };

  const getProgressPercentage = (courseCode?: string) => {
    const progressMap: { [key: string]: number } = {
      'BUS101': 75,
      'ENG101': 80,
      'HUM11': 70,
      'IT101': 85,
      'MATH101': 60,
      'STAT100': 65
    };
    return courseCode ? (progressMap[courseCode] || 70) : 70;
  };

  return (
    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:transform hover:-translate-y-1`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            My Courses
          </h3>
          <p className="text-sm text-gray-500 mt-1">Spring 2026 • {courses.length} Courses</p>
        </div>
        <span className="text-3xl">📚</span>
      </div>

      <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
        {courses.map((course, index) => {
          const progress = getProgressPercentage(course.courseCode);
          
          return (
            <div
              key={index}
              className={`p-4 rounded-2xl ${darkMode ? 'bg-gray-700 hover:bg-gray-650' : 'bg-gray-50 hover:bg-gray-100'} transition-all duration-200`}
            >
              {/* Course Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className={`text-sm font-bold ${darkMode ? 'text-[#c5a572]' : 'text-[#1e3c2c]'}`}>
                      {course.courseCode}
                    </span>
                    <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${getGradeColor(course.grade)} bg-opacity-10`}>
                      Grade: {course.grade}
                    </span>
                  </div>
                  <p className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {course.courseName}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">👨‍🏫 {course.teacher}</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-3">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-gray-500">Course Progress</span>
                  <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{progress}%</span>
                </div>
                <div className={`h-2 ${darkMode ? 'bg-gray-600' : 'bg-gray-200'} rounded-full overflow-hidden`}>
                  <div
                    className="h-full bg-gradient-to-r from-[#1e3c2c] to-[#c5a572] transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Attendance Info */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500">📊 Attendance:</span>
                  <span className={`text-xs font-bold ${
                    (course.attendance || 0) >= 90 ? 'text-green-500' : 
                    (course.attendance || 0) >= 75 ? 'text-yellow-500' : 
                    'text-red-500'
                  }`}>
                    {course.attendance?.toFixed(1)}%
                  </span>
                </div>
                <span className="text-xs text-gray-500">
                  {course.present}/{course.totalClasses} classes
                </span>
              </div>

              {/* Action Button */}
              <button
                onClick={() => window.open(course.googleClassroomLink, '_blank')}
                className="w-full py-2 px-4 bg-gradient-to-r from-[#1e3c2c] to-[#2d5a42] hover:from-[#2d5a42] hover:to-[#1e3c2c] text-white rounded-xl text-sm font-medium transition-all shadow-md hover:shadow-lg transform hover:scale-105"
              >
                🔗 Open Google Classroom
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
