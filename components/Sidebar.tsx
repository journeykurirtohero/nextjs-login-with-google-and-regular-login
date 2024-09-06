//components/Sidebar
'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { FaTachometerAlt, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const auth = useAuth();
  const user = auth?.user;
  const logout = auth?.logout;
  const { theme } = useTheme();
  const pathname = usePathname();
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setIsOpen]);

  if (!auth) return null;

  const getLinkClass = (path: string) => {
    const baseClass = "flex items-center py-2 px-3 rounded transition duration-200";
    const activeClass = "bg-blue-700 text-white";
    const inactiveClass = "text-gray-300 hover:bg-blue-700 hover:text-white";
    
    return `${baseClass} ${pathname === path ? activeClass : inactiveClass}`;
  };

  return (
    <div
      ref={sidebarRef}
      className={`bg-blue-900 w-64 h-screen flex flex-col py-3 px-2 shadow-lg fixed left-0 top-0 z-20 transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 md:static`}
    >
      <nav className="flex-1 space-y-2 mt-16 md:mt-0">
        <Link href="/dashboard" className={getLinkClass('/dashboard')} onClick={() => setIsOpen(false)}>
          <FaTachometerAlt className="mr-2" /> Dashboard
        </Link>
        <Link href="/profile" className={getLinkClass('/profile')} onClick={() => setIsOpen(false)}>
          <FaUser className="mr-2" /> Profile
        </Link>
        {user?.role === 'admin' && (
          <Link href="/admin" className={getLinkClass('/admin')} onClick={() => setIsOpen(false)}>
            <FaCog className="mr-2" /> Admin
          </Link>
        )}
      </nav>
      {logout && (
        <button
          onClick={() => {
            logout();
            setIsOpen(false);
          }}
          className="flex items-center py-2 px-3 rounded transition duration-200 text-gray-300 hover:bg-blue-700 hover:text-white w-full text-left mt-auto"
        >
          <FaSignOutAlt className="mr-2" /> Logout
        </button>
      )}
    </div>
  );
};

export default Sidebar;