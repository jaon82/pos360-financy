import type { ReactNode } from 'react';
import { Navigate } from 'react-router';
import { useAuthStore } from '@/store/auth';

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function PublicRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}
