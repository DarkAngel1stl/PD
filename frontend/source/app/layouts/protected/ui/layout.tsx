'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { DashboardHeader } from '@/widgets/dashboard-header';
import { useAccountStore } from '@/entities/account';
import { LoaderIcon } from 'lucide-react';

export const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { account, loading } = useAccountStore((state) => ({
    account: state.account,
    loading: state.loading,
  }));

  const router = useRouter();

  useEffect(() => {
    if (!account && !loading) {
      router.push('/login');
    }
  }, [account, loading]);

  if (loading) {
    return (
      <div className="flex min-h-screen grow items-center justify-center">
        <LoaderIcon className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (account) {
    return (
      <>
        <DashboardHeader />
        <main className="flex-1">
          <div className="container py-8">{children}</div>
        </main>
      </>
    );
  }
};
