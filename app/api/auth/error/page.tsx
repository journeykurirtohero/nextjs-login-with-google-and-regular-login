//app/error/page.tsx
'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function AuthError() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  let errorMessage = 'An unknown error occurred';
  if (error === 'OAuthAccountNotLinked') {
    errorMessage = 'This email is already associated with another account. Please sign in using your original account method.';
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Authentication Error</h1>
        <p className="text-red-500 mb-4">{errorMessage}</p>
        <Link href="/login" className="mt-4 inline-block text-blue-500 hover:underline">
          Return to login
        </Link>
      </div>
    </div>
  );
}