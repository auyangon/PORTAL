import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleWixCallback } from '../services/wixAuth';

export function LoginCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const completeLogin = async () => {
      try {
        await handleWixCallback();
        navigate('/dashboard');
      } catch (error) {
        console.error('Login failed:', error);
        navigate('/?error=login_failed');
      }
    };
    
    completeLogin();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl mb-4">Completing login...</h2>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-seafoam-600 mx-auto"></div>
      </div>
    </div>
  );
}
