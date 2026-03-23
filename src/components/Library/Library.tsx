import React from 'react';
import { motion } from 'framer-motion';
import { HiOutlineBookOpen, HiOutlineSparkles } from 'react-icons/hi';

const resources = [
  { name: "Project Gutenberg", url: "https://www.gutenberg.org", desc: "70,000+ free eBooks" },
  { name: "OpenStax", url: "https://openstax.org", desc: "Free college textbooks" },
  { name: "Khan Academy", url: "https://www.khanacademy.org", desc: "Free video lessons" },
  { name: "Open Yale Courses", url: "https://oyc.yale.edu", desc: "Free Yale courses" },
  { name: "MIT OpenCourseWare", url: "https://ocw.mit.edu", desc: "Free MIT courses" },
  { name: "JSTOR", url: "https://www.jstor.org", desc: "Academic journals (free account)" },
  { name: "Google Scholar", url: "https://scholar.google.com", desc: "Search academic papers" },
  { name: "Internet Archive", url: "https://archive.org", desc: "Millions of free books" }
];

export function Library() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-seafoam-900">📚 AUY Digital Library</h1>
        <p className="text-sm text-seafoam-600">Free resources for liberal arts and science students</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {resources.map((r, i) => (
          <motion.a
            key={i}
            href={r.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass-card p-4 hover:shadow-lg transition-all hover:-translate-y-1"
          >
            <div className="flex items-center gap-3">
              <HiOutlineBookOpen size={24} className="text-seafoam-600" />
              <div>
                <h3 className="font-semibold text-seafoam-800">{r.name}</h3>
                <p className="text-xs text-seafoam-500">{r.desc}</p>
              </div>
            </div>
          </motion.a>
        ))}
      </div>
      <div className="glass-card p-4 text-center">
        <div className="flex items-center justify-center gap-2 text-seafoam-500">
          <HiOutlineSparkles size={16} />
          <p className="text-sm">All resources are free. Some may require a free account.</p>
        </div>
      </div>
    </div>
  );
}
