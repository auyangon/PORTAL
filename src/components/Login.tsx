import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineMail, HiOutlineLock, HiOutlineAcademicCap } from 'react-icons/hi';
import { useStudent } from '../context/StudentContext';

export function Login() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useStudent();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const success = await login(email);
      if (!success) {
        setError('Email not found. Please use your AUY email.');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4"
         style={{ background: 'linear-gradient(135deg, #0d312c 0%, #1b5f56 100%)' }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* AUY Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex p-4 rounded-3xl bg-white/10 backdrop-blur-xl mb-4">
            <HiOutlineAcademicCap size={48} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">AUY Student Portal</h1>
          <p className="text-white/70 mt-2">American University of Yangon</p>
        </div>

        {/* Login Card */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl">
          <h2 className="text-2xl font-semibold mb-6" style={{ color: '#0d312c' }}>Welcome Back</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#1b5f56' }}>
                AUY Email Address
              </label>
              <div className="relative">
                <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2" size={20} style={{ color: '#66c3b7' }} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@auy.edu.mm"
                  className="w-full pl-12 pr-4 py-3 rounded-2xl border-2 focus:outline-none transition-all"
                  style={{ 
                    borderColor: error ? '#ef4444' : '#e2e8f0',
                    backgroundColor: '#f8fafc'
                  }}
                  required
                />
              </div>
              {error && (
                <p className="mt-2 text-sm text-red-500">{error}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 rounded-2xl font-medium text-white transition-all transform hover:scale-[1.02] disabled:opacity-50"
              style={{
                background: 'linear-gradient(135deg, #1b5f56 0%, #247d70 100%)'
              }}
            >
              {isLoading ? 'Logging in...' : 'Continue to Portal'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm" style={{ color: '#66c3b7' }}>
              Use your AUY email address to access your dashboard
            </p>
          </div>
        </div>

        {/* Student List Hint */}
        <div className="mt-6 text-center">
          <p className="text-sm text-white/50">
            Available students: offiaung8@gmail.com, akmkyawminn@gmail.com, ll8084204@gmail.com, ...
          </p>
        </div>
      </motion.div>
    </div>
  );
}