import React, { useMemo } from 'react';
import { useStudent } from '../../context/StudentContext';

export function Attendance() {
  const { attendance, getEnrolledCourses } = useStudent();
  const enrolledCourses = getEnrolledCourses();

  const courseData = useMemo(() => {
    return enrolledCourses.map(course => {
      const records = attendance.filter(a => a.courseCode === course.courseCode);
      const total = records.length;
      if (total === 0) return { ...course, present: 0, late: 0, absent: 0, rate: 0 };
      const present = records.filter(a => a.status === 'Present').length;
      const late = records.filter(a => a.status === 'Late').length;
      const absent = records.filter(a => a.status === 'Absent').length;
      const rate = Math.round((present + late) / total * 100);
      return { ...course, present, late, absent, rate, total };
    });
  }, [enrolledCourses, attendance]);

  const totalPresent = attendance.filter(a => a.status === 'Present').length;
  const totalLate = attendance.filter(a => a.status === 'Late').length;
  const totalAbsent = attendance.filter(a => a.status === 'Absent').length;
  const overallRate = attendance.length ? Math.round((totalPresent + totalLate) / attendance.length * 100) : 0;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-seafoam-900">Attendance</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white/80 p-4 rounded-xl"><p className="text-sm text-gray-500">Present</p><p className="text-2xl font-bold">{totalPresent}</p></div>
        <div className="bg-white/80 p-4 rounded-xl"><p className="text-sm text-gray-500">Late</p><p className="text-2xl font-bold">{totalLate}</p></div>
        <div className="bg-white/80 p-4 rounded-xl"><p className="text-sm text-gray-500">Absent</p><p className="text-2xl font-bold">{totalAbsent}</p></div>
        <div className="bg-white/80 p-4 rounded-xl"><p className="text-sm text-gray-500">Rate</p><p className="text-2xl font-bold">{overallRate}%</p></div>
      </div>
      <div className="bg-white/80 p-6 rounded-xl">
        <h2 className="font-semibold mb-4">By Course</h2>
        {courseData.map(c => (
          <div key={c.courseCode} className="mb-4">
            <div className="flex justify-between"><span>{c.courseName}</span><span>{c.rate}%</span></div>
            <div className="w-full h-2 bg-gray-200 rounded-full mt-1"><div className="h-full rounded-full" style={{ width: c.rate + "%", background: c.rate >= 90 ? "#10b981" : c.rate >= 75 ? "#f59e0b" : "#ef4444" }} /></div>
            <div className="flex gap-3 text-xs mt-1"><span className="text-green-600">✓ {c.present}</span><span className="text-amber-500">⏰ {c.late}</span><span className="text-red-500">✗ {c.absent}</span></div>
          </div>
        ))}
      </div>
    </div>
  );
}


