// src/components/SyncStatus.tsx
interface SyncStatusProps {
  darkMode: boolean;
  onSync: () => void;
}

export default function SyncStatus({ darkMode, onSync }: SyncStatusProps) {
  return (
    <div className={`${darkMode ? 'bg-green-900 bg-opacity-30 border-green-500' : 'bg-green-50 border-green-300'} border rounded-2xl p-4 mb-6`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
          <div>
            <p className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              👑 Admin Mode - Real-time Sync Active
            </p>
            <p className="text-xs text-gray-500">
              Changes in Google Sheet appear automatically every 30 seconds
            </p>
          </div>
        </div>

        <button
          onClick={onSync}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            darkMode 
              ? 'bg-gray-700 hover:bg-gray-600 text-white' 
              : 'bg-white hover:bg-gray-100 text-gray-900'
          } shadow-md hover:shadow-lg transform hover:scale-105`}
        >
          🔄 Sync Now
        </button>
      </div>
    </div>
  );
}