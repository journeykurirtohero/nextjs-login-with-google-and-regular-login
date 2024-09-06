//components/AuthenticatedLayout
'use client';

import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
import { useTheme } from '@/context/ThemeContext';

const AuthenticatedLayout = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className={`flex min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className="flex flex-col flex-1 min-h-screen">
        <Header toggleSidebar={toggleSidebar} />
        <main className={`flex-1 overflow-x-hidden overflow-y-auto p-6 ${
          theme === 'dark' ? 'bg-gray-800 text-gray-200' : 'bg-gray-200 text-gray-800'
        }`}>
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default AuthenticatedLayout;