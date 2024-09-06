//components/Header
'use client';

import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { FaSun, FaMoon, FaUser, FaBars } from 'react-icons/fa';

const Header = ({ toggleSidebar }) => {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-blue-800 text-white shadow-md z-10 sticky top-0">
      <div className="py-2 px-4 flex justify-between items-center">
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="md:hidden mr-4 p-2 rounded-md bg-blue-700 hover:bg-blue-600"
            aria-label="Toggle sidebar"
          >
            <FaBars />
          </button>
          <h1 className="text-xl font-bold flex items-center">
            <FaUser className="mr-2" />
            {user?.username}
          </h1>
        </div>
        <button
          onClick={toggleTheme}
          className="p-1.5 rounded-full transition-colors duration-200 bg-blue-700 text-yellow-400 hover:bg-blue-600"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <FaSun size={18} /> : <FaMoon size={18} />}
        </button>
      </div>
    </header>
  );
};

export default Header;