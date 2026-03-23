import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  HiOutlineDocumentText, 
  HiOutlineFolder,
  HiOutlineSearch,
  HiOutlineBookOpen
} from 'react-icons/hi';
import { useStudent } from '../../context/StudentContext';

export function Materials() {
  const { getCourseMaterials, getCourseByCode, getEnrolledCourses } = useStudent();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<string>('all');
  
  const enrolledCourses = getEnrolledCourses();
  
  let allMaterials: any[] = [];
  enrolledCourses.forEach(course => {
    const materials = getCourseMaterials(course.courseCode);
    materials.forEach(m => {
      allMaterials.push({
        ...m,
        courseName: course.courseName,
        courseCode: course.courseCode
      });
    });
  });
  
  // Filter materials
  let filteredMaterials = allMaterials;
  if (selectedCourse !== 'all') {
    filteredMaterials = filteredMaterials.filter(m => m.courseCode === selectedCourse);
  }
  if (searchTerm) {
    filteredMaterials = filteredMaterials.filter(m => 
      m.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.type?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  
  // Library resources
  const libraryResources = [
    { name: "Project Gutenberg", url: "https://www.gutenberg.org", desc: "70,000+ free eBooks" },
    { name: "OpenStax", url: "https://openstax.org", desc: "Free college textbooks" },
    { name: "Khan Academy", url: "https://www.khanacademy.org", desc: "Free video lessons" },
    { name: "Open Yale Courses", url: "https://oyc.yale.edu", desc: "Free Yale courses" },
    { name: "MIT OpenCourseWare", url: "https://ocw.mit.edu", desc: "Free MIT courses" },
    { name: "JSTOR", url: "https://www.jstor.org", desc: "Academic journals (free account)" },
    { name: "Google Scholar", url: "https://scholar.google.com", desc: "Search academic papers" },
    { name: "Internet Archive", url: "https://archive.org", desc: "Millions of free books" }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-seafoam-900">Course Materials</h1>
        <p className="text-sm text-seafoam-600 mt-1">Access lecture notes, slides, and readings</p>
      </div>
      
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-seafoam-400" size={18} />
            <input
              type="text"
              placeholder="Search materials..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-seafoam-200 focus:outline-none focus:ring-2 focus:ring-seafoam-400"
            />
          </div>
        </div>
        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          className="px-4 py-2 rounded-xl border border-seafoam-200 focus:outline-none focus:ring-2 focus:ring-seafoam-400 bg-white"
        >
          <option value="all">All Courses</option>
          {enrolledCourses.map(course => (
            <option key={course.courseCode} value={course.courseCode}>
              {course.courseName}
            </option>
          ))}
        </select>
      </div>
      
      {/* Materials List */}
      {filteredMaterials.length === 0 ? (
        <div className="glass-card p-8 text-center">
          <HiOutlineDocumentText size={48} className="mx-auto mb-4 text-seafoam-300" />
          <p className="text-seafoam-500">No materials found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredMaterials.map((material, idx) => (
            <motion.a
              key={material.materialId || idx}
              href={material.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="glass-card p-4 hover:shadow-lg transition-all hover:-translate-y-1"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-seafoam-100 flex items-center justify-center">
                  <HiOutlineDocumentText size={20} className="text-seafoam-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-seafoam-900">{material.title}</h3>
                  <p className="text-xs text-seafoam-500 mt-1">
                    {material.courseName} • Week {material.week} • {material.type}
                  </p>
                  <p className="text-xs text-seafoam-400 mt-1">Uploaded by {material.uploadedBy}</p>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      )}
      
      {/* Library Section - Free Resources */}
      <div className="glass-card p-6 mt-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(27, 95, 86, 0.1)' }}>
            <HiOutlineBookOpen size={20} style={{ color: '#1b5f56' }} />
          </div>
          <h2 className="text-xl font-semibold text-seafoam-900">📚 AUY Digital Library</h2>
        </div>
        <p className="text-sm text-seafoam-600 mb-4">Free educational resources for liberal arts and science students</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {libraryResources.map((resource, i) => (
            <a
              key={i}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card p-3 hover:shadow-md transition-all hover:-translate-y-0.5 text-seafoam-700 hover:text-seafoam-900"
            >
              <div className="font-medium text-sm">{resource.name}</div>
              <div className="text-xs text-seafoam-400 mt-1">{resource.desc}</div>
            </a>
          ))}
        </div>
        <p className="text-xs text-seafoam-400 mt-4 text-center">All resources are free. Some may require a free account.</p>
      </div>
    </div>
  );
}