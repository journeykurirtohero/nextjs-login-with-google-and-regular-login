// components/SignupForm.tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import * as yup from 'yup';
import { FaUser, FaLock, FaEnvelope, FaIdCard, FaCreditCard, FaPhone, FaUniversity } from 'react-icons/fa';
import InputField from './InputField';
import { signIn } from 'next-auth/react';

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

export default function SignupForm() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    namaRekening: '',
    nomorRekening: '',
    namaBank: '',
    nohp: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  
  const signupSchema = yup.object().shape({
    username: yup.string().required('Username is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    email: yup.string().email('Invalid email address').required('Email is required'),
    namaRekening: yup.string().required('Nama Rekening is required'),
    nomorRekening: yup.string().required('Nomor Rekening is required'),
    namaBank: yup.string().required('Nama Bank is required'),
    nohp: yup.string().required('No HP is required'),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      console.log("Form Data Submitted:", formData); // Menampilkan form data di console
      await signupSchema.validate(formData, { abortEarly: false });
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      
      if (data.success) {
        const result = await signIn('credentials', {
          username: formData.username,
          password: formData.password,
          redirect: false,
        });
        if (result?.error) {
          setError(result.error);
        } else {
          router.push('/dashboard');
        }
      } else {
        setError(data.message || 'Signup failed');
      }
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        setError(error.errors.join(', '));
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="bg-red-500 bg-opacity-50 text-white px-4 py-3 rounded">{error}</div>}
      <InputField name="username" icon={<FaUser />} placeholder="Enter username" value={formData.username} onChange={handleChange} />
      <InputField name="password" icon={<FaLock />} placeholder="Enter password" value={formData.password} onChange={handleChange} type="password" />
      <InputField name="email" icon={<FaEnvelope />} placeholder="Enter email" value={formData.email} onChange={handleChange} type="email" />
      <InputField name="namaRekening" icon={<FaIdCard />} placeholder="Enter account name" value={formData.namaRekening} onChange={handleChange} />
      <InputField name="nomorRekening" icon={<FaCreditCard />} placeholder="Enter account number" value={formData.nomorRekening} onChange={handleChange} />
      <div className="relative">
        <FaUniversity className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <select
          name="namaBank"
          value={formData.namaBank}
          onChange={handleChange}
          className="w-full pl-10 pr-3 py-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:border-gray-500"
          required
        >
          <option value="">Select Bank</option>
          {bankList.map((bank, index) => (
            <option key={index} value={bank}>{bank}</option>
          ))}
        </select>
      </div>
      <InputField name="nohp" icon={<FaPhone />} placeholder="Enter phone number" value={formData.nohp} onChange={handleChange} />
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 disabled:bg-indigo-400"
        disabled={isLoading}
      >
        {isLoading ? 'Signing up...' : 'Sign Up'}
      </button>
    </form>
  );
}
