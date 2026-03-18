import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiOutlineAcademicCap,
  HiOutlineExternalLink,
  HiOutlineMail,
  HiOutlineLocationMarker,
  HiOutlineClock,
  HiOutlineX,
} from 'react-icons/hi';
import { useStudent } from '../../context/StudentContext';
import type { Course, Enrollment } from '../../types';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export function Courses() {
  const { enrollments, getEnrolledCourses, getCourseByCode, schedules } = useStudent();
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const enrolledCourses = getEnrolledCourses();

  const getEnrollmentForCourse = (courseCode: string): Enrollment | undefined => {
    return enrollments.find(e => e.courseCode === courseCode);
  };

  const getSchedulesForCourse = (courseCode: string) => {
    return schedules.filter(s => s.courseCode === courseCode);
  };

  const getGradeColor = (grade: string): string => {
    if (grade.startsWith('A')) return 'bg-seafoam-100 text-seafoam-700';
    if (grade.startsWith('B')) return 'bg-seafoam-50 text-seafoam-600';
    if (grade.startsWith('C')) return 'bg-amber-50 text-amber-600';
    return 'bg-gray-50 text-gray-600';
  };

  return (
    <>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold" style={{ color: '#0d312c' }}>My Courses</h2>
            <p style={{ color: '#247d70' }}>
              {enrolledCourses.length} courses • {enrollments.reduce((sum, e) => sum + parseInt(getCourseByCode(e.courseCode)?.credits || '0'), 0)} total credits
            </p>
          </div>
        </motion.div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {enrolledCourses.map((course, index) => {
            const enrollment = getEnrollmentForCourse(course.courseCode);
            const courseSchedules = getSchedulesForCourse(course.courseCode);

            return (
              <motion.div
                key={course.courseCode}
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -4 }}
                onClick={() => setSelectedCourse(course)}
                className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl cursor-pointer transition-all hover-lift"
                style={{ border: '1px solid rgba(45, 154, 138, 0.1)' }}
              >
                {/* Course Header */}
                <div className="flex items-start justify-between mb-4">
                  <div 
                    className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"
                    style={{ 
                      background: `linear-gradient(135deg, ${
                        index % 4 === 0 ? '#0d312c, #1b5f56' :
                        index % 4 === 1 ? '#12423c, #247d70' :
                        index % 4 === 2 ? '#1b5f56, #2d9a8a' :
                        '#247d70, #33af9f'
                      })`,
                      boxShadow: '0 8px 24px rgba(27, 95, 86, 0.3)',
                    }}
                  >
                    <HiOutlineAcademicCap size={28} className="text-white" />
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span 
                      className="text-xs font-medium px-3 py-1 rounded-full"
                      style={{ background: 'rgba(45, 154, 138, 0.1)', color: '#1b5f56' }}
                    >
                      {course.credits} Credits
                    </span>
                    {enrollment?.grade && (
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${getGradeColor(enrollment.grade)}`}>
                        {enrollment.grade}
                      </span>
                    )}
                  </div>
                </div>

                {/* Course Info */}
                <div className="mb-4">
                  <p className="text-xs mb-1" style={{ color: '#66c3b7' }}>{course.courseCode}</p>
                  <h3 className="text-lg font-semibold leading-tight mb-2" style={{ color: '#0d312c' }}>
                    {course.courseName}
                  </h3>
                  <p className="text-sm" style={{ color: '#247d70' }}>{course.department}</p>
                </div>

                {/* Instructor */}
                <div 
                  className="flex items-center gap-3 py-3"
                  style={{ borderTop: '1px solid rgba(45, 154, 138, 0.1)' }}
                >
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #1b5f56, #247d70)' }}
                  >
                    <span className="text-sm font-medium text-white">
                      {course.instructor.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate" style={{ color: '#0d312c' }}>{course.instructor}</p>
                    <p className="text-xs truncate" style={{ color: '#66c3b7' }}>{course.instructorEmail}</p>
                  </div>
                </div>

                {/* Schedule Preview */}
                {courseSchedules.length > 0 && (
                  <div 
                    className="mt-3 pt-3"
                    style={{ borderTop: '1px solid rgba(45, 154, 138, 0.1)' }}
                  >
                    <div className="flex items-center gap-2 text-xs" style={{ color: '#247d70' }}>
                      <HiOutlineClock size={14} />
                      <span>
                        {courseSchedules.map(s => s.dayOfWeek.slice(0, 3)).join(', ')}
                      </span>
                    </div>
                  </div>
                )}

                {/* Status */}
                <div className="mt-4 flex items-center justify-between">
                  <span 
                    className="text-xs font-medium px-3 py-1 rounded-full"
                    style={{
                      background: course.status === 'Active' ? 'rgba(45, 154, 138, 0.15)' : 'rgba(156, 163, 175, 0.1)',
                      color: course.status === 'Active' ? '#1b5f56' : '#6b7280',
                    }}
                  >
                    {course.status}
                  </span>
                  <span className="text-xs" style={{ color: '#66c3b7' }}>{enrollment?.semester}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {enrolledCourses.length === 0 && (
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center justify-center py-16"
            style={{ color: '#66c3b7' }}
          >
            <HiOutlineAcademicCap size={64} className="mb-4" />
            <p className="text-xl font-medium">No courses enrolled</p>
            <p className="text-sm">Contact academic office to enroll in courses</p>
          </motion.div>
        )}
      </motion.div>

      {/* Course Detail Modal */}
      <AnimatePresence>
        {selectedCourse && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCourse(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(13, 49, 44, 0.5)', backdropFilter: 'blur(8px)' }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl"
            >
              {/* Modal Header */}
              <div 
                className="sticky top-0 backdrop-blur-xl p-6 flex items-start justify-between"
                style={{ 
                  background: 'rgba(255, 255, 255, 0.95)',
                  borderBottom: '1px solid rgba(45, 154, 138, 0.1)',
                }}
              >
                <div>
                  <p className="text-sm mb-1" style={{ color: '#247d70' }}>{selectedCourse.courseCode}</p>
                  <h2 className="text-2xl font-bold" style={{ color: '#0d312c' }}>{selectedCourse.courseName}</h2>
                </div>
                <button
                  onClick={() => setSelectedCourse(null)}
                  className="p-2 rounded-xl transition-colors"
                  style={{ background: 'rgba(45, 154, 138, 0.1)' }}
                >
                  <HiOutlineX size={24} style={{ color: '#1b5f56' }} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                {/* Course Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div 
                    className="rounded-2xl p-4"
                    style={{ background: 'linear-gradient(135deg, rgba(230, 245, 243, 0.8), rgba(204, 235, 231, 0.5))' }}
                  >
                    <p className="text-sm mb-1" style={{ color: '#247d70' }}>Department</p>
                    <p className="font-medium" style={{ color: '#0d312c' }}>{selectedCourse.department}</p>
                  </div>
                  <div 
                    className="rounded-2xl p-4"
                    style={{ background: 'linear-gradient(135deg, rgba(230, 245, 243, 0.8), rgba(204, 235, 231, 0.5))' }}
                  >
                    <p className="text-sm mb-1" style={{ color: '#247d70' }}>Credits</p>
                    <p className="font-medium" style={{ color: '#0d312c' }}>{selectedCourse.credits}</p>
                  </div>
                </div>

                {/* Instructor Info */}
                <div 
                  className="rounded-2xl p-5"
                  style={{ background: 'linear-gradient(135deg, rgba(230, 245, 243, 0.8), rgba(204, 235, 231, 0.5))' }}
                >
                  <h3 className="font-semibold mb-4" style={{ color: '#0d312c' }}>Instructor</h3>
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ background: 'linear-gradient(135deg, #1b5f56, #247d70)' }}
                    >
                      <span className="text-white font-medium">
                        {selectedCourse.instructor.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium" style={{ color: '#0d312c' }}>{selectedCourse.instructor}</p>
                      <div className="flex items-center gap-2 text-sm" style={{ color: '#247d70' }}>
                        <HiOutlineMail size={14} />
                        {selectedCourse.instructorEmail}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Schedule */}
                <div>
                  <h3 className="font-semibold mb-4" style={{ color: '#0d312c' }}>Schedule</h3>
                  <div className="space-y-3">
                    {getSchedulesForCourse(selectedCourse.courseCode).map((schedule) => (
                      <div
                        key={schedule.scheduleId}
                        className="flex items-center justify-between p-4 rounded-2xl"
                        style={{ background: 'linear-gradient(135deg, rgba(230, 245, 243, 0.8), rgba(204, 235, 231, 0.5))' }}
                      >
                        <div className="flex items-center gap-4">
                          <div 
                            className="w-12 h-12 rounded-xl flex items-center justify-center"
                            style={{ background: 'linear-gradient(135deg, #1b5f56, #247d70)' }}
                          >
                            <span className="text-white text-xs font-medium">
                              {schedule.dayOfWeek.slice(0, 3)}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium" style={{ color: '#0d312c' }}>{schedule.dayOfWeek}</p>
                            <p className="text-sm" style={{ color: '#247d70' }}>
                              {schedule.startTime} - {schedule.endTime}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 text-sm" style={{ color: '#247d70' }}>
                            <HiOutlineLocationMarker size={14} />
                            {schedule.room}, {schedule.building}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  {selectedCourse.googleClassroomLink && (
                    <a
                      href={selectedCourse.googleClassroomLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition-all duration-300"
                      style={{
                        background: 'linear-gradient(135deg, #1b5f56, #247d70)',
                        color: 'white',
                      }}
                    >
                      <HiOutlineExternalLink size={18} />
                      Open Google Classroom
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
