'use client';

import { useEffect } from 'react';

import { useAccountStore } from '@/entities/account';
import { AuthProvider } from '@/app/contexts/auth-context';

export const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const getAccount = useAccountStore((state) => state.getAccount);

  useEffect(() => {
    getAccount();
  }, []);

  return <AuthProvider>{children}</AuthProvider>;
};
