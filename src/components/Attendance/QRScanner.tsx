import React from 'react';
import { HiOutlineQrcode, HiOutlineX } from 'react-icons/hi';

interface QRScannerProps {
  studentEmail: string;
  onSuccess: () => void;
  onClose: () => void;
}

export function QRScanner({ studentEmail, onSuccess, onClose }: QRScannerProps) {
  const [scanning, setScanning] = React.useState(false);

  return (
    <div className="glass-card p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-seafoam-900">
          <HiOutlineQrcode className="inline mr-2" />
          QR Attendance
        </h2>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">✕</button>
      </div>
      
      <div className="text-center py-8">
        <div className="w-48 h-48 mx-auto bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
          <HiOutlineQrcode size={64} className="text-gray-400" />
        </div>
        <p className="text-seafoam-600 mb-4">Point your camera at the QR code</p>
        <button
          onClick={() => {
            // Simulate successful scan for demo
            setTimeout(() => {
              alert('Attendance recorded! (Demo mode)');
              onSuccess();
            }, 1000);
          }}
          className="px-6 py-3 rounded-xl text-white"
          style={{ background: 'linear-gradient(135deg, #1b5f56 0%, #247d70 100%)' }}
        >
          Simulate Scan (Demo)
        </button>
      </div>
      
      <p className="text-xs text-center text-seafoam-400 mt-4">
        Ask your teacher to display the QR code
      </p>
    </div>
  );
}
