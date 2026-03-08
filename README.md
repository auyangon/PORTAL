# AUY Student Portal Dashboard

A comprehensive, data-driven student portal dashboard for Assumption University (AUY) built with React, TypeScript, Vite, and Tailwind CSS.

## 🎓 Features

### 📊 Real Data Integration
- **24 Active Students** from the ISP program
- **6 Courses** per student (BUS101, ENG101, HUM11, IT101, MATH101, STAT100)
- **63 Enrollments** with real grades (B and C grades)
- **Attendance Tracking** with detailed statistics per course
- **8 Announcements** with priority levels and read status
- **Sync Status Monitoring** with error logging

### 🎨 Dashboard Components

#### 1. **Fixed Sidebar Navigation**
- AUY branding with forest green (#1e3c2c) and gold accent (#c5a572)
- Menu items with icons and badges
- Course count indicator
- Unread notifications badge (6 unread)
- User profile section with initials avatar

#### 2. **Dynamic Header**
- Welcome message with student name
- Live date/time (auto-updates every minute)
- Student selector dropdown (switch between all 24 students)
- Search bar for courses/announcements
- Dark/Light mode toggle
- Logout button

#### 3. **Profile Card**
- Student ID and full details
- Email address
- Major: ISP program
- Study Mode: OnCampus
- Status badge (Active - green)
- GPA calculation (3.2 for B average, 2.67 for mixed B/C)
- Enrolled courses count (6)
- QR code placeholder

#### 4. **Course Progress Card**
- All 6 enrolled courses displayed
- Course details: Code, Name, Teacher
- Current grade from enrollments
- Progress bars (BUS101: 75%, ENG101: 80%, etc.)
- Attendance percentage per course
- Google Classroom links (clickable)

#### 5. **Attendance Summary Card**
- Donut chart visualization (Present: 88%, Late: 7%, Absent: 5%)
- Overall attendance statistics
- Course-wise breakdown
- Real data from AttendanceSummary sheet:
  - S001 BUS101: 86.67% (26/30 classes)
  - S001 ENG101: 96.43% (27/28 classes)
  - Color-coded indicators (green ≥90%, yellow ≥75%, red <75%)

#### 6. **Announcements Card**
- 6 main announcements from database
- Priority indicators (HIGH, MEDIUM, LOW)
- Emoji icons for visual appeal
- Author and date information
- "NEW" badges for unread items
- Click to mark as read functionality
- Announcements include:
  - 🎓 Final Exam Schedule (April 15)
  - 🎉 Thingyan Holiday Notice (March 20)
  - 📝 BUS101 Assignment Due (March 15)
  - And more...

#### 7. **Upcoming Deadlines Card**
- 6 upcoming events with countdown
- Urgency indicators (URGENT badge for ≤7 days)
- Progress bars showing time remaining
- Color-coded status (red: urgent, yellow: soon, green: far)
- Events include:
  - BUS101 Assignment: 5 days left (URGENT)
  - Final Exam Period: 38 days left
  - Thingyan Break: 22 days left

#### 8. **Quick Stats Card**
- 7 key metrics displayed:
  - 📊 GPA: 3.2 (calculated from grades)
  - 📈 Attendance Rate: 88%
  - ✅ Completed Courses: 0/6
  - 📚 Credits Enrolled: 18
  - 🏆 Active Courses: 6
  - 📅 Days Until Finals: 38
  - 📖 Unread Announcements: 6
- Semester progress tracker (Week 8 of 16)
- Overall performance indicator

#### 9. **Sync Status Banner**
- Last sync timestamp: March 3, 2026 08:31
- Sync status with visual indicators
- Warning state for errors in sync log
- Manual sync button
- Error log viewer for troubleshooting
- Recent sync history (4 most recent syncs)

### 🎯 Student-Specific Data

**Default Student: S001 - Aung Khant Phyo**
- GPA: 3.0 (all B grades)
- Overall Attendance: 88%
- Course Enrollments: 6 active courses
- Unread Announcements: 6

**Student Selector**: Switch between any of the 24 students to see their specific:
- Profile information
- Course enrollments
- Grades
- Attendance records
- Notification status

### 🎨 Design Features

- **Apple/iOS 16 Aesthetic**: Modern, clean interface
- **Glass-morphism Effects**: Backdrop blur on cards
- **Rounded Corners**: 24px cards, 16px buttons
- **Color Palette**:
  - Primary: #1e3c2c (AUY forest green)
  - Accent: #c5a572 (warm gold)
  - Background: #f5f7fa (light mode), #1a202c (dark mode)
- **Smooth Animations**:
  - Card hover effects (lift on hover)
  - Progress bar animations
  - Notification pulse effect
  - Button scale on hover
- **Dark/Light Mode**: Auto-detects system preference
- **Responsive Design**:
  - Desktop: Full sidebar + 2-column grid
  - Tablet: Collapsed sidebar + 2-column
  - Mobile: Hamburger menu + 1-column stack

### 📊 Data Structure

All data is sourced from the Excel database:

- **Students Sheet**: 24 students in ISP program
- **Courses Sheet**: 6 courses with teacher assignments
- **Enrollments Sheet**: 63 enrollment records with grades
- **AttendanceSummary Sheet**: Detailed attendance per student/course
- **Announcements Sheet**: 8 announcements with priorities
- **StudentNotifications Sheet**: 144 read/unread status records
- **SyncLog Sheet**: Sync history with timestamps and status

## 🚀 Technical Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Custom Components** for modularity
- **Real Data** hardcoded from Excel database

## 📱 Responsive Breakpoints

- Desktop: 1200px+ (full features)
- Tablet: 768px-1199px (adapted layout)
- Mobile: <768px (stacked layout)

## 🎯 Key Interactions

1. **Student Switching**: Dropdown in header updates all widgets dynamically
2. **Dark Mode Toggle**: Smooth transition between themes
3. **Announcement Reading**: Click to mark announcements as read
4. **Course Access**: Direct links to Google Classroom
5. **Real-time Clock**: Updates every minute
6. **Hover Effects**: Cards lift and scale on hover
7. **Progress Animations**: Bars animate on page load

## 📈 Performance Metrics

- **Build Size**: 261.90 kB (74.59 kB gzipped)
- **Build Time**: ~1.4 seconds
- **Components**: 8 major components
- **Data Points**: 240+ student records visualized

## 🎓 University Branding

- **Institution**: Assumption University (AUY)
- **Program**: ISP (International Studies Program)
- **Semester**: Spring 2026
- **Colors**: Forest Green (#1e3c2c) and Gold (#c5a572)

## 🔧 Future Enhancements

Potential additions for future versions:
- Live data sync with Google Sheets API
- Real-time notifications
- Calendar integration
- Assignment submission
- Grade analytics
- Performance predictions
- Mobile app version
- Multi-language support

---

Built with ❤️ for Assumption University Students
