import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiOutlineSpeakerphone,
  HiOutlineCalendar,
  HiOutlineUserCircle,
  HiOutlineX,
  HiOutlineGlobeAlt,
  HiOutlineAcademicCap,
} from 'react-icons/hi';
import { useStudent } from '../../context/StudentContext';
import type { Announcement } from '../../types';

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

type FilterType = 'all' | 'general' | 'course';

export function Announcements() {
  const { announcements, getCourseByCode, enrollments } = useStudent();
  const [filter, setFilter] = useState<FilterType>('all');
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);

  const enrolledCourseCodes = enrollments.map(e => e.courseCode);

  // Filter announcements relevant to the student
  const relevantAnnouncements = announcements.filter(a => 
    a.audience === 'All' || 
    (a.audience === 'Course' && enrolledCourseCodes.includes(a.courseCode))
  );

  const filteredAnnouncements = relevantAnnouncements
    .filter(a => {
      if (filter === 'all') return true;
      if (filter === 'general') return a.audience === 'All';
      if (filter === 'course') return a.audience === 'Course';
      return true;
    })
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const getTimeAgo = (dateStr: string): string => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return dateStr;
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
            <h2 className="text-2xl font-bold text-black">Announcements</h2>
            <p className="text-gray-500">{relevantAnnouncements.length} announcements</p>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div variants={itemVariants} className="flex gap-2">
          {([
            { id: 'all', label: 'All', icon: HiOutlineSpeakerphone },
            { id: 'general', label: 'General', icon: HiOutlineGlobeAlt },
            { id: 'course', label: 'Course', icon: HiOutlineAcademicCap },
          ] as const).map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all ${
                filter === f.id
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <f.icon size={18} />
              {f.label}
            </button>
          ))}
        </motion.div>

        {/* Announcements List */}
        <div className="space-y-4">
          {filteredAnnouncements.map((announcement) => {
            const course = announcement.courseCode ? getCourseByCode(announcement.courseCode) : null;
            const isRecent = new Date(announcement.createdAt).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000;

            return (
              <motion.div
                key={announcement.announcementId}
                variants={itemVariants}
                whileHover={{ scale: 1.01 }}
                onClick={() => setSelectedAnnouncement(announcement)}
                className="bg-white/60 backdrop-blur-xl rounded-3xl p-6 border border-black/5 shadow-xl shadow-black/5 cursor-pointer transition-all"
              >
                <div className="flex items-start gap-5">
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0 ${
                    announcement.audience === 'All'
                      ? 'bg-gradient-to-br from-blue-500 to-blue-600'
                      : 'bg-gradient-to-br from-purple-500 to-purple-600'
                  }`}>
                    {announcement.audience === 'All' ? (
                      <HiOutlineGlobeAlt size={28} className="text-white" />
                    ) : (
                      <HiOutlineAcademicCap size={28} className="text-white" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          {isRecent && (
                            <span className="text-xs font-medium bg-red-50 text-red-600 px-2 py-0.5 rounded-full">
                              New
                            </span>
                          )}
                          {course && (
                            <span className="text-xs font-medium bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                              {course.courseCode}
                            </span>
                          )}
                        </div>
                        <h3 className="text-lg font-semibold text-black">{announcement.title}</h3>
                      </div>
                      <span className="text-sm text-gray-400 whitespace-nowrap ml-4">
                        {getTimeAgo(announcement.createdAt)}
                      </span>
                    </div>

                    <p className="text-gray-600 line-clamp-2">{announcement.content}</p>

                    {/* Footer */}
                    <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <HiOutlineUserCircle size={16} />
                        <span>{announcement.createdBy}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <HiOutlineCalendar size={16} />
                        <span>{announcement.createdAt}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {filteredAnnouncements.length === 0 && (
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center justify-center py-16 text-gray-400"
          >
            <HiOutlineSpeakerphone size={64} className="mb-4" />
            <p className="text-xl font-medium">No announcements</p>
            <p className="text-sm">Check back later for updates</p>
          </motion.div>
        )}
      </motion.div>

      {/* Announcement Detail Modal */}
      <AnimatePresence>
        {selectedAnnouncement && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedAnnouncement(null)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="sticky top-0 bg-white/90 backdrop-blur-xl border-b border-gray-100 p-6 flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    selectedAnnouncement.audience === 'All'
                      ? 'bg-blue-100 text-blue-600'
                      : 'bg-purple-100 text-purple-600'
                  }`}>
                    {selectedAnnouncement.audience === 'All' ? (
                      <HiOutlineGlobeAlt size={24} />
                    ) : (
                      <HiOutlineAcademicCap size={24} />
                    )}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-black">{selectedAnnouncement.title}</h2>
                    <p className="text-sm text-gray-500 mt-1">
                      {selectedAnnouncement.createdBy} • {selectedAnnouncement.createdAt}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedAnnouncement(null)}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <HiOutlineX size={24} />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                    {selectedAnnouncement.content}
                  </p>
                </div>

                {selectedAnnouncement.courseCode && (
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <p className="text-sm text-gray-500">
                      This announcement is for: 
                      <span className="font-medium text-black ml-1">
                        {getCourseByCode(selectedAnnouncement.courseCode)?.courseName || selectedAnnouncement.courseCode}
                      </span>
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
