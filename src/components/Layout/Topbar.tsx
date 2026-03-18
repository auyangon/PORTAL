import { motion } from 'framer-motion';
import { HiOutlineSearch, HiOutlineBell, HiOutlineRefresh } from 'react-icons/hi';
import { useStudent } from '../../context/StudentContext';

interface TopbarProps {
  title: string;
}

export function Topbar({ title }: TopbarProps) {
  const { currentStudent, refreshData, isLoading } = useStudent();

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 right-0 left-72 z-30 h-20"
      style={{
        background: 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(45, 154, 138, 0.08)',
      }}
    >
      <div className="h-full flex items-center justify-between px-8">
        {/* Page Title */}
        <div>
          <h2 
            className="text-2xl font-semibold tracking-tight"
            style={{ color: '#0d312c' }}
          >
            {title}
          </h2>
          <p className="text-sm" style={{ color: '#1b5f56' }}>
            Welcome back, {currentStudent?.studentName?.split(' ')[0] || 'Student'}
          </p>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative">
            <HiOutlineSearch 
              className="absolute left-4 top-1/2 -translate-y-1/2" 
              style={{ color: '#247d70' }}
              size={20} 
            />
            <input
              type="text"
              placeholder="Search..."
              className="w-64 pl-11 pr-4 py-2.5 rounded-xl border-0 text-sm placeholder-opacity-60 focus:outline-none focus:ring-2 transition-all"
              style={{
                background: 'rgba(230, 245, 243, 0.8)',
                color: '#0d312c',
              }}
            />
          </div>

          {/* Refresh Button */}
          <motion.button
            onClick={refreshData}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isLoading}
            className="p-3 rounded-xl transition-all duration-300 disabled:opacity-50"
            style={{
              background: 'linear-gradient(135deg, rgba(27, 95, 86, 0.1) 0%, rgba(36, 125, 112, 0.1) 100%)',
            }}
          >
            <HiOutlineRefresh 
              size={20} 
              className={isLoading ? 'animate-spin' : ''}
              style={{ color: '#1b5f56' }}
            />
          </motion.button>

          {/* Notifications */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative p-3 rounded-xl transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, rgba(27, 95, 86, 0.1) 0%, rgba(36, 125, 112, 0.1) 100%)',
            }}
          >
            <HiOutlineBell size={20} style={{ color: '#1b5f56' }} />
            <span 
              className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full border-2 border-white"
              style={{ background: 'linear-gradient(135deg, #2d9a8a, #33af9f)' }}
            />
          </motion.button>

          {/* Profile */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-3 pl-4 cursor-pointer"
            style={{ borderLeft: '1px solid rgba(45, 154, 138, 0.15)' }}
          >
            <div className="text-right">
              <p className="text-sm font-medium" style={{ color: '#0d312c' }}>
                {currentStudent?.studentName || 'Loading...'}
              </p>
              <p className="text-xs" style={{ color: '#247d70' }}>
                {currentStudent?.studentId || ''}
              </p>
            </div>
            <div 
              className="w-10 h-10 rounded-xl overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #1b5f56 0%, #247d70 100%)',
              }}
            >
              {currentStudent?.profileImage ? (
                <img
                  src={currentStudent.profileImage}
                  alt={currentStudent.studentName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white font-medium">
                  {currentStudent?.studentName?.charAt(0) || '?'}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}
