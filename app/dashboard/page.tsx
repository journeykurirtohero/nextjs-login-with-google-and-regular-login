//app/dashboard/page.tsx

'use client';

import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';
import { FaUser, FaEnvelope, FaShieldAlt, FaCreditCard, FaPhoneAlt } from 'react-icons/fa';

export default function Dashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const { theme } = useTheme();

  useEffect(() => {
    if (!user) {
      router.push('/login?from=/dashboard');
    }
  }, [user, router]);

  if (!user) {
    return <div>Loading...</div>;
  }

  const cardClass = `p-6 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} rounded-lg shadow-md`;
  const headerClass = `text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`;
  const textClass = theme === 'dark' ? 'text-gray-300' : 'text-gray-600';

  return (
    <div className="space-y-6">
      <h1 className={headerClass}>
        Welcome to Dashboard, {user.username}!
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className={cardClass}>
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <FaUser className="mr-2" /> Personal Information
          </h2>
          <p className={`flex items-center ${textClass}`}><FaUser className="mr-2" /> {user.username}</p>
          <p className={`flex items-center ${textClass}`}><FaEnvelope className="mr-2" /> {user.email}</p>
          <p className={`flex items-center ${textClass}`}><FaShieldAlt className="mr-2" /> Role: {user.role}</p>
        </div>

        <div className={cardClass}>
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <FaCreditCard className="mr-2" /> Bank Information
          </h2>
          <p className={textClass}>Bank: {user.namaBank || 'Not set'}</p>
          <p className={textClass}>Account Name: {user.namaRekening || 'Not set'}</p>
          <p className={textClass}>Account Number: {user.nomorRekening || 'Not set'}</p>
        </div>

        <div className={cardClass}>
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <FaPhoneAlt className="mr-2" /> Contact Information
          </h2>
          <p className={textClass}>Phone: {user.nohp || 'Not set'}</p>
        </div>
      </div>

      <div className={cardClass}>
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <p className={textClass}>No recent activity to display.</p>
      </div>
    </div>
  );
}