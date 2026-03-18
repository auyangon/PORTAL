import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  HiOutlineDocumentText,
  HiOutlineVideoCamera,
  HiOutlineDownload,
  HiOutlineExternalLink,
  HiOutlineFolder,
  HiOutlineSearch,
} from 'react-icons/hi';
import { useStudent } from '../../context/StudentContext';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export function Materials() {
  const { materials, getCourseByCode, getEnrolledCourses } = useStudent();
  const [selectedCourse, setSelectedCourse] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const enrolledCourses = getEnrolledCourses();
  const enrolledCourseCodes = enrolledCourses.map(c => c.courseCode);

  // Filter materials for enrolled courses
  const relevantMaterials = materials.filter(m => enrolledCourseCodes.includes(m.courseCode));

  const filteredMaterials = relevantMaterials
    .filter(m => selectedCourse === 'all' || m.courseCode === selectedCourse)
    .filter(m => 
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.courseCode.toLowerCase().includes(searchQuery.toLowerCase())
    );

  // Group materials by course
  const materialsByCourse = filteredMaterials.reduce((acc, material) => {
    if (!acc[material.courseCode]) {
      acc[material.courseCode] = [];
    }
    acc[material.courseCode].push(material);
    return acc;
  }, {} as Record<string, typeof materials>);

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'video':
        return <HiOutlineVideoCamera size={20} />;
      case 'pdf':
        return <HiOutlineDocumentText size={20} />;
      default:
        return <HiOutlineFolder size={20} />;
    }
  };

  const getTypeStyle = (type: string) => {
    switch (type.toLowerCase()) {
      case 'video':
        return { bg: 'rgba(45, 154, 138, 0.15)', color: '#1b5f56' };
      case 'pdf':
        return { bg: 'rgba(36, 125, 112, 0.15)', color: '#247d70' };
      default:
        return { bg: 'rgba(102, 195, 183, 0.15)', color: '#247d70' };
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold" style={{ color: '#0d312c' }}>Course Materials</h2>
          <p style={{ color: '#247d70' }}>{relevantMaterials.length} materials available</p>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
        {/* Search */}
        <div className="relative flex-1 min-w-[240px]">
          <HiOutlineSearch 
            className="absolute left-4 top-1/2 -translate-y-1/2" 
            size={20}
            style={{ color: '#247d70' }}
          />
          <input
            type="text"
            placeholder="Search materials..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white/80 backdrop-blur-xl rounded-2xl text-sm focus:outline-none focus:ring-2 transition-all"
            style={{ 
              border: '1px solid rgba(45, 154, 138, 0.1)',
              color: '#0d312c',
            }}
          />
        </div>

        {/* Course Filter */}
        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          className="px-5 py-3 bg-white/80 backdrop-blur-xl rounded-2xl text-sm cursor-pointer focus:outline-none focus:ring-2 transition-all"
          style={{ 
            border: '1px solid rgba(45, 154, 138, 0.1)',
            color: '#0d312c',
          }}
        >
          <option value="all">All Courses</option>
          {enrolledCourses.map(course => (
            <option key={course.courseCode} value={course.courseCode}>
              {course.courseCode} - {course.courseName}
            </option>
          ))}
        </select>
      </motion.div>

      {/* Materials by Course */}
      <div className="space-y-8">
        {Object.entries(materialsByCourse).map(([courseCode, courseMaterials], idx) => {
          const course = getCourseByCode(courseCode);
          
          return (
            <motion.div key={courseCode} variants={itemVariants}>
              {/* Course Header */}
              <div className="flex items-center gap-4 mb-4">
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ 
                    background: `linear-gradient(135deg, ${
                      idx % 3 === 0 ? '#0d312c, #1b5f56' :
                      idx % 3 === 1 ? '#1b5f56, #247d70' :
                      '#247d70, #2d9a8a'
                    })`,
                  }}
                >
                  <span className="text-white text-sm font-bold">
                    {courseCode.slice(0, 2)}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold" style={{ color: '#0d312c' }}>{course?.courseName || courseCode}</h3>
                  <p className="text-sm" style={{ color: '#247d70' }}>{courseMaterials.length} materials</p>
                </div>
              </div>

              {/* Materials Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {courseMaterials
                  .sort((a, b) => parseInt(a.week) - parseInt(b.week))
                  .map((material) => {
                    const typeStyle = getTypeStyle(material.type);
                    
                    return (
                      <motion.a
                        key={material.materialId}
                        href={material.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.02, y: -2 }}
                        className="bg-white/80 backdrop-blur-xl rounded-2xl p-5 shadow-lg group transition-all hover-lift"
                        style={{ border: '1px solid rgba(45, 154, 138, 0.1)' }}
                      >
                        <div className="flex items-start gap-4">
                          <div 
                            className="w-12 h-12 rounded-xl flex items-center justify-center"
                            style={{ background: typeStyle.bg, color: typeStyle.color }}
                          >
                            {getTypeIcon(material.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p 
                              className="font-medium truncate transition-colors"
                              style={{ color: '#0d312c' }}
                            >
                              {material.title}
                            </p>
                            <p className="text-sm mt-1" style={{ color: '#247d70' }}>Week {material.week}</p>
                            <div className="flex items-center justify-between mt-3">
                              <span 
                                className="text-xs font-medium px-2 py-1 rounded-lg"
                                style={{ background: typeStyle.bg, color: typeStyle.color }}
                              >
                                {material.type}
                              </span>
                              <HiOutlineExternalLink 
                                size={16} 
                                className="transition-colors"
                                style={{ color: '#66c3b7' }}
                              />
                            </div>
                          </div>
                        </div>
                        <div 
                          className="mt-4 pt-3 flex items-center justify-between text-xs"
                          style={{ borderTop: '1px solid rgba(45, 154, 138, 0.1)', color: '#66c3b7' }}
                        >
                          <span>{material.uploadedBy}</span>
                          <span>{material.uploadDate}</span>
                        </div>
                      </motion.a>
                    );
                  })}
              </div>
            </motion.div>
          );
        })}
      </div>

      {filteredMaterials.length === 0 && (
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center justify-center py-16"
          style={{ color: '#66c3b7' }}
        >
          <HiOutlineDownload size={64} className="mb-4" />
          <p className="text-xl font-medium">No materials found</p>
          <p className="text-sm">Try adjusting your search or filter</p>
        </motion.div>
      )}
    </motion.div>
  );
}
