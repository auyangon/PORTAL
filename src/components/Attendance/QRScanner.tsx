import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HiOutlineQrcode, 
  HiOutlineCheckCircle, 
  HiOutlineXCircle,
  HiOutlineClock,
  HiOutlineLocationMarker
} from 'react-icons/hi';

interface QRScannerProps {
  studentEmail: string;
  onSuccess?: () => void;
  onClose?: () => void;
}

export function QRScanner({ studentEmail, onSuccess, onClose }: QRScannerProps) {
  const [scanning, setScanning] = useState(false);
  const [qrData, setQrData] = useState('');
  const [status, setStatus] = useState<'idle' | 'scanning' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [activeSessions, setActiveSessions] = useState<any[]>([]);

  // Load active sessions
  useEffect(() => {
    const loadSessions = async () => {
      const response = await fetch('/api/qr?action=active');
      const data = await response.json();
      if (data.success) {
        setActiveSessions(data.sessions);
      }
    };
    loadSessions();
  }, []);

  const handleScan = async (scannedData: string) => {
    setQrData(scannedData);
    setStatus('scanning');
    
    try {
      const response = await fetch('/api/qr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'checkin',
          studentEmail: studentEmail,
          qrData: scannedData
        })
      });
      
      const result = await response.json();
      
      if (result.success) {
        setStatus('success');
        setMessage(result.message);
        setTimeout(() => {
          if (onSuccess) onSuccess();
        }, 2000);
      } else {
        setStatus('error');
        setMessage(result.message);
      }
    } catch (error) {
      setStatus('error');
      setMessage('Network error. Please try again.');
    }
  };

  // QR Reader component (simplified - you'll need html5-qrcode)
  const startScanner = () => {
    setScanning(true);
    setStatus('idle');
    
    // Initialize QR scanner (using html5-qrcode)
    if (typeof window !== 'undefined') {
      import('html5-qrcode').then(({ Html5QrcodeScanner }) => {
        const scanner = new Html5QrcodeScanner('qr-reader', {
          fps: 10,
          qrbox: { width: 250, height: 250 }
        });
        
        scanner.render(
          (decodedText) => {
            scanner.clear();
            handleScan(decodedText);
          },
          (error) => {
            console.error('Scan error:', error);
          }
        );
      });
    }
  };

  return (
    <div className="glass-card p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold" style={{ color: '#0d312c' }}>
          <HiOutlineQrcode className="inline mr-2" />
          QR Attendance
        </h2>
        {onClose && (
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">✕</button>
        )}
      </div>
      
      {!scanning ? (
        <div className="space-y-4">
          {/* Active Sessions Info */}
          {activeSessions.length > 0 && (
            <div className="p-3 rounded-xl" style={{ background: 'rgba(45, 154, 138, 0.05)' }}>
              <p className="text-sm font-medium mb-2" style={{ color: '#247d70' }}>
                Active QR Sessions:
              </p>
              {activeSessions.map(session => (
                <div key={session.sessionId} className="flex justify-between text-sm py-1">
                  <span style={{ color: '#0d312c' }}>{session.courseCode}</span>
                  <span style={{ color: '#66c3b7' }}>
                    <HiOutlineClock className="inline mr-1" size={14} />
                    {Math.floor(session.timeLeft / 60)}:{String(session.timeLeft % 60).padStart(2, '0')}
                  </span>
                </div>
              ))}
            </div>
          )}
          
          <button
            onClick={startScanner}
            className="w-full py-4 rounded-2xl text-white font-medium transition-all"
            style={{ background: 'linear-gradient(135deg, #1b5f56 0%, #247d70 100%)' }}
          >
            📸 Scan QR Code
          </button>
          
          <p className="text-xs text-center" style={{ color: '#66c3b7' }}>
            Point your camera at the QR code displayed by your teacher
          </p>
        </div>
      ) : (
        <div>
          <div id="qr-reader" className="w-full mb-4"></div>
          
          <AnimatePresence>
            {status === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl text-center"
                style={{ background: 'rgba(16, 185, 129, 0.1)' }}
              >
                <HiOutlineCheckCircle size={32} className="mx-auto mb-2" style={{ color: '#10b981' }} />
                <p style={{ color: '#10b981' }}>{message}</p>
              </motion.div>
            )}
            
            {status === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl text-center"
                style={{ background: 'rgba(239, 68, 68, 0.1)' }}
              >
                <HiOutlineXCircle size={32} className="mx-auto mb-2" style={{ color: '#ef4444' }} />
                <p style={{ color: '#ef4444' }}>{message}</p>
                <button
                  onClick={() => setScanning(false)}
                  className="mt-3 px-4 py-2 rounded-xl text-sm"
                  style={{ background: '#ef4444', color: 'white' }}
                >
                  Try Again
                </button>
              </motion.div>
            )}
          </AnimatePresence>
          
          {status === 'idle' && (
            <button
              onClick={() => setScanning(false)}
              className="mt-4 text-sm text-gray-500 underline"
            >
              Cancel
            </button>
          )}
        </div>
      )}
    </div>
  );
}
