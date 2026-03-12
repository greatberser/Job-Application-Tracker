'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading, init } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  // start listening to Firebase auth state once on mount
  useEffect(() => {
    const unsubscribe = init();
    return unsubscribe; // cleanup on unmount
  }, []);

  useEffect(() => {
    if (loading) return;
    if (!user && pathname !== '/login') router.replace('/login');
    if (user && pathname === '/login') router.replace('/');
  }, [user, loading, pathname]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-400 text-sm">Loading...</p>
      </div>
    );
  }

  return <>{children}</>;
}
