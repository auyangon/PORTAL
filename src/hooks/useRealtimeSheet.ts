// src/hooks/useRealtimeSheet.ts
import { useState, useEffect } from 'react';

const APPS_SCRIPT_URL = 'YOUR_APPS_SCRIPT_URL';

export function useRealtimeSheet() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastSync, setLastSync] = useState(new Date().toISOString());

  // Load initial data
  useEffect(() => {
    loadData();
    
    // Check for updates every 30 seconds
    const interval = setInterval(checkForUpdates, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${APPS_SCRIPT_URL}?action=getMyData`, {
        credentials: 'include'
      });
      const result = await response.json();
      
      if (result.success) {
        setData(result.data);
        setLastSync(result.data.lastModified);
      } else {
        throw new Error(result.error);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const checkForUpdates = async () => {
    try {
      const response = await fetch(
        `${APPS_SCRIPT_URL}?action=checkUpdates&lastSync=${lastSync}`,
        { credentials: 'include' }
      );
      const result = await response.json();
      
      if (result.success && result.data.needsUpdate) {
        // Sheet was modified - reload data
        loadData();
      }
    } catch (err) {
      console.error('Update check failed:', err);
    }
  };

  const markAsRead = async (announcementId) => {
    if (!data?.student) return;
    
    try {
      await fetch(
        `${APPS_SCRIPT_URL}?action=markRead&studentId=${data.student.studentId}&announcementId=${announcementId}`,
        { credentials: 'include' }
      );
      // Reload to get updated notifications
      loadData();
    } catch (err) {
      console.error('Failed to mark as read:', err);
    }
  };

  return { data, loading, error, markAsRead, refresh: loadData };
}