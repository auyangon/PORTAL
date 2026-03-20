import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import QRCode from 'qrcode.react';
import { HiOutlineRefresh, HiOutlineCheck, HiOutlineClock } from 'react-icons/hi';

interface QRGeneratorProps {
  courseCode: string;
  teacherEmail: string;
}

export function QRGenerator({ courseCode, teacherEmail }: QRGeneratorProps) {
  const [qrData, setQrData] = useState<string | null>(null);
  const [expiryTime, setExpiryTime] = useState<Date | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [checkedCount, setCheckedCount] = useState(0);

  const generateQR = async () => {
    setLoading(true);
    
    try {
      const response = await fetch('/api/qr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'createQR',
          courseCode: courseCode,
          teacherEmail: teacherEmail
        })
      });
      
      const result = await response.json();
      
      if (result.success) {
        setQrData(result.qrData);
        setExpiryTime(new Date(result.expiryTime));
      }
    } catch (error) {
      console.error('QR generation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!expiryTime) return;
    
    const timer = setInterval(() => {
      const now = new Date();
      const diff = Math.max(0, Math.floor((expiryTime.getTime() - now.getTime()) / 1000));
      setTimeLeft(diff);
      
      if (diff <= 0) {
        setQrData(null);
        setExpiryTime(null);
      }
    }, 1000);
    
    return () => clearInterval(timer);
  }, [expiryTime]);

  // Refresh checked count
  useEffect(() => {
    const loadCount = async () => {
      const response = await fetch('/api/qr?action=active&courseCode=' + courseCode);
      const data = await response.json();
      if (data.success) {
        const total = data.sessions.reduce((sum: number, s: any) => sum + (s.checkedCount || 0), 0);
        setCheckedCount(total);
      }
    };
    
    const interval = setInterval(loadCount, 5000);
    loadCount();
    
    return () => clearInterval(interval);
  }, [courseCode]);

  return (
    <div className="glass-card p-6 text-center">
      <h3 className="text-lg font-semibold mb-4" style={{ color: '#0d312c' }}>
        📱 QR Attendance
      </h3>
      
      {!qrData ? (
        <button
          onClick={generateQR}
          disabled={loading}
          className="w-full py-4 rounded-2xl text-white font-medium transition-all"
          style={{ background: 'linear-gradient(135deg, #1b5f56 0%, #247d70 100%)' }}
        >
          {loading ? 'Generating...' : '🎯 Generate QR Code'}
        </button>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-center p-4 bg-white rounded-2xl">
            <QRCode value={qrData} size={200} />
          </div>
          
          <div className="flex justify-between items-center text-sm">
            <span style={{ color: '#247d70' }}>
              <HiOutlineClock className="inline mr-1" />
              Expires in: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
            </span>
            <span style={{ color: '#10b981' }}>
              <HiOutlineCheck className="inline mr-1" />
              {checkedCount} checked in
            </span>
          </div>
          
          <div className="w-full bg-gray-200 h-2 rounded-full">
            <div 
              className="h-2 rounded-full transition-all"
              style={{ 
                width: ${(timeLeft / 120) * 100}%,
                background: timeLeft < 30 ? '#ef4444' : 'linear-gradient(90deg, #1b5f56, #247d70)'
              }}
            />
          </div>
          
          <button
            onClick={generateQR}
            className="w-full py-2 rounded-xl text-sm"
            style={{ background: 'rgba(45, 154, 138, 0.1)', color: '#1b5f56' }}
          >
            <HiOutlineRefresh className="inline mr-1" />
            Generate New QR
          </button>
        </div>
      )}
      
      <p className="text-xs mt-4" style={{ color: '#66c3b7' }}>
        QR codes expire after 2 minutes. Students scan to mark attendance.
      </p>
    </div>
  );
}
