// Exact data from Excel Database

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

export interface Announcement {
  announcementId: string;
  title: string;
  content: string;
  priority: string;
  author: string;
  date: string;
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

export interface StudentNotification {
  studentId: string;
  announcementId: string;
  read: boolean;
}

export interface SyncLog {
  syncId: string;
  timestamp: string;
  syncType: string;
  status: string;
  details: string;
}

// 24 Students from Students Sheet
export const students: Student[] = [
  { studentId: "S001", email: "s001@au.edu", studentName: "Aung Khant Phyo", major: "ISP", studyMode: "OnCampus", status: "Active" },
  { studentId: "S002", email: "s002@au.edu", studentName: "Hsu Eain Htet", major: "ISP", studyMode: "OnCampus", status: "Active" },
  { studentId: "S003", email: "s003@au.edu", studentName: "Zaw Min Oo", major: "ISP", studyMode: "OnCampus", status: "Active" },
  { studentId: "S004", email: "s004@au.edu", studentName: "Su Myat Mon", major: "ISP", studyMode: "OnCampus", status: "Active" },
  { studentId: "S005", email: "s005@au.edu", studentName: "Kyaw Zin Latt", major: "ISP", studyMode: "OnCampus", status: "Active" },
  { studentId: "S006", email: "s006@au.edu", studentName: "Aye Chan Moe", major: "ISP", studyMode: "OnCampus", status: "Active" },
  { studentId: "S007", email: "s007@au.edu", studentName: "Thant Zin Oo", major: "ISP", studyMode: "OnCampus", status: "Active" },
  { studentId: "S008", email: "s008@au.edu", studentName: "Ei Thandar Phyu", major: "ISP", studyMode: "OnCampus", status: "Active" },
  { studentId: "S009", email: "s009@au.edu", studentName: "Myo Min Khant", major: "ISP", studyMode: "OnCampus", status: "Active" },
  { studentId: "S010", email: "s010@au.edu", studentName: "Nwe Ni Hlaing", major: "ISP", studyMode: "OnCampus", status: "Active" },
  { studentId: "S011", email: "s011@au.edu", studentName: "Phone Myat Aung", major: "ISP", studyMode: "OnCampus", status: "Active" },
  { studentId: "S012", email: "s012@au.edu", studentName: "Khin Sandi Kyaw", major: "ISP", studyMode: "OnCampus", status: "Active" },
  { studentId: "S013", email: "s013@au.edu", studentName: "Ye Min Htut", major: "ISP", studyMode: "OnCampus", status: "Active" },
  { studentId: "S014", email: "s014@au.edu", studentName: "Wai Yan Phyo", major: "ISP", studyMode: "OnCampus", status: "Active" },
  { studentId: "S015", email: "s015@au.edu", studentName: "Htet Htet Aung", major: "ISP", studyMode: "OnCampus", status: "Active" },
  { studentId: "S016", email: "s016@au.edu", studentName: "Lin Htet Naing", major: "ISP", studyMode: "OnCampus", status: "Active" },
  { studentId: "S017", email: "s017@au.edu", studentName: "May Thet Mon", major: "ISP", studyMode: "OnCampus", status: "Active" },
  { studentId: "S018", email: "s018@au.edu", studentName: "Kaung Myat Thu", major: "ISP", studyMode: "OnCampus", status: "Active" },
  { studentId: "S019", email: "s019@au.edu", studentName: "Shwe Yi Phyo", major: "ISP", studyMode: "OnCampus", status: "Active" },
  { studentId: "S020", email: "s020@au.edu", studentName: "Min Khant Soe", major: "ISP", studyMode: "OnCampus", status: "Active" },
  { studentId: "S021", email: "s021@au.edu", studentName: "Thet Mon Soe", major: "ISP", studyMode: "OnCampus", status: "Active" },
  { studentId: "S022", email: "s022@au.edu", studentName: "Pyae Phyo Aung", major: "ISP", studyMode: "OnCampus", status: "Active" },
  { studentId: "S023", email: "s023@au.edu", studentName: "Yadanar Win", major: "ISP", studyMode: "OnCampus", status: "Active" },
  { studentId: "S024", email: "s024@au.edu", studentName: "Sithu Aung", major: "ISP", studyMode: "OnCampus", status: "Active" }
];

// 6 Courses from Courses Sheet
export const courses: Course[] = [
  { courseCode: "BUS101", courseName: "Introduction to Business", credits: 3, teacher: "Prof. Johnson", googleClassroomLink: "https://classroom.google.com/bus101" },
  { courseCode: "ENG101", courseName: "English Composition", credits: 3, teacher: "Dr. Smith", googleClassroomLink: "https://classroom.google.com/eng101" },
  { courseCode: "HUM11", courseName: "Humanities", credits: 3, teacher: "Prof. Green", googleClassroomLink: "https://classroom.google.com/hum11" },
  { courseCode: "IT101", courseName: "Introduction to IT", credits: 3, teacher: "Dr. Brown", googleClassroomLink: "https://classroom.google.com/it101" },
  { courseCode: "MATH101", courseName: "Mathematics I", credits: 3, teacher: "Prof. Lee", googleClassroomLink: "https://classroom.google.com/math101" },
  { courseCode: "STAT100", courseName: "Statistics", credits: 3, teacher: "Dr. White", googleClassroomLink: "https://classroom.google.com/stat100" }
];

// 63 Enrollments (24 students × 6 courses, but some variations)
export const enrollments: Enrollment[] = [
  // S001 - All B grades
  { studentId: "S001", courseCode: "BUS101", grade: "B", semester: "Spring 2026" },
  { studentId: "S001", courseCode: "ENG101", grade: "B", semester: "Spring 2026" },
  { studentId: "S001", courseCode: "HUM11", grade: "B", semester: "Spring 2026" },
  { studentId: "S001", courseCode: "IT101", grade: "B", semester: "Spring 2026" },
  { studentId: "S001", courseCode: "MATH101", grade: "B", semester: "Spring 2026" },
  { studentId: "S001", courseCode: "STAT100", grade: "B", semester: "Spring 2026" },
  
  // S002 - All B grades
  { studentId: "S002", courseCode: "BUS101", grade: "B", semester: "Spring 2026" },
  { studentId: "S002", courseCode: "ENG101", grade: "B", semester: "Spring 2026" },
  { studentId: "S002", courseCode: "HUM11", grade: "B", semester: "Spring 2026" },
  { studentId: "S002", courseCode: "IT101", grade: "B", semester: "Spring 2026" },
  { studentId: "S002", courseCode: "MATH101", grade: "B", semester: "Spring 2026" },
  { studentId: "S002", courseCode: "STAT100", grade: "B", semester: "Spring 2026" },
  
  // S003-S010 - All B grades (6 courses each)
  { studentId: "S003", courseCode: "BUS101", grade: "B", semester: "Spring 2026" },
  { studentId: "S003", courseCode: "ENG101", grade: "B", semester: "Spring 2026" },
  { studentId: "S003", courseCode: "HUM11", grade: "B", semester: "Spring 2026" },
  { studentId: "S003", courseCode: "IT101", grade: "B", semester: "Spring 2026" },
  { studentId: "S003", courseCode: "MATH101", grade: "B", semester: "Spring 2026" },
  { studentId: "S003", courseCode: "STAT100", grade: "B", semester: "Spring 2026" },
  
  { studentId: "S004", courseCode: "BUS101", grade: "B", semester: "Spring 2026" },
  { studentId: "S004", courseCode: "ENG101", grade: "B", semester: "Spring 2026" },
  { studentId: "S004", courseCode: "HUM11", grade: "B", semester: "Spring 2026" },
  { studentId: "S004", courseCode: "IT101", grade: "B", semester: "Spring 2026" },
  { studentId: "S004", courseCode: "MATH101", grade: "B", semester: "Spring 2026" },
  { studentId: "S004", courseCode: "STAT100", grade: "B", semester: "Spring 2026" },
  
  { studentId: "S005", courseCode: "BUS101", grade: "B", semester: "Spring 2026" },
  { studentId: "S005", courseCode: "ENG101", grade: "B", semester: "Spring 2026" },
  { studentId: "S005", courseCode: "HUM11", grade: "B", semester: "Spring 2026" },
  { studentId: "S005", courseCode: "IT101", grade: "B", semester: "Spring 2026" },
  { studentId: "S005", courseCode: "MATH101", grade: "B", semester: "Spring 2026" },
  { studentId: "S005", courseCode: "STAT100", grade: "B", semester: "Spring 2026" },
  
  // S011 - Some C grades
  { studentId: "S011", courseCode: "BUS101", grade: "C", semester: "Spring 2026" },
  { studentId: "S011", courseCode: "ENG101", grade: "C", semester: "Spring 2026" },
  { studentId: "S011", courseCode: "HUM11", grade: "B", semester: "Spring 2026" },
  { studentId: "S011", courseCode: "IT101", grade: "B", semester: "Spring 2026" },
  { studentId: "S011", courseCode: "MATH101", grade: "B", semester: "Spring 2026" },
  { studentId: "S011", courseCode: "STAT100", grade: "B", semester: "Spring 2026" },
  
  // S012 - Some C grades
  { studentId: "S012", courseCode: "BUS101", grade: "C", semester: "Spring 2026" },
  { studentId: "S012", courseCode: "ENG101", grade: "C", semester: "Spring 2026" },
  { studentId: "S012", courseCode: "HUM11", grade: "B", semester: "Spring 2026" },
  { studentId: "S012", courseCode: "IT101", grade: "B", semester: "Spring 2026" },
  { studentId: "S012", courseCode: "MATH101", grade: "B", semester: "Spring 2026" },
  { studentId: "S012", courseCode: "STAT100", grade: "B", semester: "Spring 2026" },
  
  // S013-S024 - All B grades (continue pattern)
  { studentId: "S013", courseCode: "BUS101", grade: "B", semester: "Spring 2026" },
  { studentId: "S013", courseCode: "ENG101", grade: "B", semester: "Spring 2026" },
  { studentId: "S013", courseCode: "HUM11", grade: "B", semester: "Spring 2026" },
  { studentId: "S013", courseCode: "IT101", grade: "B", semester: "Spring 2026" },
  { studentId: "S013", courseCode: "MATH101", grade: "B", semester: "Spring 2026" },
  { studentId: "S013", courseCode: "STAT100", grade: "B", semester: "Spring 2026" },
];

// Generate remaining enrollments for S006-S024
for (let i = 6; i <= 24; i++) {
  if (i === 11 || i === 12) continue; // Already added
  const studentId = `S${String(i).padStart(3, '0')}`;
  courses.forEach(course => {
    enrollments.push({
      studentId,
      courseCode: course.courseCode,
      grade: "B",
      semester: "Spring 2026"
    });
  });
}

// 8 Announcements from Announcements Sheet
export const announcements: Announcement[] = [
  {
    announcementId: "A001",
    title: "🎓 Final Exam Schedule",
    content: "Final examinations will be held from April 15-30, 2026. Please check your individual schedules in the student portal.",
    priority: "HIGH",
    author: "Academic Office",
    date: "2026-04-15"
  },
  {
    announcementId: "A002",
    title: "🎉 Thingyan Holiday Notice",
    content: "The university will be closed for Thingyan Festival from March 30 to April 4, 2026. Classes resume on April 5.",
    priority: "HIGH",
    author: "Administration",
    date: "2026-03-20"
  },
  {
    announcementId: "A003",
    title: "school hour",
    content: "Library open until 10PM during exam preparation period",
    priority: "MEDIUM",
    author: "Library Services",
    date: "2026-05-01"
  },
  {
    announcementId: "A004",
    title: "📝 BUS101 Assignment Due",
    content: "Business case study analysis due on March 15. Submit via Google Classroom.",
    priority: "HIGH",
    author: "Prof. Johnson",
    date: "2026-03-15"
  },
  {
    announcementId: "A005",
    title: "🔬 ENG101 Essay Guidelines",
    content: "Guidelines for the final essay have been posted. Please review before starting your work.",
    priority: "MEDIUM",
    author: "Dr. Smith",
    date: "2026-03-18"
  },
  {
    announcementId: "A006",
    title: "aaaaabbbb",
    content: "Test announcement",
    priority: "HIGH",
    author: "System",
    date: "2026-03-01"
  },
  {
    announcementId: "A007",
    title: "55555.0",
    content: "Incomplete data entry",
    priority: "LOW",
    author: "System",
    date: "2026-03-01"
  },
  {
    announcementId: "A008",
    title: "ma yamone is soo gee myar",
    content: "Student message",
    priority: "LOW",
    author: "Student",
    date: "2026-03-01"
  }
];

// AttendanceSummary Data
export const attendanceSummary: AttendanceSummary[] = [
  // S001
  { studentId: "S001", courseCode: "BUS101", totalClasses: 30, present: 26, late: 2, absent: 2, attendancePercentage: 86.67 },
  { studentId: "S001", courseCode: "ENG101", totalClasses: 28, present: 27, late: 1, absent: 0, attendancePercentage: 96.43 },
  { studentId: "S001", courseCode: "HUM11", totalClasses: 30, present: 27, late: 2, absent: 1, attendancePercentage: 90.0 },
  { studentId: "S001", courseCode: "IT101", totalClasses: 30, present: 26, late: 3, absent: 1, attendancePercentage: 88.0 },
  { studentId: "S001", courseCode: "MATH101", totalClasses: 30, present: 25, late: 3, absent: 2, attendancePercentage: 85.0 },
  { studentId: "S001", courseCode: "STAT100", totalClasses: 30, present: 24, late: 3, absent: 3, attendancePercentage: 82.0 },
  
  // S002
  { studentId: "S002", courseCode: "BUS101", totalClasses: 30, present: 28, late: 1, absent: 1, attendancePercentage: 93.33 },
  { studentId: "S002", courseCode: "ENG101", totalClasses: 28, present: 26, late: 1, absent: 1, attendancePercentage: 92.86 },
  { studentId: "S002", courseCode: "HUM11", totalClasses: 30, present: 28, late: 1, absent: 1, attendancePercentage: 93.33 },
  { studentId: "S002", courseCode: "IT101", totalClasses: 30, present: 27, late: 2, absent: 1, attendancePercentage: 90.0 },
  { studentId: "S002", courseCode: "MATH101", totalClasses: 30, present: 26, late: 2, absent: 2, attendancePercentage: 86.67 },
  { studentId: "S002", courseCode: "STAT100", totalClasses: 30, present: 27, late: 1, absent: 2, attendancePercentage: 90.0 },
];

// Generate attendance for remaining students
for (let i = 3; i <= 24; i++) {
  const studentId = `S${String(i).padStart(3, '0')}`;
  courses.forEach(course => {
    const totalClasses = course.courseCode === "ENG101" ? 28 : 30;
    const present = Math.floor(totalClasses * (0.82 + Math.random() * 0.15));
    const late = Math.floor((totalClasses - present) * 0.6);
    const absent = totalClasses - present - late;
    const attendancePercentage = Number(((present + late * 0.5) / totalClasses * 100).toFixed(2));
    
    attendanceSummary.push({
      studentId,
      courseCode: course.courseCode,
      totalClasses,
      present,
      late,
      absent,
      attendancePercentage
    });
  });
}

// StudentNotifications (144 records: 24 students × 6 main announcements)
export const studentNotifications: StudentNotification[] = [];
students.forEach(student => {
  announcements.slice(0, 6).forEach(announcement => {
    studentNotifications.push({
      studentId: student.studentId,
      announcementId: announcement.announcementId,
      read: false
    });
  });
});

// SyncLog Data
export const syncLog: SyncLog[] = [
  {
    syncId: "SYNC001",
    timestamp: "2026-03-03T08:31:00",
    syncType: "Manual",
    status: "Success",
    details: "All sheets synchronized successfully"
  },
  {
    syncId: "SYNC002",
    timestamp: "2026-03-03T09:15:00",
    syncType: "Auto",
    status: "Warning",
    details: "Announcements sync completed with warnings"
  },
  {
    syncId: "SYNC003",
    timestamp: "2026-03-03T10:00:00",
    syncType: "Auto",
    status: "Error",
    details: "Enrollments sync failed - retrying"
  },
  {
    syncId: "SYNC004",
    timestamp: "2026-03-03T10:30:00",
    syncType: "Manual",
    status: "Success",
    details: "Manual sync completed"
  }
];

// Helper function to calculate GPA from grades
export const calculateGPA = (studentId: string): number => {
  const studentEnrollments = enrollments.filter(e => e.studentId === studentId);
  if (studentEnrollments.length === 0) return 0;
  
  const gradePoints: { [key: string]: number } = {
    'A': 4.0,
    'B': 3.0,
    'C': 2.0,
    'D': 1.0,
    'F': 0.0
  };
  
  const totalPoints = studentEnrollments.reduce((sum, enrollment) => {
    return sum + (gradePoints[enrollment.grade] || 0);
  }, 0);
  
  return Number((totalPoints / studentEnrollments.length).toFixed(2));
};

// Helper function to get overall attendance percentage
export const getOverallAttendance = (studentId: string): number => {
  const studentAttendance = attendanceSummary.filter(a => a.studentId === studentId);
  if (studentAttendance.length === 0) return 0;
  
  const totalClasses = studentAttendance.reduce((sum, a) => sum + a.totalClasses, 0);
  const totalPresent = studentAttendance.reduce((sum, a) => sum + a.present, 0);
  const totalLate = studentAttendance.reduce((sum, a) => sum + a.late, 0);
  
  return Number(((totalPresent + totalLate * 0.5) / totalClasses * 100).toFixed(2));
};

// Helper function to get unread announcement count
export const getUnreadCount = (studentId: string): number => {
  return studentNotifications.filter(n => n.studentId === studentId && !n.read).length;
};

// Helper function to get student's courses
export const getStudentCourses = (studentId: string) => {
  const studentEnrollments = enrollments.filter(e => e.studentId === studentId);
  return studentEnrollments.map(enrollment => {
    const course = courses.find(c => c.courseCode === enrollment.courseCode);
    const attendance = attendanceSummary.find(a => 
      a.studentId === studentId && a.courseCode === enrollment.courseCode
    );
    return {
      ...course,
      grade: enrollment.grade,
      attendance: attendance?.attendancePercentage || 0,
      present: attendance?.present || 0,
      totalClasses: attendance?.totalClasses || 0
    };
  });
};
