//app/profile/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';
import { FaEdit, FaUser, FaEnvelope, FaCreditCard, FaPhoneAlt } from 'react-icons/fa';
import EditModal from '@/components/EditModal';

const bankList = [
  "Bank Mandiri", "Bank Negara Indonesia (BNI)", "Bank Rakyat Indonesia (BRI)", "Bank Tabungan Negara (BTN)",
  "Bank Central Asia (BCA)", "Bank Danamon", "Bank CIMB Niaga", "Bank Maybank Indonesia",
  "Bank Permata", "Bank Panin", "Bank Mega", "Bank BTPN", "Bank Syariah Indonesia (BSI)",
  "Citibank N.A.", "HSBC Indonesia", "Standard Chartered Bank", "Deutsche Bank", "ANZ Indonesia",
  "J.P. Morgan Chase Bank", "Bank Muamalat Indonesia", "Bank Mega Syariah",
  "Bank Jabar Banten (BJB)", "Bank DKI", "Bank Sumsel Babel (BSB)", "Bank Kalbar", "Bank Kalsel",
  "Bank Papua", "Bank NTT", "Jenius (Bank BTPN)", "Digibank (DBS Bank)", "Kredivo",
  "Bank Koperasi Sejahtera (BKS)", "Bank Koperasi Syariah"
];

export default function Profile() {
  const { user, updateUser } = useAuth();
  const router = useRouter();
  const { theme } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editField, setEditField] = useState('');
  const [editValue, setEditValue] = useState('');

  useEffect(() => {
    if (!user) {
      router.push('/login?from=/profile');
    }

    return () => {
      // Clean up function
      setIsModalOpen(false);
    };
  }, [user, router]);

  if (!user) {
    return <div>Loading...</div>;
  }

  const handleEdit = (field: string) => {
    setEditField(field);
    setEditValue(user[field] || '');
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    try {
      await updateUser({ [editField]: editValue });
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  const ProfileItem = ({ label, value, field, icon }) => (
    <div className={`flex justify-between items-center mb-4 p-4 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg`}>
      <div className="flex items-center">
        {React.cloneElement(icon, { className: theme === 'dark' ? 'text-gray-300' : 'text-gray-500' })}
        <div className="ml-4">
          <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>{label}</h3>
          <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>{value || 'Not set'}</p>
        </div>
      </div>
      <button onClick={() => handleEdit(field)} className={`${theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-500 hover:text-blue-600'}`}>
        <FaEdit size={20} />
      </button>
    </div>
  );

  return (
    <div className={`max-w-2xl mx-auto mt-10 p-6 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'} rounded-lg shadow-md`}>
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
      <ProfileItem label="Username" value={user.username || user.name} field="username" icon={<FaUser size={24} />} />
      <ProfileItem label="Email" value={user.email} field="email" icon={<FaEnvelope size={24} />} />
      <ProfileItem label="Nama Rekening" value={user.namaRekening} field="namaRekening" icon={<FaCreditCard size={24} />} />
      <ProfileItem label="Nomor Rekening" value={user.nomorRekening} field="nomorRekening" icon={<FaCreditCard size={24} />} />
      <ProfileItem label="Nama Bank" value={user.namaBank} field="namaBank" icon={<FaCreditCard size={24} />} />
      <ProfileItem label="Nomor HP" value={user.nohp} field="nohp" icon={<FaPhoneAlt size={24} />} />
      <EditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        field={editField}
        value={editValue}
        setValue={setEditValue}
        theme={theme}
        bankList={bankList}
      />
    </div>
  );
}