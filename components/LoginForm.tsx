//components/LoginForm
'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import * as yup from 'yup';
import Link from 'next/link';
import { FaUser, FaLock, FaGoogle } from 'react-icons/fa';
import { signIn } from 'next-auth/react';

export default function LoginForm({ from = '/dashboard' }: { from?: string }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const loginSchema = yup.object().shape({
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required'),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
  
    try {
      await loginSchema.validate({ username, password });
      const result = await signIn('credentials', {
        username,
        password,
        redirect: false,
      });
  
      if (result?.error) {
        setError(result.error);
      } else {
        console.log('Login successful, redirecting...');
        router.push(from);
      }
    } catch (validationError) {
      setError(validationError.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    signIn('google', { callbackUrl: from });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="bg-red-500 bg-opacity-50 text-white px-4 py-3 rounded">{error}</div>}
      <div className="relative">
        <label htmlFor="username" className="block mb-1 text-gray-300">Username</label>
        <div className="flex items-center">
          <FaUser className="absolute left-3 text-gray-400" />
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full pl-10 pr-3 py-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:border-gray-500"
            required
          />
        </div>
      </div>
      <div className="relative">
        <label htmlFor="password" className="block mb-1 text-gray-300">Password</label>
        <div className="flex items-center">
          <FaLock className="absolute left-3 text-gray-400" />
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-10 pr-3 py-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:border-gray-500"
            required
          />
        </div>
      </div>
      <button 
        type="submit" 
        className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 disabled:bg-indigo-400"
        disabled={isLoading}
      >
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
      <button 
        type="button"
        onClick={handleGoogleLogin}
        className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 flex items-center justify-center"
      >
        <FaGoogle className="mr-2" /> Login with Google
      </button>
      <div className="text-center">
        <Link href="/forgot-password" className="text-indigo-300 hover:underline">
          Forgot Password?
        </Link>
      </div>
    </form>
  );
}