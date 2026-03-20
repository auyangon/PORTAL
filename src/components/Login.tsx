import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GoogleLogin } from '@react-oauth/google';
import { 
  HiOutlineAcademicCap, 
  HiOutlineSparkles, 
  HiOutlineBookOpen
} from 'react-icons/hi';
import { useStudent } from '../context/StudentContext';
import { decodeGoogleCredential } from '../services/googleAuth';

// 🌟 Daily Motivational Quotes
const QUOTES = [
  {
    text: "Education is the most powerful weapon which you can use to change the world.",
    author: "Nelson Mandela"
  },
  {
    text: "The beautiful thing about learning is that no one can take it away from you.",
    author: "B.B. King"
  },
  {
    text: "Education is not preparation for life; education is life itself.",
    author: "John Dewey"
  },
  {
    text: "The more that you read, the more things you will know. The more that you learn, the more places you'll go.",
    author: "Dr. Seuss"
  },
  {
    text: "Live as if you were to die tomorrow. Learn as if you were to live forever.",
    author: "Mahatma Gandhi"
  },
  {
    text: "The expert in anything was once a beginner.",
    author: "Helen Hayes"
  },
  {
    text: "Your education is a dress rehearsal for a life that is yours to lead.",
    author: "Nora Ephron"
  },
  {
    text: "The roots of education are bitter, but the fruit is sweet.",
    author: "Aristotle"
  },
  {
    text: "Education is the passport to the future, for tomorrow belongs to those who prepare for it today.",
    author: "Malcolm X"
  },
  {
    text: "The purpose of education is to replace an empty mind with an open one.",
    author: "Malcolm Forbes"
  },
  {
    text: "Learning is not attained by chance, it must be sought for with ardor and attended to with diligence.",
    author: "Abigail Adams"
  },
  {
    text: "The capacity to learn is a gift; the ability to learn is a skill; the willingness to learn is a choice.",
    author: "Brian Herbert"
  },
  {
    text: "Education is not the filling of a pail, but the lighting of a fire.",
    author: "W.B. Yeats"
  },
  {
    text: "Change is the end result of all true learning.",
    author: "Leo Buscaglia"
  },
  {
    text: "The mind is not a vessel to be filled, but a fire to be kindled.",
    author: "Plutarch"
  }
];

// Get quote of the day based on date
const getQuoteOfTheDay = () => {
  const today = new Date();
  const start = new Date(today.getFullYear(), 0, 0);
  const diff = today.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  
  // Use day of year to select quote (ensures same quote all day)
  return QUOTES[dayOfYear % QUOTES.length];
};

export function Login() {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const { loginWithGoogle } = useStudent();
  
  // Get today's quote
  const quoteOfTheDay = getQuoteOfTheDay();

  // Live greeting based on time
  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  // Format date nicely
  const formatDate = () => {
    return currentTime.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Update clock
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleGoogleSuccess = async (credentialResponse: any) => {
    if (credentialResponse.credential) {
      setIsLoading(true);
      try {
        const user = decodeGoogleCredential(credentialResponse.credential);
        if (user?.email) {
          const success = await loginWithGoogle(user.email);
          if (!success) {
            setError('Email not found in our system. Please use your AUY email.');
          }
        }
      } catch (err) {
        setError('Google login failed. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleGoogleError = () => {
    setError('Google login failed. Please try again.');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
         style={{ 
           background: 'linear-gradient(135deg, #0a2e28 0%, #1b5f56 50%, #2d7a6c 100%)'
         }}>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Circles */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-20 w-64 h-64 rounded-full opacity-20"
          style={{ 
            background: 'radial-gradient(circle, #66c3b7 0%, transparent 70%)',
            filter: 'blur(40px)'
          }}
        />
        
        <motion.div
          animate={{
            y: [0, 30, 0],
            x: [0, -20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-20 right-20 w-96 h-96 rounded-full opacity-30"
          style={{ 
            background: 'radial-gradient(circle, #2d9a8a 0%, transparent 70%)',
            filter: 'blur(60px)'
          }}
        />
        
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 45, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-10"
          style={{ 
            background: 'radial-gradient(circle, #ffffff 0%, transparent 70%)',
            filter: 'blur(80px)'
          }}
        />

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5"
             style={{
               backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
               backgroundSize: '50px 50px'
             }}
        />
      </div>

      {/* Main Content */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-6xl relative z-10"
      >
        <div className="grid md:grid-cols-2 gap-8 items-center">
          
          {/* Left Side - Motivational Quote Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="hidden md:block"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="glass-card p-10 relative overflow-hidden"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}
            >
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 opacity-20">
                <svg viewBox="0 0 100 100" fill="white">
                  <path d="M20,80 L50,20 L80,80 Z" />
                </svg>
              </div>
              
              <div className="relative z-10">
                {/* Animated Sparkles */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-10 -left-10 w-20 h-20 opacity-30"
                >
                  <HiOutlineSparkles size={80} className="text-white" />
                </motion.div>

                {/* University Name */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mb-8"
                >
                  <h2 className="text-4xl font-bold text-white mb-2">AUY</h2>
                  <p className="text-white/80 text-lg">American University of Yangon</p>
                </motion.div>

                {/* Daily Quote */}
                <motion.div
                  key={quoteOfTheDay.text}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="mb-8"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="text-6xl text-white/30">"</div>
                    <p className="text-white/90 text-xl italic leading-relaxed">
                      {quoteOfTheDay.text}
                    </p>
                    <div className="text-6xl text-white/30 self-end">"</div>
                  </div>
                  <p className="text-white/60 text-right text-lg">
                    — {quoteOfTheDay.author}
                  </p>
                </motion.div>

                {/* Daily Inspiration Badge */}
                <motion.div
                  animate={{ 
                    boxShadow: ['0 0 0 0 rgba(102, 195, 183, 0.4)', '0 0 0 10px rgba(102, 195, 183, 0)']
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
                  style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                >
                  <HiOutlineSparkles className="text-yellow-300" />
                  <span className="text-white/90 text-sm">Quote of the Day</span>
                </motion.div>

                {/* Stats */}
                <div className="mt-12 grid grid-cols-2 gap-4">
                  <div className="text-center p-4 rounded-2xl" style={{ background: 'rgba(255, 255, 255, 0.05)' }}>
                    <p className="text-2xl font-bold text-white">50+</p>
                    <p className="text-white/60 text-sm">Courses</p>
                  </div>
                  <div className="text-center p-4 rounded-2xl" style={{ background: 'rgba(255, 255, 255, 0.05)' }}>
                    <p className="text-2xl font-bold text-white">500+</p>
                    <p className="text-white/60 text-sm">Students</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Google Login Only */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="glass-card p-8 md:p-10 relative overflow-hidden"
              style={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)'
              }}
            >
              {/* Decorative Header */}
              <div className="absolute top-0 left-0 w-full h-2"
                   style={{ background: 'linear-gradient(90deg, #1b5f56, #2d9a8a, #66c3b7)' }} />
              
              {/* Logo and Greeting */}
              <div className="text-center mb-8">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="inline-flex p-4 rounded-3xl mb-4"
                  style={{ 
                    background: 'linear-gradient(135deg, #1b5f56 0%, #247d70 100%)',
                    boxShadow: '0 10px 30px -10px #1b5f56'
                  }}
                >
                  <HiOutlineAcademicCap size={48} className="text-white" />
                </motion.div>
                
                <motion.h1 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-3xl font-bold mb-2"
                  style={{ color: '#0d312c' }}
                >
                  {getGreeting()}!
                </motion.h1>
                
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-sm"
                  style={{ color: '#66c3b7' }}
                >
                  {formatDate()}
                </motion.p>
              </div>

              {/* Google Login Button - Centered */}
              <div className="flex flex-col items-center justify-center py-8">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 }}
                  className="w-full max-w-sm mx-auto"
                >
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={handleGoogleError}
                    theme="outline"
                    size="large"
                    text="signin_with"
                    shape="rectangular"
                    width="100%"
                  />
                </motion.div>

                {/* Error Message */}
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 text-sm text-red-500 text-center"
                  >
                    {error}
                  </motion.p>
                )}

                {/* Quick tip */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="mt-8 p-4 rounded-2xl w-full"
                  style={{ background: 'rgba(45, 154, 138, 0.05)' }}
                >
                  <p className="text-xs flex items-center justify-center gap-2" style={{ color: '#247d70' }}>
                    <HiOutlineBookOpen size={14} />
                    <span>Sign in with your Google account to access the portal</span>
                  </p>
                </motion.div>
              </div>

              {/* Decorative Footer */}
              <div className="absolute bottom-0 right-0 w-32 h-32 opacity-5">
                <HiOutlineAcademicCap size={128} />
              </div>
            </motion.div>

            {/* Mobile Quote (only shows on mobile) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 md:hidden text-center p-4 rounded-2xl"
              style={{ background: 'rgba(255, 255, 255, 0.1)' }}
            >
              <p className="text-white/90 text-sm italic mb-2">"{quoteOfTheDay.text}"</p>
              <p className="text-white/60 text-xs">— {quoteOfTheDay.author}</p>
            </motion.div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-8 text-white/50 text-xs"
        >
          <p>© {new Date().getFullYear()} American University of Yangon. All rights reserved.</p>
        </motion.div>
      </motion.div>
    </div>
  );
}
