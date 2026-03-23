import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  HiOutlineViewGrid, 
  HiOutlineBookOpen, 
  HiOutlineClipboardList, 
  HiOutlineDocumentText,
  HiOutlineCalendar,
  HiOutlineBell,
  HiOutlineClipboardCheck,
  HiOutlineUser,
  HiOutlineLogout,
  HiOutlineAcademicCap,
  HiOutlineLibrary
} from 'react-icons/hi';
import { useStudent } from '../../context/StudentContext';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isMobile?: boolean;
  onClose?: () => void;
}

const navItems = [
  { name: 'Dashboard', icon: HiOutlineViewGrid, tab: 'dashboard' },
  { name: 'Courses', icon: HiOutlineBookOpen, tab: 'courses' },
  { name: 'Quests', icon: HiOutlineClipboardList, tab: 'quests' },
  { name: 'Materials', icon: HiOutlineDocumentText, tab: 'materials' },
  { name: 'Schedule', icon: HiOutlineCalendar, tab: 'schedule' },
  { name: 'Attendance', icon: HiOutlineClipboardCheck, tab: 'attendance' },
  { name: 'Announcements', icon: HiOutlineBell, tab: 'announcements' },
  { name: 'Requests', icon: HiOutlineClipboardList, tab: 'requests' },
  { name: 'Library', icon: HiOutlineLibrary, tab: 'library' },
];

export default function Sidebar({ activeTab, setActiveTab, isMobile, onClose }: SidebarProps) {
  const { currentStudent, logout } = useStudent();

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    if (isMobile && onClose) onClose();
  };

  const containerClass = isMobile 
    ? 'w-64 bg-white/95 backdrop-blur-xl' 
    : 'w-72 fixed left-0 top-0 glass';

  return (
    <div className={`h-full ${containerClass} flex flex-col`}
         style={{ borderRight: '1px solid rgba(45, 154, 138, 0.1)' }}>
      <div className="p-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl flex items-center justify-center"
               style={{ background: 'linear-gradient(135deg, #1b5f56 0%, #247d70 100%)' }}>
            <HiOutlineAcademicCap size={24} className="text-white" />
          </div>
          <div>
            <h1 className="font-semibold text-lg text-seafoam-900">AUY Portal</h1>
            <p className="text-xs text-seafoam-500">{currentStudent?.studentId}</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.tab;
          return (
            <button
              key={item.tab}
              onClick={() => handleTabClick(item.tab)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl transition-all ${isActive ? 'shadow-lg' : ''}`}
              style={{
                background: isActive ? 'linear-gradient(135deg, #1b5f56 0%, #247d70 100%)' : 'transparent',
                color: isActive ? '#ffffff' : '#247d70'
              }}
            >
              <Icon size={20} />
              <span className="font-medium text-sm">{item.name}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t" style={{ borderColor: 'rgba(45, 154, 138, 0.1)' }}>
        <div className="flex items-center space-x-3 mb-3 px-2">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white"
               style={{ background: 'linear-gradient(135deg, #1b5f56 0%, #247d70 100%)' }}>
            <span className="text-sm font-medium">{currentStudent?.studentName?.charAt(0) || 'S'}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate text-seafoam-900">{currentStudent?.studentName || 'Student'}</p>
            <p className="text-xs truncate text-seafoam-500">{currentStudent?.email}</p>
          </div>
        </div>
        <button 
          onClick={logout}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-2xl transition-all"
          style={{ color: '#ef4444', background: 'rgba(239, 68, 68, 0.05)' }}
        >
          <HiOutlineLogout size={20} />
          <span className="font-medium text-sm">Logout</span>
        </button>
      </div>
    </div>
  );
}