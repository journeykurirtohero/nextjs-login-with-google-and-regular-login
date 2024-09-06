//app/reset-password/page.tsx
import ResetPasswordForm from '@/components/ResetPasswordForm';
import PublicLayout from '@/components/PublicLayout';

export default function ResetPasswordPage() {
  return (
    <PublicLayout>
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Reset Password</h1>
        <ResetPasswordForm />
      </div>
    </PublicLayout>
  );
}