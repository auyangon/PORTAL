import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  HiOutlineCalendar,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlineClock,
  HiOutlineAcademicCap
} from 'react-icons/hi';
import { useStudent } from "../../context/StudentContext";
import { QRScanner } from "./QRScanner";
import { staggerContainer, fadeInUp } from '../../utils/animations';

export function Attendance() {
  const [showQRScanner, setShowQRScanner] = useState(false); {
  const { 
    attendance, 
    getEnrolledCourses, 
    getCourseByCode,
    currentStudent 
  } = useStudent();

  const enrolledCourses = getEnrolledCourses();

  // Calculate attendance by course
  const courseAttendance = useMemo(() => {
    return enrolledCourses.map(course => {
      const courseAttendance = attendance.filter(a => a.courseCode === course.courseCode);
      const total = courseAttendance.length;
      
      if (total === 0) {
        return {
          ...course,
          present: 0,
          late: 0,
          absent: 0,
          rate: 0,
          total: 0
        };
      }
      
      const present = courseAttendance.filter(a => a.status === 'Present').length;
      const late = courseAttendance.filter(a => a.status === 'Late').length;
      const absent = courseAttendance.filter(a => a.status === 'Absent').length;
      const rate = Math.round((present + late) / total * 100);
      
      return {
        ...course,
        present,
        late,
        absent,
        rate,
        total
      };
    });
  }, [enrolledCourses, attendance]);

  // Overall statistics
  const totalClasses = attendance.length;
  const totalPresent = attendance.filter(a => a.status === 'Present').length;
  const totalLate = attendance.filter(a => a.status === 'Late').length;
  const totalAbsent = attendance.filter(a => a.status === 'Absent').length;
  const overallRate = totalClasses > 0 
    ? Math.round((totalPresent + totalLate) / totalClasses * 100) 
    : 0;

  // Recent attendance records
  const recentAttendance = [...attendance]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10);

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold" style={{ color: '#0d312c' }}>Attendance</h1>
          <p className="text-sm mt-1" style={{ color: '#247d70' }}>
            Track your class attendance across all courses
          </p>
        </div>      {/* QR Check-in Button */}
      <div className="flex gap-3">
        <button
          onClick={() => setShowQRScanner(!showQRScanner)}
          className="px-4 py-2 rounded-xl text-white font-medium flex items-center gap-2"
          style={{ background: 'linear-gradient(135deg, #1b5f56 0%, #247d70 100%)' }}
        >
          <HiOutlineQrcode size={18} />
          {showQRScanner ? 'Close Scanner' : 'QR Check-in'}
        </button>
      </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-2xl font-bold" style={{ color: '#0d312c' }}>{overallRate}%</p>
            <p className="text-xs" style={{ color: '#66c3b7' }}>Overall Attendance</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:p-4 md:p-6">
        <motion.div
          variants={fadeInUp}
          className="glass-card p-3 sm:p-4 md:p-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                 style={{ background: 'rgba(16, 185, 129, 0.1)' }}>
              <HiOutlineCheckCircle size={24} style={{ color: '#10b981' }} />
            </div>
            <div>
              <p className="text-sm" style={{ color: '#247d70' }}>Present</p>
              <p className="text-2xl font-bold" style={{ color: '#0d312c' }}>{totalPresent}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          className="glass-card p-3 sm:p-4 md:p-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                 style={{ background: 'rgba(245, 158, 11, 0.1)' }}>
              <HiOutlineClock size={24} style={{ color: '#f59e0b' }} />
            </div>
            <div>
              <p className="text-sm" style={{ color: '#247d70' }}>Late</p>
              <p className="text-2xl font-bold" style={{ color: '#0d312c' }}>{totalLate}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          className="glass-card p-3 sm:p-4 md:p-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                 style={{ background: 'rgba(239, 68, 68, 0.1)' }}>
              <HiOutlineXCircle size={24} style={{ color: '#ef4444' }} />
            </div>
            <div>
              <p className="text-sm" style={{ color: '#247d70' }}>Absent</p>
              <p className="text-2xl font-bold" style={{ color: '#0d312c' }}>{totalAbsent}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          className="glass-card p-3 sm:p-4 md:p-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                 style={{ background: 'rgba(45, 154, 138, 0.1)' }}>
              <HiOutlineAcademicCap size={24} style={{ color: '#1b5f56' }} />
            </div>
            <div>
              <p className="text-sm" style={{ color: '#247d70' }}>Total Classes</p>
              <p className="text-2xl font-bold" style={{ color: '#0d312c' }}>{totalClasses}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Attendance by Course */}
      <motion.div variants={fadeInUp} className="glass-card p-3 sm:p-4 md:p-6">
        <h2 className="text-xl font-semibold mb-6" style={{ color: '#0d312c' }}>Attendance by Course</h2>
        <div className="space-y-6">
          {courseAttendance.map(course => (
            <div key={course.courseCode}>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="font-medium" style={{ color: '#0d312c' }}>{course.courseName}</p>
                  <p className="text-xs" style={{ color: '#247d70' }}>{course.courseCode}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold" style={{ 
                    color: course.rate >= 90 ? '#10b981' : 
                           course.rate >= 75 ? '#f59e0b' : '#ef4444' 
                  }}>
                    {course.rate}%
                  </p>
                  <p className="text-xs" style={{ color: '#66c3b7' }}>
                    {course.present + course.late} / {course.total} classes
                  </p>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2 rounded-full overflow-hidden mb-2" 
                   style={{ background: 'rgba(45, 154, 138, 0.1)' }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: course.rate + "%" }}
                  transition={{ duration: 0.8 }}
                  className="h-full rounded-full"
                  style={{ 
                    background: course.rate >= 90 ? 'linear-gradient(90deg, #10b981, #34d399)' :
                               course.rate >= 75 ? 'linear-gradient(90deg, #f59e0b, #fbbf24)' :
                               'linear-gradient(90deg, #ef4444, #f87171)'
                  }}
                />
              </div>

              {/* Status breakdown */}
              <div className="flex gap-4 text-sm">
                <span style={{ color: '#10b981' }}>✓ Present: {course.present}</span>
                <span style={{ color: '#f59e0b' }}>⏰ Late: {course.late}</span>
                <span style={{ color: '#ef4444' }}>✗ Absent: {course.absent}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Recent Attendance */}
      <motion.div variants={fadeInUp} className="glass-card p-3 sm:p-4 md:p-6">
        <h2 className="text-xl font-semibold mb-6" style={{ color: '#0d312c' }}>Recent Attendance</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(45, 154, 138, 0.1)' }}>
                <th className="text-left py-3 text-sm font-medium" style={{ color: '#247d70' }}>Date</th>
                <th className="text-left py-3 text-sm font-medium" style={{ color: '#247d70' }}>Course</th>
                <th className="text-left py-3 text-sm font-medium" style={{ color: '#247d70' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentAttendance.map(record => {
                const course = getCourseByCode(record.courseCode);
                return (
                  <tr key={record.id} style={{ borderBottom: '1px solid rgba(45, 154, 138, 0.05)' }}>
                    <td className="py-3 text-sm" style={{ color: '#0d312c' }}>
                      {new Date(record.date).toLocaleDateString()}
                    </td>
                    <td className="py-3 text-sm" style={{ color: '#0d312c' }}>
                      {course?.courseName || record.courseCode}
                    </td>
                    <td className="py-3">
                      <span className="px-2 py-1 rounded-full text-xs"
                        style={{
                          background: record.status === 'Present' ? 'rgba(16, 185, 129, 0.1)' :
                                     record.status === 'Late' ? 'rgba(245, 158, 11, 0.1)' :
                                     'rgba(239, 68, 68, 0.1)',
                          color: record.status === 'Present' ? '#10b981' :
                                 record.status === 'Late' ? '#f59e0b' : '#ef4444'
                        }}>
                        {record.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
            {/* QR Scanner Modal */}
      {showQRScanner && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="max-w-md w-full">
            <QRScanner 
              studentEmail={currentStudent?.email || ''}
              onSuccess={() => {
                setShowQRScanner(false);
                refreshData();
              }}
              onClose={() => setShowQRScanner(false)}
            />
          </div>
        </div>
      )}</motion.div>
    </motion.div>
  );
}



