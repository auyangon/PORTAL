import type {
  Student, Course, Enrollment, Schedule, Material, 
  Announcement, Attendance, Quest, StudentQuest, Request
} from '../types';
import { CONFIG, SHEET_NAMES } from '../config';

type SheetName = keyof typeof SHEET_NAMES;

async function fetchSheet<T>(sheet: SheetName): Promise<T[]> {
  try {
    const url = ${CONFIG.API_BASE_URL}?sheet=;
    const response = await fetch(url);
    if (!response.ok) throw new Error(HTTP );
    const data = await response.json();
    return data as T[];
  } catch (error) {
    console.error(Failed to fetch :, error);
    return [];
  }
}

export const fetchStudents = () => fetchSheet<Student>('Students');
export const fetchStudentByEmail = async (email: string) => {
  const students = await fetchStudents();
  return students.find(s => s.email === email) || null;
};
export const fetchCourses = () => fetchSheet<Course>('Courses');
export const fetchEnrollments = () => fetchSheet<Enrollment>('Enrollments');
export const fetchEnrollmentsByEmail = async (email: string) => {
  const enrollments = await fetchEnrollments();
  return enrollments.filter(e => e.email === email);
};
export const fetchSchedules = () => fetchSheet<Schedule>('Schedule');
export const fetchMaterials = () => fetchSheet<Material>('Materials');
export const fetchAnnouncements = () => fetchSheet<Announcement>('Announcements');
export const fetchAttendance = () => fetchSheet<Attendance>('Attendance');
export const fetchAttendanceByEmail = async (email: string) => {
  const attendance = await fetchAttendance();
  return attendance.filter(a => a.email === email);
};
export const fetchQuests = () => fetchSheet<Quest>('Quests');
export const fetchStudentQuests = () => fetchSheet<StudentQuest>('StudentQuests');
export const fetchStudentQuestsByEmail = async (email: string) => {
  const studentQuests = await fetchStudentQuests();
  return studentQuests.filter(sq => sq.email === email);
};
export const fetchRequests = () => fetchSheet<Request>('Requests');
export const fetchRequestsByEmail = async (email: string) => {
  const requests = await fetchRequests();
  return requests.filter(r => r.email === email);
};

export const REFRESH_INTERVAL = CONFIG.REFRESH_INTERVAL;
