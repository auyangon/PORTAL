import React from 'react';
import { motion } from 'framer-motion';
import { 
  HiOutlineBookOpen, 
  HiOutlineAcademicCap, 
  HiOutlineGlobe, 
  HiOutlineSearch,
  HiOutlineLibrary,
  HiOutlineSparkles,
  HiOutlineBeaker,
  HiOutlineChartBar,
  HiOutlinePencil,
  HiOutlineTranslate
} from 'react-icons/hi';

// Curated resources for Year 1 & 2 Liberal Arts & Science students
const subjectResources = [
  {
    subject: "📖 Literature & Writing",
    icon: HiOutlineBookOpen,
    color: "from-amber-500 to-orange-500",
    resources: [
      { name: "Project Gutenberg", url: "https://www.gutenberg.org", description: "Free classic literature: Shakespeare, Austen, Dickens, Poetry" },
      { name: "Open Yale - English", url: "https://oyc.yale.edu/english", description: "Full courses: Milton, Shakespeare, American Literature" },
      { name: "Poetry Foundation", url: "https://www.poetryfoundation.org", description: "Thousands of poems, essays, and poet biographies" },
      { name: "MIT OCW - Writing", url: "https://ocw.mit.edu/search/?q=writing", description: "Creative writing, technical writing, composition" }
    ]
  },
  {
    subject: "📊 Mathematics & Stats",
    icon: HiOutlineChartBar,
    color: "from-blue-500 to-cyan-500",
    resources: [
      { name: "OpenStax Math", url: "https://openstax.org/subjects/math", description: "Free textbooks: Algebra, Calculus, Statistics" },
      { name: "Khan Academy Math", url: "https://www.khanacademy.org/math", description: "Video lessons from arithmetic to calculus" },
      { name: "MIT OCW Math", url: "https://ocw.mit.edu/search/?q=mathematics", description: "Calculus, Linear Algebra, Differential Equations" },
      { name: "Paul's Math Notes", url: "https://tutorial.math.lamar.edu", description: "Free notes and practice problems" }
    ]
  },
  {
    subject: "🔬 Sciences",
    icon: HiOutlineBeaker,
    color: "from-green-500 to-emerald-500",
    resources: [
      { name: "OpenStax Science", url: "https://openstax.org/subjects/science", description: "Biology, Chemistry, Physics textbooks" },
      { name: "Khan Academy Science", url: "https://www.khanacademy.org/science", description: "Biology, Chemistry, Physics, Organic Chemistry" },
      { name: "MIT OCW Biology", url: "https://ocw.mit.edu/search/?q=biology", description: "Intro Biology, Genetics, Molecular Biology" },
      { name: "PhET Simulations", url: "https://phet.colorado.edu", description: "Interactive science simulations" }
    ]
  },
  {
    subject: "🌍 Social Sciences",
    icon: HiOutlineGlobe,
    color: "from-purple-500 to-pink-500",
    resources: [
      { name: "Open Yale History", url: "https://oyc.yale.edu/history", description: "Ancient to Modern History courses" },
      { name: "MIT OCW Anthropology", url: "https://ocw.mit.edu/search/?q=anthropology", description: "Cultural anthropology, archaeology" },
      { name: "Internet Archive", url: "https://archive.org/details/texts", description: "Historical documents, speeches, letters" },
      { name: "JSTOR Daily", url: "https://daily.jstor.org", description: "Academic articles explained for students" }
    ]
  },
  {
    subject: "🎭 Philosophy",
    icon: HiOutlinePencil,
    color: "from-rose-500 to-red-500",
    resources: [
      { name: "Open Yale Philosophy", url: "https://oyc.yale.edu/philosophy", description: "Philosophy of Death, Ethics, Political Philosophy" },
      { name: "MIT OCW Philosophy", url: "https://ocw.mit.edu/search/?q=philosophy", description: "Ancient Philosophy, Ethics, Philosophy of Mind" },
      { name: "Stanford Encyclopedia", url: "https://plato.stanford.edu", description: "Comprehensive philosophy encyclopedia" },
      { name: "Project Gutenberg", url: "https://www.gutenberg.org/ebooks/subject/74", description: "Plato, Aristotle, Nietzsche, Kant" }
    ]
  },
  {
    subject: "🗣️ Languages",
    icon: HiOutlineTranslate,
    color: "from-indigo-500 to-blue-500",
    resources: [
      { name: "Duolingo", url: "https://www.duolingo.com", description: "Learn French, Spanish, German, Chinese, Japanese" },
      { name: "Open Yale French", url: "https://oyc.yale.edu/french", description: "French language and culture courses" },
      { name: "MIT Linguistics", url: "https://ocw.mit.edu/search/?q=linguistics", description: "Introduction to Linguistics" },
      { name: "Busuu", url: "https://www.busuu.com", description: "Language learning with native speakers" }
    ]
  },
  {
    subject: "🎨 Art & Music",
    icon: HiOutlineLibrary,
    color: "from-yellow-500 to-amber-500",
    resources: [
      { name: "Open Yale Music", url: "https://oyc.yale.edu/music", description: "Introduction to Classical Music" },
      { name: "MIT Art History", url: "https://ocw.mit.edu/search/?q=art+history", description: "Modern Art, Architecture, Photography" },
      { name: "Met Museum", url: "https://www.metmuseum.org/art/collection", description: "Free art collection online" },
      { name: "Musopen", url: "https://musopen.org", description: "Free classical music recordings and sheet music" }
    ]
  },
  {
    subject: "💻 Digital Skills",
    icon: HiOutlineSearch,
    color: "from-slate-500 to-gray-500",
    resources: [
      { name: "Google Scholar", url: "https://scholar.google.com", description: "Search academic papers, theses, books" },
      { name: "Zotero", url: "https://www.zotero.org", description: "Free citation manager for research papers" },
      { name: "Khan Academy CS", url: "https://www.khanacademy.org/computing", description: "Intro to programming, algorithms" },
      { name: "Coursera", url: "https://www.coursera.org", description: "Audit thousands of university courses free" }
    ]
  }
];

export function Library() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex p-4 rounded-3xl mb-4" style={{ background: 'linear-gradient(135deg, #1b5f56 0%, #247d70 100%)' }}>
          <HiOutlineBookOpen size={40} className="text-white" />
        </div>
        <h1 className="text-3xl font-bold text-seafoam-900">AUY Digital Library</h1>
        <p className="text-seafoam-600 mt-2 max-w-2xl mx-auto">
          Curated free resources for Year 1 & 2 Liberal Arts and Science students
        </p>
      </div>

      {/* Subject Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {subjectResources.map((subject, idx) => {
          const Icon = subject.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className={bsolute inset-0 bg-gradient-to-br  opacity-10 group-hover:opacity-20 transition-opacity} />
              <div className="relative p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className={w-12 h-12 rounded-2xl bg-gradient-to-br  flex items-center justify-center shadow-lg}>
                    <Icon size={24} className="text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-seafoam-900">{subject.subject}</h2>
                </div>
                <div className="space-y-3">
                  {subject.resources.map((resource, i) => (
                    <a
                      key={i}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-3 rounded-xl hover:bg-white/50 transition-all group/link"
                    >
                      <p className="font-semibold text-seafoam-800 text-sm group-hover/link:text-seafoam-900">
                        {resource.name}
                      </p>
                      <p className="text-xs text-seafoam-500 mt-1 line-clamp-2">
                        {resource.description}
                      </p>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Featured Resources Banner */}
      <div className="glass-card p-6 bg-gradient-to-r from-seafoam-50 to-white">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-2xl bg-seafoam-100">
            <HiOutlineSparkles size={28} className="text-seafoam-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-seafoam-900">🎓 Recommended for First-Year Students</h3>
            <p className="text-sm text-seafoam-600 mt-1">Start with these essential resources:</p>
            <div className="flex flex-wrap gap-2 mt-3">
              <a href="https://openstax.org" target="_blank" rel="noopener noreferrer" className="px-3 py-1 bg-white rounded-full text-xs text-seafoam-700 shadow-sm hover:shadow-md transition">📖 OpenStax Textbooks</a>
              <a href="https://www.khanacademy.org" target="_blank" rel="noopener noreferrer" className="px-3 py-1 bg-white rounded-full text-xs text-seafoam-700 shadow-sm hover:shadow-md transition">🎥 Khan Academy</a>
              <a href="https://oyc.yale.edu" target="_blank" rel="noopener noreferrer" className="px-3 py-1 bg-white rounded-full text-xs text-seafoam-700 shadow-sm hover:shadow-md transition">🏛️ Open Yale Courses</a>
              <a href="https://scholar.google.com" target="_blank" rel="noopener noreferrer" className="px-3 py-1 bg-white rounded-full text-xs text-seafoam-700 shadow-sm hover:shadow-md transition">🔍 Google Scholar</a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-seafoam-400 py-4">
        <p>All resources are free. Some may require a free account. For AUY students and faculty.</p>
      </div>
    </div>
  );
}
