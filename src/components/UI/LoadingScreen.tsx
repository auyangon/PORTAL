import { motion } from 'framer-motion';
import { HiOutlineAcademicCap } from 'react-icons/hi';

export function LoadingScreen() {
  return (
    <div 
      className="fixed inset-0 flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0d312c 0%, #12423c 30%, #1b5f56 70%, #247d70 100%)',
      }}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.2 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
          className="absolute -top-24 -right-24 w-96 h-96 rounded-full"
          style={{ background: 'radial-gradient(circle, #66c3b7 0%, transparent 70%)' }}
        />
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.15 }}
          transition={{ duration: 2.5, repeat: Infinity, repeatType: 'reverse', delay: 0.5 }}
          className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full"
          style={{ background: 'radial-gradient(circle, #2d9a8a 0%, transparent 70%)' }}
        />
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.1 }}
          transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse', delay: 1 }}
          className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full"
          style={{ background: 'radial-gradient(circle, #33af9f 0%, transparent 70%)' }}
        />
      </div>

      <div className="relative text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <motion.div 
            className="w-24 h-24 rounded-3xl flex items-center justify-center mx-auto shadow-2xl"
            style={{ 
              background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%)',
              border: '1px solid rgba(255,255,255,0.3)',
              boxShadow: '0 24px 48px rgba(0,0,0,0.2)',
            }}
            animate={{
              boxShadow: [
                '0 24px 48px rgba(0,0,0,0.2)',
                '0 32px 64px rgba(102, 195, 183, 0.3)',
                '0 24px 48px rgba(0,0,0,0.2)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <HiOutlineAcademicCap className="w-12 h-12 text-white" />
          </motion.div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          <h1 className="text-3xl font-bold text-white">AUY</h1>
          <h2 className="text-xl font-medium text-white/80">Student Portal</h2>
          <p className="text-white/50">Loading your dashboard...</p>
          
          <div className="flex justify-center gap-3 mt-8">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.4, 1, 0.4],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
                className="w-3 h-3 rounded-full"
                style={{ background: 'linear-gradient(135deg, #66c3b7, #2d9a8a)' }}
              />
            ))}
          </div>
        </motion.div>

        {/* Animated ring */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ top: -40 }}
        >
          <motion.div
            className="w-40 h-40 rounded-full"
            style={{ 
              border: '2px solid rgba(102, 195, 183, 0.2)',
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}
