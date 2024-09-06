//app/forgot-password/page.tsx
'use client';

import ForgotPasswordForm from '@/components/ForgotPasswordForm';
import PublicLayout from '@/components/PublicLayout';

export default function ForgotPasswordPage() {
  return (
    <PublicLayout>
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Forgot Password</h1>
        <ForgotPasswordForm />
      </div>
    </PublicLayout>
  );
}