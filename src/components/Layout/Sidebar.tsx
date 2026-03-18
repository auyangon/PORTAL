import { motion } from 'framer-motion';
import {
  HiOutlineViewGrid,
  HiOutlineBookOpen,
  HiOutlineLightningBolt,
  HiOutlineDocumentText,
  HiOutlineCalendar,
  HiOutlineSpeakerphone,
  HiOutlineClipboardList,
  HiOutlineLogout,
  HiOutlineAcademicCap,
} from 'react-icons/hi';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: HiOutlineViewGrid },
  { id: 'courses', label: 'Courses', icon: HiOutlineBookOpen },
  { id: 'quests', label: 'Quests', icon: HiOutlineLightningBolt },
  { id: 'materials', label: 'Materials', icon: HiOutlineDocumentText },
  { id: 'schedule', label: 'Schedule', icon: HiOutlineCalendar },
  { id: 'announcements', label: 'Announcements', icon: HiOutlineSpeakerphone },
  { id: 'requests', label: 'Requests', icon: HiOutlineClipboardList },
];

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="fixed left-0 top-0 h-screen w-72 z-50 flex flex-col"
      style={{
        background: 'linear-gradient(165deg, #0d312c 0%, #12423c 30%, #1b5f56 70%, #247d70 100%)',
      }}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute -top-24 -right-24 w-48 h-48 rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #66c3b7 0%, transparent 70%)' }}
        />
        <div 
          className="absolute bottom-32 -left-16 w-32 h-32 rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, #2d9a8a 0%, transparent 70%)' }}
        />
        <div 
          className="absolute top-1/2 right-0 w-24 h-24 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #33af9f 0%, transparent 70%)' }}
        />
      </div>

      {/* Logo Section */}
      <div className="relative px-6 py-8">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="flex items-center gap-4"
        >
          <div 
            className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg"
            style={{ 
              background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%)',
              border: '1px solid rgba(255,255,255,0.2)',
            }}
          >
            <HiOutlineAcademicCap className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">AUY</h1>
            <p className="text-xs font-medium text-white/60">Student Portal</p>
          </div>
        </motion.div>
      </div>

      {/* Navigation */}
      <nav className="relative flex-1 px-4 py-4 overflow-y-auto scrollbar-hide">
        <div className="space-y-1.5">
          {menuItems.map((item, index) => {
            const isActive = activeTab === item.id;
            const Icon = item.icon;
            
            return (
              <motion.button
                key={item.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 + index * 0.05, duration: 0.3 }}
                onClick={() => setActiveTab(item.id)}
                className={`
                  group relative w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl
                  transition-all duration-300 ease-out
                  ${isActive 
                    ? 'text-white' 
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                  }
                `}
              >
                {/* Active indicator background */}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-2xl"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 100%)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      boxShadow: '0 4px 24px rgba(0,0,0,0.1)',
                    }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                
                {/* Active indicator line */}
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-full"
                    style={{
                      background: 'linear-gradient(180deg, #66c3b7 0%, #2d9a8a 100%)',
                      boxShadow: '0 0 12px rgba(102, 195, 183, 0.5)',
                    }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                
                <Icon className={`relative z-10 w-5 h-5 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-105'}`} />
                <span className="relative z-10 text-sm font-medium">{item.label}</span>
                
                {/* Hover glow effect */}
                {!isActive && (
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      background: 'radial-gradient(circle at center, rgba(102, 195, 183, 0.1) 0%, transparent 70%)',
                    }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </nav>

      {/* Bottom Section */}
      <div className="relative px-4 pb-6">
        {/* Divider */}
        <div 
          className="h-px mb-4 mx-2"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)',
          }}
        />
        
        {/* University Badge */}
        <div 
          className="mx-2 p-4 rounded-2xl mb-4"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.04) 100%)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <p className="text-xs text-white/40 mb-1">American University</p>
          <p className="text-sm font-semibold text-white/90">of Yangon</p>
          <div className="mt-2 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <p className="text-xs text-white/50">System Online</p>
          </div>
        </div>
        
        {/* Logout Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-white/60 hover:text-white hover:bg-white/5 transition-all duration-300"
        >
          <HiOutlineLogout className="w-5 h-5" />
          <span className="text-sm font-medium">Sign Out</span>
        </motion.button>
      </div>
    </motion.aside>
  );
}
