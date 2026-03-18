import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type {
  Course,
  Schedule,
  Material,
  Quest,
  StudentQuest,
  AppState,
} from '../types';
import {
  fetchStudentByEmail,
  fetchCourses,
  fetchEnrollmentsByEmail,
  fetchSchedules,
  fetchMaterials,
  fetchAnnouncements,
  fetchAttendanceByEmail,
  fetchQuests,
  fetchStudentQuestsByEmail,
  fetchRequestsByEmail,
  REFRESH_INTERVAL,
} from '../services/api';

interface StudentContextType extends AppState {
  refreshData: () => Promise<void>;
  setStudentEmail: (email: string) => void;
  getEnrolledCourses: () => Course[];
  getStudentSchedules: () => Schedule[];
  getCourseMaterials: (courseCode: string) => Material[];
  getCourseByCode: (courseCode: string) => Course | undefined;
  getQuestWithStudentData: (questId: string) => { quest: Quest; studentQuest: StudentQuest | undefined } | undefined;
}

const StudentContext = createContext<StudentContextType | null>(null);

// Demo student email
const DEFAULT_STUDENT_EMAIL = 'john.doe@auy.edu.mm';

export function StudentProvider({ children }: { children: React.ReactNode }) {
  const [studentEmail, setStudentEmail] = useState<string>(DEFAULT_STUDENT_EMAIL);
  const [state, setState] = useState<AppState>({
    currentStudent: null,
    enrollments: [],
    courses: [],
    schedules: [],
    materials: [],
    announcements: [],
    attendance: [],
    quests: [],
    studentQuests: [],
    requests: [],
    isLoading: true,
    error: null,
  });

  const fetchAllData = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));

      const [
        student,
        courses,
        enrollments,
        schedules,
        materials,
        announcements,
        attendance,
        quests,
        studentQuests,
        requests,
      ] = await Promise.all([
        fetchStudentByEmail(studentEmail),
        fetchCourses(),
        fetchEnrollmentsByEmail(studentEmail),
        fetchSchedules(),
        fetchMaterials(),
        fetchAnnouncements(),
        fetchAttendanceByEmail(studentEmail),
        fetchQuests(),
        fetchStudentQuestsByEmail(studentEmail),
        fetchRequestsByEmail(studentEmail),
      ]);

      setState({
        currentStudent: student,
        courses,
        enrollments,
        schedules,
        materials,
        announcements,
        attendance,
        quests,
        studentQuests,
        requests,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch data',
      }));
    }
  }, [studentEmail]);

  // Initial fetch
  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  // Polling refresh every 60 seconds
  useEffect(() => {
    const interval = setInterval(fetchAllData, REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchAllData]);

  // Helper functions
  const getEnrolledCourses = useCallback((): Course[] => {
    const enrolledCourseCodes = state.enrollments.map(e => e.courseCode);
    return state.courses.filter(c => enrolledCourseCodes.includes(c.courseCode));
  }, [state.enrollments, state.courses]);

  const getStudentSchedules = useCallback((): Schedule[] => {
    const enrolledCourseCodes = state.enrollments.map(e => e.courseCode);
    return state.schedules.filter(s => enrolledCourseCodes.includes(s.courseCode));
  }, [state.enrollments, state.schedules]);

  const getCourseMaterials = useCallback((courseCode: string): Material[] => {
    return state.materials.filter(m => m.courseCode === courseCode);
  }, [state.materials]);

  const getCourseByCode = useCallback((courseCode: string): Course | undefined => {
    return state.courses.find(c => c.courseCode === courseCode);
  }, [state.courses]);

  const getQuestWithStudentData = useCallback((questId: string) => {
    const quest = state.quests.find(q => q.questId === questId);
    if (!quest) return undefined;
    const studentQuest = state.studentQuests.find(sq => sq.questId === questId);
    return { quest, studentQuest };
  }, [state.quests, state.studentQuests]);

  const value: StudentContextType = {
    ...state,
    refreshData: fetchAllData,
    setStudentEmail,
    getEnrolledCourses,
    getStudentSchedules,
    getCourseMaterials,
    getCourseByCode,
    getQuestWithStudentData,
  };

  return (
    <StudentContext.Provider value={value}>
      {children}
    </StudentContext.Provider>
  );
}

export function useStudent() {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error('useStudent must be used within a StudentProvider');
  }
  return context;
}
