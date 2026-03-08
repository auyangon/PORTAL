// src/lib/googleSheets.ts
// COMPLETE WORKING VERSION

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwniIpgSh5bCvRMv2mGlM1KVIWj-K9RXMWwbPSLhevpobxZlueVXr2KS82izbfmy9e7OA/exec';

export interface Student {
  studentId: string;
  email: string;
  studentName: string;
  major: string;
  studyMode: string;
  status: string;
}

export interface Course {
  courseCode: string;
  courseName: string;
  credits: number;
  teacher: string;
  googleClassroomLink: string;
}

export interface Enrollment {
  studentId: string;
  courseCode: string;
  grade: string;
  semester: string;
}

export interface AttendanceSummary {
  studentId: string;
  courseCode: string;
  totalClasses: number;
  present: number;
  late: number;
  absent: number;
  attendancePercentage: number;
}

export interface Announcement {
  id: number;
  title: string;
  content: string;
  date: string;
  author: string;
  priority: string;
  category: string;
  targetCourses: string;
}

export interface StudentNotification {
  studentId: string;
  email: string;
  announcementId: number;
  read: boolean;
  readAt?: string;
}

export interface DashboardData {
  student: Student;
  courses: Course[];
  enrollments: Enrollment[];
  attendance: AttendanceSummary[];
  notifications: StudentNotification[];
  announcements: Announcement[];
  lastModified: string;
  isAdmin: boolean;
}

// Main function to fetch student data
export async function fetchStudentData(): Promise<DashboardData> {
  try {
    const response = await fetch(`${APPS_SCRIPT_URL}?action=getMyData`, {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to fetch student data');
    }
    
    return result.data;
  } catch (error) {
    console.error('Error fetching student data:', error);
    throw error;
  }
}

// Check for updates (called every 30 seconds)
export async function checkForUpdates(lastSync: string): Promise<{ needsUpdate: boolean; lastModified: string }> {
  try {
    const response = await fetch(`${APPS_SCRIPT_URL}?action=checkUpdates&lastSync=${encodeURIComponent(lastSync)}`, {
      method: 'GET',
      mode: 'cors',
      credentials: 'include'
    });
    
    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to check updates');
    }
    
    return result.data;
  } catch (error) {
    console.error('Error checking updates:', error);
    return { needsUpdate: false, lastModified: lastSync };
  }
}

// Mark announcement as read
export async function markAnnouncementAsRead(studentId: string, announcementId: number): Promise<void> {
  try {
    const response = await fetch(
      `${APPS_SCRIPT_URL}?action=markRead&studentId=${studentId}&announcementId=${announcementId}`,
      {
        method: 'POST',
        mode: 'cors',
        credentials: 'include'
      }
    );
    
    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to mark as read');
    }
  } catch (error) {
    console.error('Error marking as read:', error);
    throw error;
  }
}

// Admin function to get all data
export async function fetchAllData() {
  try {
    const response = await fetch(`${APPS_SCRIPT_URL}?action=adminGetAll`, {
      method: 'GET',
      mode: 'cors',
      credentials: 'include'
    });
    
    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to fetch all data');
    }
    
    return result.data;
  } catch (error) {
    console.error('Error fetching all data:', error);
    throw error;
  }
}