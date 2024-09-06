//app/admin/layout
import AuthenticatedLayout from '@/components/AuthenticatedLayout';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AuthenticatedLayout>{children}</AuthenticatedLayout>;
}