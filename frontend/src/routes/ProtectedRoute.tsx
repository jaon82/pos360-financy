import type { ReactNode } from 'react';
import { Navigate } from 'react-router';
import { useAuthStore } from '@/store/auth';

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    <Navigate to="/login" replace />;
  }

  return children;
}
