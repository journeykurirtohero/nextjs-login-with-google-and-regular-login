//app/admin/page
'use client';

import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';
import { FaUsers, FaChartBar, FaCog } from 'react-icons/fa';

export default function AdminDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const { theme } = useTheme();

  useEffect(() => {
    if (!user) {
      router.push('/login?from=/admin');
    } else if (user.role !== 'admin') {
      router.push('/dashboard');
    }
  }, [user, router]);

  if (!user || user.role !== 'admin') {
    return <div>Loading...</div>;
  }

  const cardClass = `p-6 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} rounded-lg shadow-md`;

  return (
    <div className="space-y-6">
      <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
        Admin Dashboard
      </h1>
      <p className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
        Welcome, Admin {user.username}!
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className={cardClass}>
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <FaUsers className="mr-2" /> User Management
          </h2>
          <p>Total Users: 100</p>
          <p>New Users Today: 5</p>
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Manage Users
          </button>
        </div>

        <div className={cardClass}>
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <FaChartBar className="mr-2" /> Analytics
          </h2>
          <p>Active Users: 50</p>
          <p>Average Session Time: 15 minutes</p>
          <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
            View Reports
          </button>
        </div>

        <div className={cardClass}>
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <FaCog className="mr-2" /> System Settings
          </h2>
          <p>Last Backup: 2 hours ago</p>
          <p>System Version: 1.2.3</p>
          <button className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
            Manage Settings
          </button>
        </div>
      </div>

      <div className={cardClass}>
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <ul className="list-disc list-inside">
          <li>User John Doe updated their profile</li>
          <li>New user Jane Smith registered</li>
          <li>System backup completed successfully</li>
        </ul>
      </div>
    </div>
  );
}