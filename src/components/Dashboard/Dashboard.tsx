import { motion } from 'framer-motion';
import {
  HiOutlineAcademicCap,
  HiOutlineBookOpen,
  HiOutlineClipboardCheck,
  HiOutlineClipboardList,
  HiOutlineClock,
  HiOutlineChartBar,
  HiOutlineLightningBolt,
} from 'react-icons/hi';
import { useStudent } from '../../context/StudentContext';
import { 
  staggerContainer, 
  statCardVariants, 
  scheduleItemVariants, 
  questItemVariants,
  fadeInUp 
} from '../../utils/animations';

export function Dashboard() {
  const {
    currentStudent,
    enrollments,
    attendance,
    studentQuests,
    quests,
    getEnrolledCourses,
    getStudentSchedules,
    getCourseByCode,
  } = useStudent();

  // Calculate statistics from actual sheet data
  const enrolledCourses = getEnrolledCourses();
  const totalCredits = enrollments.reduce((sum, e) => sum + parseFloat(e.gpaPoints || '0'), 0);
  const avgGPA = enrollments.length > 0 ? (totalCredits / enrollments.length).toFixed(2) : '0.00';
  
  // Attendance calculation from Attendance sheet
  const presentCount = attendance.filter(a => a.status === 'Present').length;
  const totalAttendance = attendance.length;
  const attendanceRate = totalAttendance > 0 ? Math.round((presentCount / totalAttendance) * 100) : 0;

  // Pending quests from StudentQuests sheet
  const pendingQuests = studentQuests.filter(sq => sq.status === 'In Progress' || sq.status === 'Not Started');
  const completedQuests = studentQuests.filter(sq => sq.status === 'Completed');

  // Today's schedule
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  const todaySchedules = getStudentSchedules().filter(s => s.dayOfWeek === today);

  // Upcoming quests
  const upcomingQuests = quests
    .filter(q => {
      const studentQuest = studentQuests.find(sq => sq.questId === q.questId);
      return studentQuest && (studentQuest.status === 'In Progress' || studentQuest.status === 'Not Started');
    })
    .slice(0, 3);

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* GPA Card */}
        <motion.div
          variants={statCardVariants}
          whileHover="hover"
          className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl"
          style={{ border: '1px solid rgba(45, 154, 138, 0.1)' }}
        >
          <div className="flex items-start justify-between mb-4">
            <div 
              className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg"
              style={{ 
                background: 'linear-gradient(135deg, #1b5f56 0%, #2d9a8a 100%)',
                boxShadow: '0 8px 24px rgba(27, 95, 86, 0.3)',
              }}
            >
              <HiOutlineChartBar size={24} className="text-white" />
            </div>
            <span 
              className="text-xs font-medium px-3 py-1 rounded-full"
              style={{ background: 'rgba(45, 154, 138, 0.1)', color: '#1b5f56' }}
            >
              Current
            </span>
          </div>
          <p className="text-sm mb-1" style={{ color: '#247d70' }}>GPA</p>
          <p className="text-3xl font-bold" style={{ color: '#0d312c' }}>{currentStudent?.gpa || avgGPA}</p>
          <p className="text-xs mt-2" style={{ color: '#66c3b7' }}>Based on {enrollments.length} courses</p>
        </motion.div>

        {/* Courses Card */}
        <motion.div
          variants={statCardVariants}
          whileHover="hover"
          className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl"
          style={{ border: '1px solid rgba(45, 154, 138, 0.1)' }}
        >
          <div className="flex items-start justify-between mb-4">
            <div 
              className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg"
              style={{ 
                background: 'linear-gradient(135deg, #247d70 0%, #33af9f 100%)',
                boxShadow: '0 8px 24px rgba(36, 125, 112, 0.3)',
              }}
            >
              <HiOutlineBookOpen size={24} className="text-white" />
            </div>
            <span 
              className="text-xs font-medium px-3 py-1 rounded-full"
              style={{ background: 'rgba(45, 154, 138, 0.1)', color: '#1b5f56' }}
            >
              Active
            </span>
          </div>
          <p className="text-sm mb-1" style={{ color: '#247d70' }}>Enrolled Courses</p>
          <p className="text-3xl font-bold" style={{ color: '#0d312c' }}>{enrolledCourses.length}</p>
          <p className="text-xs mt-2" style={{ color: '#66c3b7' }}>
            {enrollments.reduce((sum, e) => sum + parseInt(getCourseByCode(e.courseCode)?.credits || '0'), 0)} total credits
          </p>
        </motion.div>

        {/* Attendance Card */}
        <motion.div
          variants={statCardVariants}
          whileHover="hover"
          className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl"
          style={{ border: '1px solid rgba(45, 154, 138, 0.1)' }}
        >
          <div className="flex items-start justify-between mb-4">
            <div 
              className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg"
              style={{ 
                background: 'linear-gradient(135deg, #12423c 0%, #1b5f56 100%)',
                boxShadow: '0 8px 24px rgba(18, 66, 60, 0.3)',
              }}
            >
              <HiOutlineClipboardCheck size={24} className="text-white" />
            </div>
            <span 
              className={`text-xs font-medium px-3 py-1 rounded-full`}
              style={{ 
                background: attendanceRate >= 80 ? 'rgba(45, 154, 138, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                color: attendanceRate >= 80 ? '#1b5f56' : '#d97706',
              }}
            >
              {attendanceRate >= 80 ? 'Good' : 'Needs Attention'}
            </span>
          </div>
          <p className="text-sm mb-1" style={{ color: '#247d70' }}>Attendance Rate</p>
          <p className="text-3xl font-bold" style={{ color: '#0d312c' }}>{attendanceRate}%</p>
          <p className="text-xs mt-2" style={{ color: '#66c3b7' }}>{presentCount} of {totalAttendance} classes</p>
        </motion.div>

        {/* Quests Card */}
        <motion.div
          variants={statCardVariants}
          whileHover="hover"
          className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl"
          style={{ border: '1px solid rgba(45, 154, 138, 0.1)' }}
        >
          <div className="flex items-start justify-between mb-4">
            <div 
              className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg"
              style={{ 
                background: 'linear-gradient(135deg, #0d312c 0%, #12423c 100%)',
                boxShadow: '0 8px 24px rgba(13, 49, 44, 0.3)',
              }}
            >
              <HiOutlineLightningBolt size={24} className="text-white" />
            </div>
            <span 
              className="text-xs font-medium px-3 py-1 rounded-full"
              style={{ background: 'rgba(45, 154, 138, 0.1)', color: '#1b5f56' }}
            >
              {pendingQuests.length} Pending
            </span>
          </div>
          <p className="text-sm mb-1" style={{ color: '#247d70' }}>Quests Completed</p>
          <p className="text-3xl font-bold" style={{ color: '#0d312c' }}>{completedQuests.length}</p>
          <p className="text-xs mt-2" style={{ color: '#66c3b7' }}>of {studentQuests.length} total quests</p>
        </motion.div>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Schedule */}
        <motion.div
          variants={fadeInUp}
          className="lg:col-span-2 bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl"
          style={{ border: '1px solid rgba(45, 154, 138, 0.1)' }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold" style={{ color: '#0d312c' }}>Today's Schedule</h3>
              <p className="text-sm" style={{ color: '#247d70' }}>{today}</p>
            </div>
            <HiOutlineClock size={24} style={{ color: '#66c3b7' }} />
          </div>

          {todaySchedules.length > 0 ? (
            <div className="space-y-4">
              {todaySchedules.map((schedule) => {
                const course = getCourseByCode(schedule.courseCode);
                return (
                  <motion.div
                    key={schedule.scheduleId}
                    variants={scheduleItemVariants}
                    whileHover="hover"
                    className="flex items-center gap-4 p-4 rounded-2xl"
                    style={{ 
                      background: 'linear-gradient(135deg, rgba(230, 245, 243, 0.8) 0%, rgba(204, 235, 231, 0.5) 100%)',
                      border: '1px solid rgba(45, 154, 138, 0.1)',
                    }}
                  >
                    <div 
                      className="w-1 h-14 rounded-full"
                      style={{ background: 'linear-gradient(180deg, #1b5f56 0%, #2d9a8a 100%)' }}
                    />
                    <div className="flex-1">
                      <p className="font-medium" style={{ color: '#0d312c' }}>{course?.courseName || schedule.courseCode}</p>
                      <p className="text-sm" style={{ color: '#247d70' }}>{course?.instructor}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium" style={{ color: '#0d312c' }}>{schedule.startTime} - {schedule.endTime}</p>
                      <p className="text-sm" style={{ color: '#247d70' }}>{schedule.room}, {schedule.building}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12" style={{ color: '#66c3b7' }}>
              <HiOutlineAcademicCap size={48} className="mb-4" />
              <p className="text-lg font-medium">No classes today</p>
              <p className="text-sm">Enjoy your day off!</p>
            </div>
          )}
        </motion.div>

        {/* Upcoming Quests */}
        <motion.div
          variants={fadeInUp}
          className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl"
          style={{ border: '1px solid rgba(45, 154, 138, 0.1)' }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold" style={{ color: '#0d312c' }}>Upcoming Quests</h3>
            <HiOutlineClipboardList size={24} style={{ color: '#66c3b7' }} />
          </div>

          <div className="space-y-4">
            {upcomingQuests.map((quest) => {
              const studentQuest = studentQuests.find(sq => sq.questId === quest.questId);
              const course = getCourseByCode(quest.courseCode);
              const dueDate = new Date(quest.dueDate);
              const isOverdue = dueDate < new Date();

              return (
                <motion.div
                  key={quest.questId}
                  variants={questItemVariants}
                  whileHover="hover"
                  className="p-4 rounded-2xl"
                  style={{ 
                    background: 'linear-gradient(135deg, rgba(230, 245, 243, 0.8) 0%, rgba(204, 235, 231, 0.5) 100%)',
                    border: '1px solid rgba(45, 154, 138, 0.1)',
                  }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <span 
                      className="text-xs font-medium px-2 py-1 rounded-lg"
                      style={{
                        background: quest.type === 'Quiz' ? 'rgba(36, 125, 112, 0.2)' :
                                   quest.type === 'Project' ? 'rgba(27, 95, 86, 0.2)' :
                                   'rgba(13, 49, 44, 0.2)',
                        color: '#0d312c',
                      }}
                    >
                      {quest.type}
                    </span>
                    <span 
                      className="text-xs"
                      style={{ color: isOverdue ? '#dc2626' : '#247d70' }}
                    >
                      {isOverdue ? 'Overdue' : quest.dueDate}
                    </span>
                  </div>
                  <p className="font-medium text-sm mb-1" style={{ color: '#0d312c' }}>{quest.title}</p>
                  <p className="text-xs" style={{ color: '#247d70' }}>{course?.courseName}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span 
                      className="text-xs font-medium"
                      style={{
                        color: studentQuest?.status === 'In Progress' ? '#1b5f56' : '#66c3b7',
                      }}
                    >
                      {studentQuest?.status}
                    </span>
                    <span className="text-xs" style={{ color: '#66c3b7' }}>{quest.maxScore} pts</span>
                  </div>
                </motion.div>
              );
            })}

            {upcomingQuests.length === 0 && (
              <div className="text-center py-8" style={{ color: '#66c3b7' }}>
                <p>No pending quests</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Quick Stats Row */}
      <motion.div
        variants={fadeInUp}
        className="rounded-3xl p-8 text-white relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0d312c 0%, #12423c 30%, #1b5f56 70%, #247d70 100%)',
        }}
      >
        {/* Decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute -top-24 -right-24 w-48 h-48 rounded-full opacity-20"
            style={{ background: 'radial-gradient(circle, #66c3b7 0%, transparent 70%)' }}
          />
          <div 
            className="absolute bottom-0 left-1/4 w-32 h-32 rounded-full opacity-15"
            style={{ background: 'radial-gradient(circle, #2d9a8a 0%, transparent 70%)' }}
          />
        </div>

        <div className="relative flex items-center justify-between flex-wrap gap-6">
          <div>
            <p className="text-white/60 text-sm mb-1">Student Information</p>
            <h3 className="text-xl font-semibold">{currentStudent?.studentName}</h3>
            <p className="text-white/60 text-sm mt-1">{currentStudent?.studentId} • {currentStudent?.major}</p>
          </div>
          <div className="flex gap-8 flex-wrap">
            <div className="text-center">
              <p className="text-3xl font-bold">{currentStudent?.intake}</p>
              <p className="text-white/60 text-sm">Intake</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">{currentStudent?.studyMode}</p>
              <p className="text-white/60 text-sm">Study Mode</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold" style={{ color: currentStudent?.status === 'Active' ? '#66c3b7' : '#fbbf24' }}>
                {currentStudent?.status}
              </p>
              <p className="text-white/60 text-sm">Status</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}