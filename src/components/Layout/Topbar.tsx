import React from 'react';
import { HiOutlineLogout } from 'react-icons/hi';
import { useStudent } from '../../context/StudentContext';

interface TopbarProps {
  title: string;
}

export function Topbar({ title }: TopbarProps) {
  const { currentStudent, logout } = useStudent();

  return (
    <div className="fixed top-0 right-0 left-72 h-16 bg-white/80 backdrop-blur-sm border-b z-10 flex items-center justify-between px-6">
      <h1 className="text-xl font-semibold text-seafoam-900">{title}</h1>
      <div className="flex items-center gap-4">
        <span className="text-sm text-seafoam-600">{currentStudent?.studentName}</span>
        <button 
          onClick={logout}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-red-600 hover:bg-red-50 transition"
        >
          <HiOutlineLogout size={18} />
          <span className="text-sm">Logout</span>
        </button>
      </div>
    </div>
  );
}
