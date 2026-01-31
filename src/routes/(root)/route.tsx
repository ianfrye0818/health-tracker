import { DashboardShell } from '@/components/layout/DashboardShell';
import { useAuth } from '@/features/auth/hooks';
import { createFileRoute, Navigate, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/(root)')({
  component: RouteComponent,
})

function RouteComponent() {
  const { user } = useAuth();

  if (!user) return <Navigate to='/login' />

  return (
    <DashboardShell>
      <Outlet />
    </DashboardShell>
  );
}
