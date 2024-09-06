//app/dashboard/layout.tsx
import AuthenticatedLayout from '@/components/AuthenticatedLayout';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AuthenticatedLayout>{children}</AuthenticatedLayout>;
}