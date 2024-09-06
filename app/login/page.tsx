//app/login/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import LoginForm from '@/components/LoginForm';
import SignupForm from '@/components/SignupForm';
import { useAuth } from '@/context/AuthContext';
export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get('from') || '/dashboard';

  useEffect(() => {
    if (user) {
      router.push(from);
    }
  }, [user, router, from]);

  if (user) {
    return <div>Redirecting...</div>;
  }

  return (
    <div className="min-h-screen w-full bg-cover bg-center flex items-center justify-center"
         style={{backgroundImage: "url('/gambar-login/background2.jpg')"}}>
      <div className="w-full max-w-md">
        <div className="bg-gray-800 bg-opacity-80 rounded-t-lg overflow-hidden">
          <div className="flex">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 ${isLogin ? 'bg-gray-700 text-white' : 'bg-gray-600 text-gray-300'}`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 ${!isLogin ? 'bg-gray-700 text-white' : 'bg-gray-600 text-gray-300'}`}
            >
              Signup
            </button>
          </div>
        </div>
        <div className="bg-gray-800 bg-opacity-80 p-8 rounded-b-lg shadow-lg">
          {isLogin ? <LoginForm from={from} /> : <SignupForm from={from} />}
        </div>
      </div>
    </div>
  );
}