import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiOutlineClipboardCheck,
  HiOutlineClock,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlinePlus,
  HiOutlineX,
  HiOutlineDocumentText,
  HiOutlineRefresh,
} from 'react-icons/hi';
import { useStudent } from '../../context/StudentContext';
import toast from 'react-hot-toast';
import type { Request } from '../../types';

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

const REQUEST_TYPES = [
  'Transcript Request',
  'Course Add/Drop',
  'Leave of Absence',
  'Grade Appeal',
  'Letter of Recommendation',
  'Enrollment Verification',
  'Other',
];

type FilterType = 'all' | 'pending' | 'completed';

export function Requests() {
  const { requests } = useStudent();
  const [filter, setFilter] = useState<FilterType>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);

  const filteredRequests = requests
    .filter(r => {
      if (filter === 'all') return true;
      if (filter === 'pending') return r.status === 'Pending';
      if (filter === 'completed') return r.status === 'Completed' || r.status === 'Rejected';
      return true;
    })
    .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'Completed':
        return { color: 'bg-emerald-50 text-emerald-600', icon: HiOutlineCheckCircle };
      case 'Pending':
        return { color: 'bg-amber-50 text-amber-600', icon: HiOutlineClock };
      case 'Rejected':
        return { color: 'bg-red-50 text-red-600', icon: HiOutlineXCircle };
      default:
        return { color: 'bg-gray-50 text-gray-600', icon: HiOutlineRefresh };
    }
  };

  const handleNewRequest = () => {
    toast.success('Request feature coming soon!', {
      style: {
        background: '#000',
        color: '#fff',
        borderRadius: '12px',
      },
    });
    setIsModalOpen(false);
  };

  const stats = {
    total: requests.length,
    pending: requests.filter(r => r.status === 'Pending').length,
    completed: requests.filter(r => r.status === 'Completed').length,
    rejected: requests.filter(r => r.status === 'Rejected').length,
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
            <h2 className="text-2xl font-bold text-black">My Requests</h2>
            <p className="text-gray-500">Track your administrative requests</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-5 py-3 bg-black text-white rounded-xl font-medium hover:bg-gray-800 transition-colors"
          >
            <HiOutlinePlus size={20} />
            New Request
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div variants={itemVariants} className="grid grid-cols-4 gap-4">
          {[
            { label: 'Total', value: stats.total, color: 'bg-gray-50' },
            { label: 'Pending', value: stats.pending, color: 'bg-amber-50' },
            { label: 'Completed', value: stats.completed, color: 'bg-emerald-50' },
            { label: 'Rejected', value: stats.rejected, color: 'bg-red-50' },
          ].map((stat) => (
            <div
              key={stat.label}
              className={`${stat.color} rounded-2xl p-5 text-center`}
            >
              <p className="text-3xl font-bold text-black">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Filters */}
        <motion.div variants={itemVariants} className="flex gap-2">
          {(['all', 'pending', 'completed'] as FilterType[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all ${
                filter === f
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </motion.div>

        {/* Requests List */}
        <div className="space-y-4">
          {filteredRequests.map((request) => {
            const statusConfig = getStatusConfig(request.status);
            const StatusIcon = statusConfig.icon;

            return (
              <motion.div
                key={request.requestId}
                variants={itemVariants}
                whileHover={{ scale: 1.01 }}
                onClick={() => setSelectedRequest(request)}
                className="bg-white/60 backdrop-blur-xl rounded-3xl p-6 border border-black/5 shadow-xl shadow-black/5 cursor-pointer transition-all"
              >
                <div className="flex items-start gap-5">
                  {/* Icon */}
                  <div className="w-14 h-14 bg-gradient-to-br from-black to-gray-700 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                    <HiOutlineDocumentText size={28} className="text-white" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <span className="text-xs font-medium text-gray-500">{request.requestId}</span>
                        <h3 className="text-lg font-semibold text-black">{request.type}</h3>
                      </div>
                      <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl ${statusConfig.color}`}>
                        <StatusIcon size={16} />
                        <span className="text-sm font-medium">{request.status}</span>
                      </div>
                    </div>

                    {/* Timeline */}
                    <div className="flex items-center gap-6 mt-4">
                      <div>
                        <p className="text-xs text-gray-400">Submitted</p>
                        <p className="text-sm font-medium text-black">{request.submittedAt}</p>
                      </div>
                      {request.resolvedAt && (
                        <div>
                          <p className="text-xs text-gray-400">Resolved</p>
                          <p className="text-sm font-medium text-black">{request.resolvedAt}</p>
                        </div>
                      )}
                    </div>

                    {request.adminNote && (
                      <div className="mt-4 p-3 bg-gray-50 rounded-xl">
                        <p className="text-xs text-gray-400 mb-1">Admin Note</p>
                        <p className="text-sm text-gray-700">{request.adminNote}</p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {filteredRequests.length === 0 && (
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center justify-center py-16 text-gray-400"
          >
            <HiOutlineClipboardCheck size={64} className="mb-4" />
            <p className="text-xl font-medium">No requests found</p>
            <p className="text-sm">Create a new request to get started</p>
          </motion.div>
        )}
      </motion.div>

      {/* New Request Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl max-w-md w-full"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <h2 className="text-xl font-bold text-black">New Request</h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <HiOutlineX size={24} />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-sm text-gray-500 mb-4">Select the type of request you want to submit:</p>
                <div className="space-y-2">
                  {REQUEST_TYPES.map((type) => (
                    <button
                      key={type}
                      onClick={handleNewRequest}
                      className="w-full p-4 text-left bg-gray-50 hover:bg-gray-100 rounded-2xl transition-colors"
                    >
                      <span className="font-medium text-black">{type}</span>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Request Detail Modal */}
      <AnimatePresence>
        {selectedRequest && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedRequest(null)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl max-w-lg w-full"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <div>
                  <p className="text-sm text-gray-500">{selectedRequest.requestId}</p>
                  <h2 className="text-xl font-bold text-black">{selectedRequest.type}</h2>
                </div>
                <button
                  onClick={() => setSelectedRequest(null)}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <HiOutlineX size={24} />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-2xl p-4">
                    <p className="text-sm text-gray-500 mb-1">Status</p>
                    <p className="font-medium text-black">{selectedRequest.status}</p>
                  </div>
                  <div className="bg-gray-50 rounded-2xl p-4">
                    <p className="text-sm text-gray-500 mb-1">Submitted</p>
                    <p className="font-medium text-black">{selectedRequest.submittedAt}</p>
                  </div>
                </div>

                {selectedRequest.resolvedAt && (
                  <div className="bg-gray-50 rounded-2xl p-4">
                    <p className="text-sm text-gray-500 mb-1">Resolved</p>
                    <p className="font-medium text-black">{selectedRequest.resolvedAt}</p>
                  </div>
                )}

                {selectedRequest.adminNote && (
                  <div className="bg-emerald-50 rounded-2xl p-4">
                    <p className="text-sm text-emerald-600 mb-1">Admin Response</p>
                    <p className="font-medium text-emerald-800">{selectedRequest.adminNote}</p>
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
