import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HiOutlineDocumentText,
  HiOutlineClipboardList,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlineClock,
  HiOutlinePlus,
  HiOutlineMail,
  HiOutlineCalendar,
  HiOutlineUser,
  HiOutlineAcademicCap,
  HiOutlineBookOpen,
  HiOutlinePaperAirplane,
  HiOutlineBell
} from 'react-icons/hi';
import { useStudent } from '../../context/StudentContext';
import { staggerContainer, fadeInUp } from '../../utils/animations';
import { submitRequest } from '../../services/requestService';
import toast from 'react-hot-toast';

const requestTypes = [
  'Transcript Request',
  'Course Add/Drop',
  'Letter of Recommendation',
  'Grade Appeal',
  'Leave of Absence',
  'Graduation Application',
  'Financial Aid',
  'Other'
];

export function Requests() {
  const { requests, currentStudent, refreshData } = useStudent();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    type: '',
    details: ''
  });
  const [submitting, setSubmitting] = useState(false);

  // Filter requests for current student
  const studentRequests = requests.filter(r => r.email === currentStudent?.email);

  const getStatusColor = (status: string) => {
    switch(status?.toLowerCase()) {
      case 'completed':
      case 'approved':
        return { bg: 'rgba(16, 185, 129, 0.1)', text: '#10b981' };
      case 'pending':
      case 'in progress':
        return { bg: 'rgba(245, 158, 11, 0.1)', text: '#f59e0b' };
      case 'rejected':
      case 'denied':
        return { bg: 'rgba(239, 68, 68, 0.1)', text: '#ef4444' };
      default:
        return { bg: 'rgba(45, 154, 138, 0.1)', text: '#247d70' };
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status?.toLowerCase()) {
      case 'completed':
      case 'approved':
        return <HiOutlineCheckCircle className="text-lg" />;
      case 'pending':
      case 'in progress':
        return <HiOutlineClock className="text-lg" />;
      case 'rejected':
      case 'denied':
        return <HiOutlineXCircle className="text-lg" />;
      default:
        return <HiOutlineClipboardList className="text-lg" />;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.type) {
      toast.error('Please select a request type');
      return;
    }

    setSubmitting(true);
    
    try {
      const result = await submitRequest({
        type: formData.type,
        details: formData.details,
        studentEmail: currentStudent?.email || '',
        studentName: currentStudent?.studentName || '',
        studentId: currentStudent?.studentId || ''
      });

      if (result.success) {
        toast.success('Request submitted successfully! Admin has been notified.');
        setShowForm(false);
        setFormData({ type: '', details: '' });
        refreshData(); // Refresh to show new request
      } else {
        toast.error('Failed to submit request. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

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
          <h1 className="text-3xl font-semibold" style={{ color: '#0d312c' }}>Requests</h1>
          <p className="text-sm mt-1" style={{ color: '#247d70' }}>
            Submit and track your requests to the university
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowForm(!showForm)}
          className="px-6 py-3 rounded-2xl text-white font-medium flex items-center gap-2"
          style={{
            background: 'linear-gradient(135deg, #1b5f56 0%, #247d70 100%)'
          }}
        >
          <HiOutlinePlus size={20} />
          New Request
        </motion.button>
      </div>

      {/* New Request Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="glass-card p-6"
          >
            <h2 className="text-xl font-semibold mb-4" style={{ color: '#0d312c' }}>Submit New Request</h2>
            <p className="text-sm mb-6" style={{ color: '#66c3b7' }}>
              Your request will be sent to the admin office. You'll receive email updates.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#247d70' }}>
                  Request Type <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none transition-all"
                  style={{ 
                    borderColor: '#e2e8f0',
                    backgroundColor: '#f8fafc'
                  }}
                >
                  <option value="">Select request type...</option>
                  {requestTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#247d70' }}>
                  Additional Details
                </label>
                <textarea
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  rows={4}
                  placeholder="Please provide any additional information that might help process your request..."
                  className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none transition-all"
                  style={{ 
                    borderColor: '#e2e8f0',
                    backgroundColor: '#f8fafc'
                  }}
                />
              </div>

              <div className="flex items-center gap-2 sm:gap-3 md:gap-4 pt-4">
                <motion.button
                  type="submit"
                  disabled={submitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 rounded-xl text-white font-medium flex items-center gap-2 disabled:opacity-50"
                  style={{
                    background: 'linear-gradient(135deg, #1b5f56 0%, #247d70 100%)'
                  }}
                >
                  {submitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <HiOutlinePaperAirplane size={18} />
                      Submit Request
                    </>
                  )}
                </motion.button>
                
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-6 py-3 rounded-xl font-medium"
                  style={{
                    background: '#f1f5f9',
                    color: '#475569'
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>

            <div className="mt-6 p-4 rounded-xl" style={{ background: 'rgba(45, 154, 138, 0.05)' }}>
              <p className="text-xs flex items-center gap-2" style={{ color: '#247d70' }}>
                <HiOutlineBell size={14} />
                You'll receive email updates when your request status changes.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div variants={fadeInUp} className="glass-card p-6">
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                 style={{ background: 'rgba(45, 154, 138, 0.1)' }}>
              <HiOutlineClipboardList size={24} style={{ color: '#1b5f56' }} />
            </div>
            <div>
              <p className="text-sm" style={{ color: '#247d70' }}>Total Requests</p>
              <p className="text-2xl font-bold" style={{ color: '#0d312c' }}>{studentRequests.length}</p>
            </div>
          </div>
        </motion.div>

        <motion.div variants={fadeInUp} className="glass-card p-6">
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                 style={{ background: 'rgba(245, 158, 11, 0.1)' }}>
              <HiOutlineClock size={24} style={{ color: '#f59e0b' }} />
            </div>
            <div>
              <p className="text-sm" style={{ color: '#247d70' }}>Pending</p>
              <p className="text-2xl font-bold" style={{ color: '#0d312c' }}>
                {studentRequests.filter(r => r.status?.toLowerCase() === 'pending').length}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div variants={fadeInUp} className="glass-card p-6">
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                 style={{ background: 'rgba(16, 185, 129, 0.1)' }}>
              <HiOutlineCheckCircle size={24} style={{ color: '#10b981' }} />
            </div>
            <div>
              <p className="text-sm" style={{ color: '#247d70' }}>Completed</p>
              <p className="text-2xl font-bold" style={{ color: '#0d312c' }}>
                {studentRequests.filter(r => r.status?.toLowerCase() === 'completed').length}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div variants={fadeInUp} className="glass-card p-6">
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                 style={{ background: 'rgba(239, 68, 68, 0.1)' }}>
              <HiOutlineXCircle size={24} style={{ color: '#ef4444' }} />
            </div>
            <div>
              <p className="text-sm" style={{ color: '#247d70' }}>Rejected</p>
              <p className="text-2xl font-bold" style={{ color: '#0d312c' }}>
                {studentRequests.filter(r => r.status?.toLowerCase() === 'rejected').length}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Requests List */}
      <motion.div variants={fadeInUp} className="glass-card p-6">
        <h2 className="text-xl font-semibold mb-6" style={{ color: '#0d312c' }}>Your Requests</h2>
        
        {studentRequests.length === 0 ? (
          <div className="text-center py-12">
            <HiOutlineDocumentText size={48} className="mx-auto mb-4" style={{ color: '#66c3b7' }} />
            <p className="text-lg" style={{ color: '#247d70' }}>No requests yet</p>
            <p className="text-sm mt-2" style={{ color: '#66c3b7' }}>
              Click "New Request" to get started
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {studentRequests.map((request) => {
              const statusStyle = getStatusColor(request.status);
              const StatusIcon = getStatusIcon(request.status);
              
              return (
                <motion.div
                  key={request.requestId}
                  whileHover={{ scale: 1.01 }}
                  className="p-3 sm:p-4 md:p-5 rounded-2xl"
                  style={{ 
                    background: 'linear-gradient(135deg, rgba(230, 245, 243, 0.8) 0%, rgba(204, 235, 231, 0.5) 100%)',
                    border: '1px solid rgba(45, 154, 138, 0.1)'
                  }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                           style={{ background: statusStyle.bg }}>
                        <span style={{ color: statusStyle.text }}>{StatusIcon}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold" style={{ color: '#0d312c' }}>{request.type}</h3>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-xs" style={{ color: '#66c3b7' }}>
                            <HiOutlineCalendar className="inline mr-1" />
                            {new Date(request.submittedAt).toLocaleDateString()}
                          </span>
                          {request.resolvedAt && (
                            <span className="text-xs" style={{ color: '#66c3b7' }}>
                              <HiOutlineCheckCircle className="inline mr-1" />
                              Resolved: {new Date(request.resolvedAt).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1"
                          style={{ background: statusStyle.bg, color: statusStyle.text }}>
                      {StatusIcon}
                      {request.status}
                    </span>
                  </div>
                  
                  {request.details && (
                    <div className="mt-3 p-3 rounded-xl" style={{ background: 'rgba(255, 255, 255, 0.5)' }}>
                      <p className="text-sm" style={{ color: '#247d70' }}>{request.details}</p>
                    </div>
                  )}
                  
                  {request.adminNote && (
                    <div className="mt-3 text-xs p-2 rounded-lg" style={{ background: 'rgba(45, 154, 138, 0.05)' }}>
                      <span style={{ color: '#1b5f56' }}>📝 Admin note: </span>
                      <span style={{ color: '#247d70' }}>{request.adminNote}</span>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}



