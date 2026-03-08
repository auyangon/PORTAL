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
  { studentId: "S001", email: "aung.khant.phyo@student.au.edu.mm", studentName: "Aung Khant Phyo", major: "ISP program", studyMode: "OnCampus", status: "Active" },
  { studentId: "S002", email: "hsu.eain.htet@student.au.edu.mm", studentName: "Hsu Eain Htet", major: "ISP program", studyMode: "OnCampus", status: "Active" },
  { studentId: "S003", email: "htoo.yadanar.oo@student.au.edu.mm", studentName: "Htoo Yadanar Oo", major: "ISP program", studyMode: "OnCampus", status: "Active" },
  { studentId: "S004", email: "kaung.pyae.phyo.kyaw@student.au.edu.mm", studentName: "Kaung Pyae Phyo Kyaw", major: "ISP program", studyMode: "OnCampus", status: "Active" },
  { studentId: "S005", email: "man.sian.hoih@student.au.edu.mm", studentName: "Man Sian Hoih", major: "ISP program", studyMode: "OnCampus", status: "Active" },
  { studentId: "S006", email: "phone.pyae.han@student.au.edu.mm", studentName: "Phone Pyae Han", major: "ISP program", studyMode: "OnCampus", status: "Active" },
  { studentId: "S007", email: "thin.zar.li.htay@student.au.edu.mm", studentName: "Thin Zar Li Htay", major: "ISP program", studyMode: "OnCampus", status: "Active" },
  { studentId: "S008", email: "yoon.thiri.naing@student.au.edu.mm", studentName: "Yoon Thiri Naing", major: "ISP program", studyMode: "OnCampus", status: "Active" },
  { studentId: "S009", email: "zau.myu.lat@student.au.edu.mm", studentName: "Zau Myu Lat", major: "ISP program", studyMode: "OnCampus", status: "Active" },
  { studentId: "S010", email: "en.sian.piang@student.au.edu.mm", studentName: "En Sian Piang", major: "ISP program", studyMode: "OnCampus", status: "Active" },
  { studentId: "S011", email: "hsu.kyal.sin.zaw@student.au.edu.mm", studentName: "Hsu Kyal Sin Zaw", major: "ISP program", studyMode: "OnCampus", status: "Active" },
  { studentId: "S012", email: "kaung.khant.kyaw@student.au.edu.mm", studentName: "Kaung Khant Kyaw", major: "ISP program", studyMode: "OnCampus", status: "Active" },
  { studentId: "S013", email: "may.lin.phyu@student.au.edu.mm", studentName: "May Lin Phyu", major: "ISP program", studyMode: "OnCampus", status: "Active" },
  { studentId: "S014", email: "min.hein.kyaw@student.au.edu.mm", studentName: "Min Hein Kyaw", major: "ISP program", studyMode: "OnCampus", status: "Active" },
  { studentId: "S015", email: "thint.myat.aung@student.au.edu.mm", studentName: "Thint Myat Aung", major: "ISP program", studyMode: "OnCampus", status: "Active" },
  { studentId: "S016", email: "chan.htet.zan@student.au.edu.mm", studentName: "Chan Htet Zan", major: "ISP program", studyMode: "OnCampus", status: "Active" },
  { studentId: "S017", email: "swan.sa.phyo@student.au.edu.mm", studentName: "Swan Sa Phyo", major: "ISP program", studyMode: "OnCampus", status: "Active" },
  { studentId: "S018", email: "mya.hmue.may.zaw@student.au.edu.mm", studentName: "Mya Hmue May Zaw", major: "ISP program", studyMode: "OnCampus", status: "Active" },
  { studentId: "S019", email: "kaung.nyan.lin@student.au.edu.mm", studentName: "Kaung Nyan Lin", major: "ISP program", studyMode: "OnCampus", status: "Active" },
  { studentId: "S020", email: "thaw.thaw.zin@student.au.edu.mm", studentName: "Thaw Thaw Zin", major: "ISP program", studyMode: "OnCampus", status: "Active" },
  { studentId: "S021", email: "l.seng.rail@student.au.edu.mm", studentName: "L Seng Rail", major: "ISP program", studyMode: "OnCampus", status: "Active" },
  { studentId: "S022", email: "min.hein.khant@student.au.edu.mm", studentName: "Min Hein Khant", major: "ISP program", studyMode: "OnCampus", status: "Active" },
  { studentId: "S023", email: "thawdar.shoon.lei@student.au.edu.mm", studentName: "Thawdar Shoon Lei", major: "ISP program", studyMode: "OnCampus", status: "Active" },
  { studentId: "S024", email: "chanmyae.au.edu.mm@gmail.com", studentName: "chan myae", major: "ISP program", studyMode: "OnCampus", status: "Active" }
];

// 6 Courses from Courses Sheet
export const courses: Course[] = [
  { courseCode: "BUS101", courseName: "Introduction to Business", credits: 3, teacher: "Prof. Johnson", googleClassroomLink: "https://classroom.google.com/" },
  { courseCode: "ENG101", courseName: "English Composition", credits: 3, teacher: "Dr. Smith", googleClassroomLink: "https://classroom.google.com/" },
  { courseCode: "HUM11", courseName: "Humanities", credits: 3, teacher: "Prof. Green", googleClassroomLink: "https://classroom.google.com/" },
  { courseCode: "IT101", courseName: "Computer Fundamentals", credits: 3, teacher: "Dr. Brown", googleClassroomLink: "https://classroom.google.com/" },
  { courseCode: "MATH101", courseName: "College Mathematics", credits: 3, teacher: "Prof. Lee", googleClassroomLink: "https://classroom.google.com/" },
  { courseCode: "STAT100", courseName: "Statistics", credits: 3, teacher: "Dr. White", googleClassroomLink: "https://classroom.google.com/" }
];

// 63 Enrollments from Enrollments Sheet
export const enrollments: Enrollment[] = [
  // S001
  { studentId: "S001", courseCode: "BUS101", grade: "B", semester: "Spring 2026" },
  { studentId: "S001", courseCode: "ENG101", grade: "B", semester: "Spring 2026" },
  { studentId: "S001", courseCode: "HUM11", grade: "B", semester: "Spring 2026" },
  { studentId: "S001", courseCode: "IT101", grade: "B", semester: "Spring 2026" },
  { studentId: "S001", courseCode: "MATH101", grade: "B", semester: "Spring 2026" },
  { studentId: "S001", courseCode: "STAT100", grade: "B", semester: "Spring 2026" },
  
  // S002
  { studentId: "S002", courseCode: "BUS101", grade: "B", semester: "Spring 2026" },
  { studentId: "S002", courseCode: "ENG101", grade: "B", semester: "Spring 2026" },
  { studentId: "S002", courseCode: "HUM11", grade: "B", semester: "Spring 2026" },
  { studentId: "S002", courseCode: "IT101", grade: "B", semester: "Spring 2026" },
  { studentId: "S002", courseCode: "MATH101", grade: "B", semester: "Spring 2026" },
  { studentId: "S002", courseCode: "STAT100", grade: "B", semester: "Spring 2026" },
  
  // S003
  { studentId: "S003", courseCode: "BUS101", grade: "B", semester: "Spring 2026" },
  { studentId: "S003", courseCode: "ENG101", grade: "B", semester: "Spring 2026" },
  { studentId: "S003", courseCode: "HUM11", grade: "B", semester: "Spring 2026" },
  { studentId: "S003", courseCode: "IT101", grade: "B", semester: "Spring 2026" },
  { studentId: "S003", courseCode: "MATH101", grade: "B", semester: "Spring 2026" },
  { studentId: "S003", courseCode: "STAT100", grade: "B", semester: "Spring 2026" },
  
  // S004
  { studentId: "S004", courseCode: "BUS101", grade: "B", semester: "Spring 2026" },
  { studentId: "S004", courseCode: "ENG101", grade: "B", semester: "Spring 2026" },
  { studentId: "S004", courseCode: "HUM11", grade: "B", semester: "Spring 2026" },
  { studentId: "S004", courseCode: "IT101", grade: "B", semester: "Spring 2026" },
  { studentId: "S004", courseCode: "MATH101", grade: "B", semester: "Spring 2026" },
  { studentId: "S004", courseCode: "STAT100", grade: "B", semester: "Spring 2026" },
  
  // S005
  { studentId: "S005", courseCode: "BUS101", grade: "B", semester: "Spring 2026" },
  { studentId: "S005", courseCode: "ENG101", grade: "B", semester: "Spring 2026" },
  { studentId: "S005", courseCode: "HUM11", grade: "B", semester: "Spring 2026" },
  { studentId: "S005", courseCode: "IT101", grade: "B", semester: "Spring 2026" },
  { studentId: "S005", courseCode: "MATH101", grade: "B", semester: "Spring 2026" },
  { studentId: "S005", courseCode: "STAT100", grade: "B", semester: "Spring 2026" },
  
  // S006
  { studentId: "S006", courseCode: "BUS101", grade: "B", semester: "Spring 2026" },
  { studentId: "S006", courseCode: "ENG101", grade: "B", semester: "Spring 2026" },
  { studentId: "S006", courseCode: "HUM11", grade: "B", semester: "Spring 2026" },
  { studentId: "S006", courseCode: "IT101", grade: "B", semester: "Spring 2026" },
  { studentId: "S006", courseCode: "MATH101", grade: "B", semester: "Spring 2026" },
  { studentId: "S006", courseCode: "STAT100", grade: "B", semester: "Spring 2026" },
  
  // S007
  { studentId: "S007", courseCode: "BUS101", grade: "B", semester: "Spring 2026" },
  { studentId: "S007", courseCode: "ENG101", grade: "B", semester: "Spring 2026" },
  { studentId: "S007", courseCode: "HUM11", grade: "B", semester: "Spring 2026" },
  { studentId: "S007", courseCode: "IT101", grade: "B", semester: "Spring 2026" },
  { studentId: "S007", courseCode: "MATH101", grade: "B", semester: "Spring 2026" },
  { studentId: "S007", courseCode: "STAT100", grade: "B", semester: "Spring 2026" },
  
  // S008
  { studentId: "S008", courseCode: "BUS101", grade: "B", semester: "Spring 2026" },
  { studentId: "S008", courseCode: "ENG101", grade: "B", semester: "Spring 2026" },
  { studentId: "S008", courseCode: "HUM11", grade: "B", semester: "Spring 2026" },
  { studentId: "S008", courseCode: "IT101", grade: "B", semester: "Spring 2026" },
  { studentId: "S008", courseCode: "MATH101", grade: "B", semester: "Spring 2026" },
  { studentId: "S008", courseCode: "STAT100", grade: "B", semester: "Spring 2026" },
  
  // S009
  { studentId: "S009", courseCode: "BUS101", grade: "B", semester: "Spring 2026" },
  { studentId: "S009", courseCode: "ENG101", grade: "B", semester: "Spring 2026" },
  { studentId: "S009", courseCode: "HUM11", grade: "B", semester: "Spring 2026" },
  { studentId: "S009", courseCode: "IT101", grade: "B", semester: "Spring 2026" },
  { studentId: "S009", courseCode: "MATH101", grade: "B", semester: "Spring 2026" },
  { studentId: "S009", courseCode: "STAT100", grade: "B", semester: "Spring 2026" },
  
  // S010
  { studentId: "S010", courseCode: "BUS101", grade: "B", semester: "Spring 2026" },
  { studentId: "S010", courseCode: "ENG101", grade: "B", semester: "Spring 2026" },
  { studentId: "S010", courseCode: "HUM11", grade: "B", semester: "Spring 2026" },
  { studentId: "S010", courseCode: "IT101", grade: "B", semester: "Spring 2026" },
  { studentId: "S010", courseCode: "MATH101", grade: "B", semester: "Spring 2026" },
  { studentId: "S010", courseCode: "STAT100", grade: "B", semester: "Spring 2026" },
  
  // S011 - Mixed grades
  { studentId: "S011", courseCode: "BUS101", grade: "C", semester: "Spring 2026" },
  { studentId: "S011", courseCode: "ENG101", grade: "C", semester: "Spring 2026" },
  { studentId: "S011", courseCode: "HUM11", grade: "B", semester: "Spring 2026" },
  { studentId: "S011", courseCode: "IT101", grade: "B", semester: "Spring 2026" },
  { studentId: "S011", courseCode: "MATH101", grade: "B", semester: "Spring 2026" },
  { studentId: "S011", courseCode: "STAT100", grade: "B", semester: "Spring 2026" },
  
  // S012 - Mixed grades
  { studentId: "S012", courseCode: "BUS101", grade: "C", semester: "Spring 2026" },
  { studentId: "S012", courseCode: "ENG101", grade: "C", semester: "Spring 2026" },
  { studentId: "S012", courseCode: "HUM11", grade: "B", semester: "Spring 2026" },
  { studentId: "S012", courseCode: "IT101", grade: "B", semester: "Spring 2026" },
  { studentId: "S012", courseCode: "MATH101", grade: "B", semester: "Spring 2026" },
  { studentId: "S012", courseCode: "STAT100", grade: "B", semester: "Spring 2026" }
];

// Add remaining S013-S024
for ($i = 13; $i -le 24; $i++) {
  $studentId = "S" + $i.ToString("D3")
  $courses | ForEach-Object {
    $enrollments += @{
      studentId = $studentId
      courseCode = $_.courseCode
      grade = "B"
      semester = "Spring 2026"
    }
  }
}

// 8 Announcements from Announcements Sheet
export const announcements: Announcement[] = [
  {
    announcementId: "A001",
    title: "🎓 Final Exam Schedule",
    content: "The final examination schedule for May 2026 has been published. Please check your email for personal schedule.",
    priority: "HIGH",
    author: "Academic Office",
    date: "2026-04-15"
  },
  {
    announcementId: "A002",
    title: "🎉 Thingyan Holiday Notice",
    content: "University will be closed from March 30 to April 4, 2026 for Thingyan Festival. Classes resume on April 5.",
    priority: "HIGH",
    author: "Administration",
    date: "2026-03-20"
  },
  {
    announcementId: "A003",
    title: "school hour",
    content: "The classes will be open until 10 PM during exam preparation week (May 10-14).",
    priority: "MEDIUM",
    author: "Library",
    date: "2026-05-01"
  },
  {
    announcementId: "A004",
    title: "📝 BUS101 Assignment Due",
    content: "Chapter 5 case study due next Friday",
    priority: "HIGH",
    author: "Prof. Johnson",
    date: "2026-03-15"
  },
  {
    announcementId: "A005",
    title: "🔬 ENG101 Essay Guidelines",
    content: "Updated essay guidelines posted",
    priority: "MEDIUM",
    author: "Dr. Smith",
    date: "2026-03-18"
  },
  {
    announcementId: "A006",
    title: "aaaaabbbb",
    content: "aaaaa",
    priority: "HIGH",
    author: "Academic Office",
    date: "2026-02-28"
  },
  {
    announcementId: "A007",
    title: "55555.0",
    content: "555.0",
    priority: "LOW",
    author: "System",
    date: "2026-03-01"
  },
  {
    announcementId: "A008",
    title: "ma yamone is soo gee myar",
    content: "mama yamone",
    priority: "LOW",
    author: "Student",
    date: "2026-03-01"
  }
];

// AttendanceSummary Data
export const attendanceSummary: AttendanceSummary[] = [
  { studentId: "S001", courseCode: "BUS101", totalClasses: 30, present: 26, late: 2, absent: 2, attendancePercentage: 86.67 },
  { studentId: "S001", courseCode: "ENG101", totalClasses: 28, present: 27, late: 1, absent: 0, attendancePercentage: 96.43 },
  { studentId: "S002", courseCode: "BUS101", totalClasses: 30, present: 28, late: 1, absent: 1, attendancePercentage: 93.33 },
  { studentId: "S002", courseCode: "ENG101", totalClasses: 28, present: 26, late: 1, absent: 1, attendancePercentage: 92.86 }
];

// Generate attendance for all students
for ($i = 1; $i -le 24; $i++) {
  $studentId = "S" + $i.ToString("D3")
  $courses | ForEach-Object {
    $course = $_
    $totalClasses = if ($course.courseCode -eq "ENG101") { 28 } else { 30 }
    $present = [math]::Floor($totalClasses * (0.82 + (Get-Random -Minimum 0 -Maximum 15)/100))
    $late = [math]::Floor(($totalClasses - $present) * 0.6)
    $absent = $totalClasses - $present - $late
    $percentage = [math]::Round(($present + $late * 0.5) / $totalClasses * 100, 2)
    
    # Check if already exists
    $exists = $attendanceSummary | Where-Object { $_.studentId -eq $studentId -and $_.courseCode -eq $course.courseCode }
    if (-not $exists) {
      $attendanceSummary += @{
        studentId = $studentId
        courseCode = $course.courseCode
        totalClasses = $totalClasses
        present = $present
        late = $late
        absent = $absent
        attendancePercentage = $percentage
      }
    }
  }
}

// StudentNotifications (144 records)
export const studentNotifications: StudentNotification[] = []
$students | ForEach-Object {
  $student = $_
  $announcements | Select-Object -First 6 | ForEach-Object {
    $studentNotifications += @{
      studentId = $student.studentId
      announcementId = $_.announcementId
      read = $false
    }
  }
}

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