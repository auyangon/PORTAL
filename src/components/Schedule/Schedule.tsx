import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  HiOutlineCalendar,
  HiOutlineLocationMarker,
  HiOutlineVideoCamera,
  HiOutlineExternalLink,
} from 'react-icons/hi';
import { useStudent } from '../../context/StudentContext';

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

const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const DAY_GRADIENTS: Record<string, string> = {
  Monday: '#0d312c, #1b5f56',
  Tuesday: '#12423c, #247d70',
  Wednesday: '#1b5f56, #2d9a8a',
  Thursday: '#247d70, #33af9f',
  Friday: '#0d312c, #247d70',
  Saturday: '#12423c, #2d9a8a',
  Sunday: '#1b5f56, #33af9f',
};

export function Schedule() {
  const { getStudentSchedules, getCourseByCode } = useStudent();
  const [viewMode, setViewMode] = useState<'week' | 'day'>('week');
  const [selectedDay, setSelectedDay] = useState<string>(
    new Date().toLocaleDateString('en-US', { weekday: 'long' })
  );

  const studentSchedules = getStudentSchedules();

  // Group schedules by day
  const schedulesByDay = DAYS_OF_WEEK.reduce((acc, day) => {
    acc[day] = studentSchedules
      .filter(s => s.dayOfWeek === day)
      .sort((a, b) => a.startTime.localeCompare(b.startTime));
    return acc;
  }, {} as Record<string, typeof studentSchedules>);

  const displayDays = viewMode === 'week' 
    ? DAYS_OF_WEEK.filter(day => schedulesByDay[day].length > 0)
    : [selectedDay];

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold" style={{ color: '#0d312c' }}>Class Schedule</h2>
          <p style={{ color: '#247d70' }}>{studentSchedules.length} classes per week</p>
        </div>
        
        {/* View Toggle */}
        <div 
          className="flex gap-2 p-1 rounded-xl"
          style={{ background: 'rgba(230, 245, 243, 0.8)' }}
        >
          <button
            onClick={() => setViewMode('week')}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
            style={{
              background: viewMode === 'week' ? 'white' : 'transparent',
              color: viewMode === 'week' ? '#0d312c' : '#66c3b7',
              boxShadow: viewMode === 'week' ? '0 2px 8px rgba(13, 49, 44, 0.1)' : 'none',
            }}
          >
            Week View
          </button>
          <button
            onClick={() => setViewMode('day')}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
            style={{
              background: viewMode === 'day' ? 'white' : 'transparent',
              color: viewMode === 'day' ? '#0d312c' : '#66c3b7',
              boxShadow: viewMode === 'day' ? '0 2px 8px rgba(13, 49, 44, 0.1)' : 'none',
            }}
          >
            Day View
          </button>
        </div>
      </motion.div>

      {/* Day Selector (for day view) */}
      {viewMode === 'day' && (
        <motion.div variants={itemVariants} className="flex gap-2 overflow-x-auto pb-2">
          {DAYS_OF_WEEK.map(day => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className="px-5 py-3 rounded-xl text-sm font-medium whitespace-nowrap transition-all"
              style={{
                background: selectedDay === day 
                  ? `linear-gradient(135deg, ${DAY_GRADIENTS[day]})` 
                  : day === today
                    ? 'rgba(45, 154, 138, 0.15)'
                    : 'rgba(230, 245, 243, 0.8)',
                color: selectedDay === day ? 'white' : '#1b5f56',
              }}
            >
              {day}
              {schedulesByDay[day].length > 0 && (
                <span 
                  className="ml-2 px-2 py-0.5 rounded-full text-xs"
                  style={{
                    background: selectedDay === day ? 'rgba(255,255,255,0.2)' : 'rgba(27, 95, 86, 0.1)',
                  }}
                >
                  {schedulesByDay[day].length}
                </span>
              )}
            </button>
          ))}
        </motion.div>
      )}

      {/* Schedule Display */}
      <div className="space-y-8">
        {displayDays.map(day => (
          <motion.div key={day} variants={itemVariants}>
            {/* Day Header */}
            <div className="flex items-center gap-4 mb-4">
              <div 
                className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg"
                style={{ 
                  background: `linear-gradient(135deg, ${DAY_GRADIENTS[day]})`,
                  boxShadow: '0 8px 24px rgba(27, 95, 86, 0.25)',
                }}
              >
                <span className="text-white text-sm font-bold">
                  {day.slice(0, 2)}
                </span>
              </div>
              <div>
                <h3 className="font-semibold flex items-center gap-2" style={{ color: '#0d312c' }}>
                  {day}
                  {day === today && (
                    <span 
                      className="text-xs font-medium px-2 py-1 rounded-full"
                      style={{ background: 'rgba(45, 154, 138, 0.15)', color: '#1b5f56' }}
                    >
                      Today
                    </span>
                  )}
                </h3>
                <p className="text-sm" style={{ color: '#247d70' }}>{schedulesByDay[day].length} classes</p>
              </div>
            </div>

            {/* Classes */}
            {schedulesByDay[day].length > 0 ? (
              <div className="grid gap-4">
                {schedulesByDay[day].map((schedule) => {
                  const course = getCourseByCode(schedule.courseCode);
                  
                  return (
                    <motion.div
                      key={schedule.scheduleId}
                      whileHover={{ scale: 1.01 }}
                      className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl hover-lift"
                      style={{ border: '1px solid rgba(45, 154, 138, 0.1)' }}
                    >
                      <div className="flex items-start gap-6">
                        {/* Time */}
                        <div className="text-center flex-shrink-0">
                          <div 
                            className="w-20 h-20 rounded-2xl flex flex-col items-center justify-center"
                            style={{ background: 'linear-gradient(135deg, rgba(230, 245, 243, 0.9), rgba(204, 235, 231, 0.7))' }}
                          >
                            <p className="text-lg font-bold" style={{ color: '#0d312c' }}>{schedule.startTime}</p>
                            <p className="text-xs" style={{ color: '#66c3b7' }}>to</p>
                            <p className="text-sm font-medium" style={{ color: '#247d70' }}>{schedule.endTime}</p>
                          </div>
                        </div>

                        {/* Course Info */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <span className="text-xs font-medium" style={{ color: '#66c3b7' }}>{schedule.courseCode}</span>
                              <h4 className="text-lg font-semibold mt-1" style={{ color: '#0d312c' }}>
                                {course?.courseName || schedule.courseCode}
                              </h4>
                              <p className="text-sm" style={{ color: '#247d70' }}>{course?.instructor}</p>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-4 mt-4">
                            <div className="flex items-center gap-2 text-sm" style={{ color: '#247d70' }}>
                              <HiOutlineLocationMarker size={16} />
                              <span>{schedule.room}, {schedule.building}</span>
                            </div>
                            {schedule.zoomLink && (
                              <a
                                href={schedule.zoomLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-sm transition-colors"
                                style={{ color: '#1b5f56' }}
                              >
                                <HiOutlineVideoCamera size={16} />
                                <span>Join Online</span>
                                <HiOutlineExternalLink size={14} />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div 
                className="rounded-2xl p-8 text-center"
                style={{ background: 'rgba(230, 245, 243, 0.5)', color: '#66c3b7' }}
              >
                <p>No classes scheduled</p>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {studentSchedules.length === 0 && (
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center justify-center py-16"
          style={{ color: '#66c3b7' }}
        >
          <HiOutlineCalendar size={64} className="mb-4" />
          <p className="text-xl font-medium">No schedule available</p>
          <p className="text-sm">Your class schedule will appear here</p>
        </motion.div>
      )}
    </motion.div>
  );
}
