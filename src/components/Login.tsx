import React from 'react';
import { motion } from 'framer-motion';
import { HiOutlineAcademicCap } from 'react-icons/hi';
import { GoogleLogin } from '@react-oauth/google';
import { useStudent } from '../context/StudentContext';
import { decodeGoogleCredential } from '../services/googleAuth';

export function Login() {
  const { loginWithGoogle } = useStudent();

  return (
    <div className="min-h-screen flex items-center justify-center p-4"
         style={{ background: 'linear-gradient(135deg, #0d312c 0%, #1b5f56 100%)' }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="inline-flex p-4 rounded-3xl bg-white/10 backdrop-blur-xl mb-4">
            <HiOutlineAcademicCap size={48} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">AUY Student Portal</h1>
          <p className="text-white/70 mt-2">American University of Yangon</p>
        </div>

        <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl">
          <h2 className="text-2xl font-semibold mb-6 text-center" style={{ color: '#0d312c' }}>
            Sign in with Google
          </h2>
          
          <GoogleLogin
            onSuccess={async (credentialResponse) => {
              if (credentialResponse.credential) {
                const user = decodeGoogleCredential(credentialResponse.credential);
                if (user?.email) {
                  await loginWithGoogle(user.email);
                }
              }
            }}
            onError={() => {
              console.error('Google Login Failed');
            }}
            theme="outline"
            size="large"
            text="continue_with"
            shape="rectangular"
            width="100%"
          />

          <div className="mt-6 text-center">
            <p className="text-sm" style={{ color: '#66c3b7' }}>
              Use your Google account to access your dashboard
            </p>
            <p className="text-xs mt-4 text-white/50">
              Students: offiaung8@gmail.com, akmkyawminn@gmail.com, ...
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
