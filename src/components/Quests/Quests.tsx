import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiOutlineClipboardList,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineExclamationCircle,
  HiOutlineX,
  HiOutlineExternalLink,
  HiOutlineDocumentText,
  HiOutlineLightningBolt,
} from 'react-icons/hi';
import { useStudent } from '../../context/StudentContext';
import type { Quest, StudentQuest } from '../../types';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

type FilterType = 'all' | 'pending' | 'submitted' | 'completed';

export function Quests() {
  const { quests, studentQuests, getCourseByCode, enrollments } = useStudent();
  const [filter, setFilter] = useState<FilterType>('all');
  const [selectedQuest, setSelectedQuest] = useState<{ quest: Quest; studentQuest?: StudentQuest } | null>(null);

  // Filter quests for enrolled courses only
  const enrolledCourseCodes = enrollments.map(e => e.courseCode);
  const relevantQuests = quests.filter(q => enrolledCourseCodes.includes(q.courseCode));

  const getStudentQuestData = (questId: string): StudentQuest | undefined => {
    return studentQuests.find(sq => sq.questId === questId);
  };

  const filteredQuests = relevantQuests.filter(quest => {
    const studentQuest = getStudentQuestData(quest.questId);
    if (filter === 'all') return true;
    if (filter === 'pending') return studentQuest?.status === 'In Progress' || studentQuest?.status === 'Not Started';
    if (filter === 'submitted') return studentQuest?.status === 'Submitted';
    if (filter === 'completed') return studentQuest?.status === 'Completed';
    return true;
  });

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'Completed':
        return { color: 'rgba(45, 154, 138, 0.15)', textColor: '#1b5f56', icon: HiOutlineCheckCircle };
      case 'Submitted':
        return { color: 'rgba(36, 125, 112, 0.15)', textColor: '#247d70', icon: HiOutlineDocumentText };
      case 'In Progress':
        return { color: 'rgba(245, 158, 11, 0.15)', textColor: '#d97706', icon: HiOutlineClock };
      default:
        return { color: 'rgba(156, 163, 175, 0.15)', textColor: '#6b7280', icon: HiOutlineExclamationCircle };
    }
  };

  const getTypeStyle = (type: string) => {
    switch (type) {
      case 'Quiz': return { bg: 'rgba(36, 125, 112, 0.15)', color: '#247d70' };
      case 'Project': return { bg: 'rgba(27, 95, 86, 0.2)', color: '#1b5f56' };
      case 'Assignment': return { bg: 'rgba(13, 49, 44, 0.15)', color: '#0d312c' };
      default: return { bg: 'rgba(156, 163, 175, 0.15)', color: '#6b7280' };
    }
  };

  const isOverdue = (dueDate: string): boolean => {
    return new Date(dueDate) < new Date();
  };

  const stats = {
    total: relevantQuests.length,
    completed: studentQuests.filter(sq => sq.status === 'Completed').length,
    pending: studentQuests.filter(sq => sq.status === 'In Progress' || sq.status === 'Not Started').length,
    submitted: studentQuests.filter(sq => sq.status === 'Submitted').length,
  };

  return (
    <>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {/* Stats */}
        <motion.div variants={itemVariants} className="grid grid-cols-4 gap-4">
          {[
            { label: 'Total Quests', value: stats.total, gradient: 'linear-gradient(135deg, rgba(230, 245, 243, 0.9), rgba(204, 235, 231, 0.7))' },
            { label: 'Completed', value: stats.completed, gradient: 'linear-gradient(135deg, rgba(45, 154, 138, 0.15), rgba(102, 195, 183, 0.1))' },
            { label: 'Submitted', value: stats.submitted, gradient: 'linear-gradient(135deg, rgba(36, 125, 112, 0.15), rgba(45, 154, 138, 0.1))' },
            { label: 'Pending', value: stats.pending, gradient: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(251, 191, 36, 0.1))' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl p-5 text-center"
              style={{ background: stat.gradient }}
            >
              <p className="text-3xl font-bold" style={{ color: '#0d312c' }}>{stat.value}</p>
              <p className="text-sm" style={{ color: '#247d70' }}>{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Filters */}
        <motion.div variants={itemVariants} className="flex gap-2">
          {(['all', 'pending', 'submitted', 'completed'] as FilterType[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300"
              style={{
                background: filter === f 
                  ? 'linear-gradient(135deg, #1b5f56, #247d70)' 
                  : 'rgba(230, 245, 243, 0.8)',
                color: filter === f ? 'white' : '#1b5f56',
                boxShadow: filter === f ? '0 4px 16px rgba(27, 95, 86, 0.3)' : 'none',
              }}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </motion.div>

        {/* Quest List */}
        <div className="space-y-4">
          {filteredQuests.map((quest, index) => {
            const studentQuest = getStudentQuestData(quest.questId);
            const course = getCourseByCode(quest.courseCode);
            const statusConfig = getStatusConfig(studentQuest?.status || 'Not Started');
            const StatusIcon = statusConfig.icon;
            const overdue = isOverdue(quest.dueDate) && studentQuest?.status !== 'Completed';
            const typeStyle = getTypeStyle(quest.type);

            return (
              <motion.div
                key={quest.questId}
                variants={itemVariants}
                whileHover={{ scale: 1.01 }}
                onClick={() => setSelectedQuest({ quest, studentQuest })}
                className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl cursor-pointer transition-all hover-lift"
                style={{ border: '1px solid rgba(45, 154, 138, 0.1)' }}
              >
                <div className="flex items-start gap-6">
                  {/* Quest Icon */}
                  <div 
                    className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0"
                    style={{ 
                      background: `linear-gradient(135deg, ${
                        index % 3 === 0 ? '#0d312c, #1b5f56' :
                        index % 3 === 1 ? '#1b5f56, #247d70' :
                        '#247d70, #2d9a8a'
                      })`,
                      boxShadow: '0 8px 24px rgba(27, 95, 86, 0.25)',
                    }}
                  >
                    <HiOutlineLightningBolt size={28} className="text-white" />
                  </div>

                  {/* Quest Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span 
                            className="text-xs font-medium px-2 py-1 rounded-lg"
                            style={{ background: typeStyle.bg, color: typeStyle.color }}
                          >
                            {quest.type}
                          </span>
                          <span className="text-xs" style={{ color: '#66c3b7' }}>{quest.courseCode}</span>
                        </div>
                        <h3 className="text-lg font-semibold" style={{ color: '#0d312c' }}>{quest.title}</h3>
                        <p className="text-sm" style={{ color: '#247d70' }}>{course?.courseName}</p>
                      </div>
                      <div 
                        className="flex items-center gap-2 px-3 py-1.5 rounded-xl"
                        style={{ background: statusConfig.color, color: statusConfig.textColor }}
                      >
                        <StatusIcon size={16} />
                        <span className="text-sm font-medium">{studentQuest?.status || 'Not Started'}</span>
                      </div>
                    </div>

                    <p className="text-sm mt-2 line-clamp-2" style={{ color: '#66c3b7' }}>{quest.description}</p>

                    {/* Footer */}
                    <div 
                      className="flex items-center justify-between mt-4 pt-4"
                      style={{ borderTop: '1px solid rgba(45, 154, 138, 0.1)' }}
                    >
                      <div className="flex items-center gap-4">
                        <div 
                          className="flex items-center gap-1.5 text-sm"
                          style={{ color: overdue ? '#dc2626' : '#247d70' }}
                        >
                          <HiOutlineClock size={16} />
                          <span>Due: {quest.dueDate}</span>
                          {overdue && <span className="font-medium">(Overdue)</span>}
                        </div>
                        <span className="text-sm" style={{ color: '#66c3b7' }}>Max: {quest.maxScore} pts</span>
                      </div>

                      {studentQuest?.score && (
                        <div className="text-right">
                          <span className="text-lg font-bold" style={{ color: '#0d312c' }}>{studentQuest.score}</span>
                          <span style={{ color: '#66c3b7' }}>/{quest.maxScore}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}

          {filteredQuests.length === 0 && (
            <motion.div
              variants={itemVariants}
              className="flex flex-col items-center justify-center py-16"
              style={{ color: '#66c3b7' }}
            >
              <HiOutlineClipboardList size={64} className="mb-4" />
              <p className="text-xl font-medium">No quests found</p>
              <p className="text-sm">Try changing the filter</p>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Quest Detail Modal */}
      <AnimatePresence>
        {selectedQuest && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedQuest(null)}
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
              {/* Header */}
              <div 
                className="sticky top-0 backdrop-blur-xl p-6 flex items-start justify-between"
                style={{ 
                  background: 'rgba(255, 255, 255, 0.95)',
                  borderBottom: '1px solid rgba(45, 154, 138, 0.1)',
                }}
              >
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span 
                      className="text-xs font-medium px-2 py-1 rounded-lg"
                      style={{ 
                        background: getTypeStyle(selectedQuest.quest.type).bg, 
                        color: getTypeStyle(selectedQuest.quest.type).color 
                      }}
                    >
                      {selectedQuest.quest.type}
                    </span>
                    <span className="text-xs" style={{ color: '#66c3b7' }}>{selectedQuest.quest.courseCode}</span>
                  </div>
                  <h2 className="text-2xl font-bold" style={{ color: '#0d312c' }}>{selectedQuest.quest.title}</h2>
                </div>
                <button
                  onClick={() => setSelectedQuest(null)}
                  className="p-2 rounded-xl transition-colors"
                  style={{ background: 'rgba(45, 154, 138, 0.1)' }}
                >
                  <HiOutlineX size={24} style={{ color: '#1b5f56' }} />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Description */}
                <div>
                  <h3 className="font-semibold mb-2" style={{ color: '#0d312c' }}>Description</h3>
                  <p style={{ color: '#247d70' }}>{selectedQuest.quest.description}</p>
                </div>

                {/* Details */}
                <div className="grid grid-cols-2 gap-4">
                  <div 
                    className="rounded-2xl p-4"
                    style={{ background: 'linear-gradient(135deg, rgba(230, 245, 243, 0.8), rgba(204, 235, 231, 0.5))' }}
                  >
                    <p className="text-sm mb-1" style={{ color: '#247d70' }}>Due Date</p>
                    <p className="font-medium" style={{ color: '#0d312c' }}>{selectedQuest.quest.dueDate}</p>
                  </div>
                  <div 
                    className="rounded-2xl p-4"
                    style={{ background: 'linear-gradient(135deg, rgba(230, 245, 243, 0.8), rgba(204, 235, 231, 0.5))' }}
                  >
                    <p className="text-sm mb-1" style={{ color: '#247d70' }}>Max Score</p>
                    <p className="font-medium" style={{ color: '#0d312c' }}>{selectedQuest.quest.maxScore} points</p>
                  </div>
                </div>

                {/* Status & Score */}
                {selectedQuest.studentQuest && (
                  <div 
                    className="rounded-2xl p-5"
                    style={{ background: 'linear-gradient(135deg, rgba(230, 245, 243, 0.8), rgba(204, 235, 231, 0.5))' }}
                  >
                    <h3 className="font-semibold mb-4" style={{ color: '#0d312c' }}>Your Progress</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm mb-1" style={{ color: '#247d70' }}>Status</p>
                        <p className="font-medium" style={{ color: '#0d312c' }}>{selectedQuest.studentQuest.status}</p>
                      </div>
                      {selectedQuest.studentQuest.score && (
                        <div>
                          <p className="text-sm mb-1" style={{ color: '#247d70' }}>Score</p>
                          <p className="font-medium" style={{ color: '#0d312c' }}>
                            {selectedQuest.studentQuest.score} / {selectedQuest.quest.maxScore}
                          </p>
                        </div>
                      )}
                      {selectedQuest.studentQuest.submittedAt && (
                        <div>
                          <p className="text-sm mb-1" style={{ color: '#247d70' }}>Submitted At</p>
                          <p className="font-medium" style={{ color: '#0d312c' }}>{selectedQuest.studentQuest.submittedAt}</p>
                        </div>
                      )}
                      {selectedQuest.studentQuest.gradedAt && (
                        <div>
                          <p className="text-sm mb-1" style={{ color: '#247d70' }}>Graded At</p>
                          <p className="font-medium" style={{ color: '#0d312c' }}>{selectedQuest.studentQuest.gradedAt}</p>
                        </div>
                      )}
                    </div>

                    {selectedQuest.studentQuest.feedback && (
                      <div 
                        className="mt-4 pt-4"
                        style={{ borderTop: '1px solid rgba(45, 154, 138, 0.2)' }}
                      >
                        <p className="text-sm mb-2" style={{ color: '#247d70' }}>Feedback</p>
                        <p 
                          className="bg-white p-4 rounded-xl"
                          style={{ color: '#0d312c' }}
                        >
                          {selectedQuest.studentQuest.feedback}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Actions */}
                {selectedQuest.studentQuest?.submissionLink && (
                  <a
                    href={selectedQuest.studentQuest.submissionLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-medium transition-all duration-300"
                    style={{
                      background: 'linear-gradient(135deg, #1b5f56, #247d70)',
                      color: 'white',
                    }}
                  >
                    <HiOutlineExternalLink size={18} />
                    View Submission
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
