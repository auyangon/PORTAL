import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  HiOutlineCalendar, 
  HiOutlineCheckCircle, 
  HiOutlineXCircle,
  HiOutlineClock,
  HiOutlineAcademicCap,
  HiOutlineQrcode
} from 'react-icons/hi';
import { useStudent } from '../../context/StudentContext';
import { staggerContainer, fadeInUp } from '../../utils/animations';
import { QRScanner } from './QRScanner';

export function Attendance() {
  const { 
    attendance, 
    getEnrolledCourses, 
    getCourseByCode,
    currentStudent,
    refreshData
  } = useStudent();

  const [showQRScanner, setShowQRScanner] = useState(false);
  const enrolledCourses = getEnrolledCourses();

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

  const totalClasses = attendance.length;
  const totalPresent = attendance.filter(a => a.status === 'Present').length;
  const totalLate = attendance.filter(a => a.status === 'Late').length;
  const totalAbsent = attendance.filter(a => a.status === 'Absent').length;
  const overallRate = totalClasses > 0 
    ? Math.round((totalPresent + totalLate) / totalClasses * 100) 
    : 0;

  const recentAttendance = [...attendance]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10);

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold" style={{ color: '#0d312c' }}>Attendance</h1>
          <p className="text-sm mt-1" style={{ color: '#247d70' }}>Track your class attendance</p>
        </div>
        <button
          onClick={() => setShowQRScanner(!showQRScanner)}
          className="px-5 py-3 rounded-xl text-white font-medium flex items-center gap-2"
          style={{ background: 'linear-gradient(135deg, #1b5f56 0%, #247d70 100%)' }}
        >
          <HiOutlineQrcode size={20} />
          {showQRScanner ? 'Close' : 'QR Check-in'}
        </button>
      </div>

      {/* QR Scanner Modal */}
      {showQRScanner && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="max-w-md w-full">
            <QRScanner 
              studentEmail={currentStudent?.email || ''}
              onSuccess={() => { setShowQRScanner(false); refreshData(); }}
              onClose={() => setShowQRScanner(false)}
            />
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(16,185,129,0.1)' }}>
              <HiOutlineCheckCircle size={20} style={{ color: '#10b981' }} />
            </div>
            <div>
              <p className="text-xs text-seafoam-600">Present</p>
              <p className="text-xl font-bold text-seafoam-900">{totalPresent}</p>
            </div>
          </div>
        </div>
        <div className="glass-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(245,158,11,0.1)' }}>
              <HiOutlineClock size={20} style={{ color: '#f59e0b' }} />
            </div>
            <div>
              <p className="text-xs text-seafoam-600">Late</p>
              <p className="text-xl font-bold text-seafoam-900">{totalLate}</p>
            </div>
          </div>
        </div>
        <div className="glass-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(239,68,68,0.1)' }}>
              <HiOutlineXCircle size={20} style={{ color: '#ef4444' }} />
            </div>
            <div>
              <p className="text-xs text-seafoam-600">Absent</p>
              <p className="text-xl font-bold text-seafoam-900">{totalAbsent}</p>
            </div>
          </div>
        </div>
        <div className="glass-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(45,154,138,0.1)' }}>
              <HiOutlineAcademicCap size={20} style={{ color: '#1b5f56' }} />
            </div>
            <div>
              <p className="text-xs text-seafoam-600">Overall</p>
              <p className="text-xl font-bold text-seafoam-900">{overallRate}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Attendance by Course */}
      <div className="glass-card p-6">
        <h2 className="text-lg font-semibold mb-4 text-seafoam-900">Attendance by Course</h2>
        <div className="space-y-6">
          {courseAttendance.map(course => (
            <div key={course.courseCode}>
              <div className="flex justify-between mb-2">
                <div>
                  <p className="font-medium text-seafoam-900">{course.courseName}</p>
                  <p className="text-xs text-seafoam-500">{course.courseCode}</p>
                </div>
                <p className="text-lg font-semibold" style={{ color: course.rate >= 90 ? '#10b981' : course.rate >= 75 ? '#f59e0b' : '#ef4444' }}>
                  {course.rate}%
                </p>
              </div>
              <div className="w-full h-2 rounded-full overflow-hidden bg-seafoam-100">
                <div className="h-full rounded-full transition-all" style={{ width: ${course.rate}%, background: course.rate >= 90 ? '#10b981' : course.rate >= 75 ? '#f59e0b' : '#ef4444' }} />
              </div>
              <div className="flex gap-3 text-xs mt-2">
                <span className="text-green-600">✓ {course.present}</span>
                <span className="text-amber-500">⏰ {course.late}</span>
                <span className="text-red-500">✗ {course.absent}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
