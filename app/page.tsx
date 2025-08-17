'use client';

import { useAuth } from '@/lib/auth-context';
import { LoginForm } from '@/components/auth/login-form';
import { Dashboard } from '@/components/dashboard/dashboard';

export default function Home() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white">Loading Astrikos AI S!aP Platform...</div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  return <Dashboard />;
}