import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
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

  // Live clock
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Calculate statistics
  const enrolledCourses = getEnrolledCourses();
  const totalCredits = enrollments.reduce((sum, e) => sum + parseFloat(e.gpaPoints || '0'), 0);
  const avgGPA = enrollments.length > 0 ? (totalCredits / enrollments.length).toFixed(2) : '0.00';
  
  const presentCount = attendance.filter(a => a.status === 'Present').length;
  const totalAttendance = attendance.length;
  const attendanceRate = totalAttendance > 0 ? Math.round((presentCount / totalAttendance) * 100) : 0;

  const pendingQuests = studentQuests.filter(sq => sq.status === 'In Progress' || sq.status === 'Not Started');
  const completedQuests = studentQuests.filter(sq => sq.status === 'Completed');

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  const todaySchedules = getStudentSchedules().filter(s => s.dayOfWeek === today);

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
      {/* Live Clock Banner */}
      <motion.div
        variants={fadeInUp}
        className="glass-card p-6 flex items-center justify-between"
      >
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
               style={{ background: 'linear-gradient(135deg, #1b5f56 0%, #247d70 100%)' }}>
            <HiOutlineClock size={24} className="text-white" />
          </div>
          <div>
            <p className="text-sm" style={{ color: '#247d70' }}>Current Time</p>
            <p className="text-2xl font-semibold" style={{ color: '#0d312c' }}>{formatTime(currentTime)}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm" style={{ color: '#247d70' }}>{formatDate(currentTime)}</p>
          <p className="text-xs" style={{ color: '#66c3b7' }}>Live updating</p>
        </div>
      </motion.div>

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
              className={	ext-xs font-medium px-3 py-1 rounded-full}
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

      {/* Rest of your dashboard remains the same */}
      {/* ... */}
    </motion.div>
  );
}
