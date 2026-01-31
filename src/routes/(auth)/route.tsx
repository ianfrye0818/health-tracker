import { useAuth } from '@/features/auth/hooks';
import { createFileRoute, Navigate, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/(auth)')({
  component: RouteComponent,
})

function RouteComponent() {
    const { user } = useAuth();

    if (user) return <Navigate to='/dashboard' />
    
    return <Outlet />
}
