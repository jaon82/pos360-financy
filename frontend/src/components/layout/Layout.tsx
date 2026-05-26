import { Toaster } from '../ui/sonner';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <div className="mx-auto w-full">{children}</div>
      <Toaster />
    </div>
  );
}
