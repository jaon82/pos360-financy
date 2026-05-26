import { Outlet } from 'react-router';
import Header from './Header';

export function AuthLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 w-full max-w-7xl mx-auto p-12">
        <Outlet />
      </main>
    </div>
  );
}
