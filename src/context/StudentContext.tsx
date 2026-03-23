import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import type {
  Course,
  Schedule,
  Material,
  Quest,
  StudentQuest,
  AppState
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
  loginWithGoogle: (email: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  getEnrolledCourses: () => Course[];
  getStudentSchedules: () => Schedule[];
  getCourseMaterials: (courseCode: string) => Material[];
  getCourseByCode: (courseCode: string) => Course | undefined;
  getQuestWithStudentData: (questId: string) => { quest: Quest; studentQuest: StudentQuest | undefined } | undefined;
}

const StudentContext = createContext<StudentContextType | null>(null);

export function StudentProvider({ children }: { children: React.ReactNode }) {
  const [studentEmail, setStudentEmail] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
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

  // Cache ref for faster subsequent loads
  const dataCache = useRef<Record<string, any>>({});

  const loginWithGoogle = async (email: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Check cache first
      if (dataCache.current[email]) {
        const cached = dataCache.current[email];
        setState(prev => ({ ...prev, ...cached, isLoading: false }));
        setStudentEmail(email);
        setIsAuthenticated(true);
        setIsLoading(false);
        return true;
      }

      const student = await fetchStudentByEmail(email);
      if (!student) {
        setIsLoading(false);
        return false;
      }
      
      setStudentEmail(email);
      setIsAuthenticated(true);
      
      await fetchAllData(email);
      return true;
    } catch (error) {
      setIsLoading(false);
      return false;
    }
  };

    const fetchAllData = useCallback(async (email: string) => {
    setIsLoading(true);
    try {
      // Fetch ALL data in parallel - much faster!
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
        fetchStudentByEmail(email),
        fetchCourses(),
        fetchEnrollmentsByEmail(email),
        fetchSchedules(),
        fetchMaterials(),
        fetchAnnouncements(),
        fetchAttendanceByEmail(email),
        fetchQuests(),
        fetchStudentQuestsByEmail(email),
        fetchRequestsByEmail(email),
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
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = () => {
    setStudentEmail(null);
    setIsAuthenticated(false);
    setIsLoading(false);
    setState({
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
      isLoading: false,
      error: null,
    });
  };

  useEffect(() => {
    if (studentEmail && isAuthenticated) {
      fetchAllData(studentEmail);
    }
  }, [studentEmail, isAuthenticated, fetchAllData]);

  useEffect(() => {
    if (!studentEmail || !isAuthenticated) return;
    
    const interval = setInterval(() => fetchAllData(studentEmail), REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, [studentEmail, isAuthenticated, fetchAllData]);

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

  const refreshData = useCallback(() => {
    if (studentEmail) {
      return fetchAllData(studentEmail);
    }
    return Promise.resolve();
  }, [studentEmail, fetchAllData]);

  const value: StudentContextType = {
    ...state,
    isLoading,
    loginWithGoogle,
    logout,
    refreshData,
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

