'use client';

import { useAuth } from '@/app/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import {
  TelegramLoginButton,
  TLoginButtonSize,
  TUser,
} from './telegram-login-button';
import { LoaderIcon } from 'lucide-react';

export const Page = () => {
  const { user, setUser, loading } = useAuth();
  const router = useRouter();

  const handleTelegramResponse = async (user: TUser) => {
    const response = await fetch('/api/telegram-auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    const { hash, ...data } = user;

    if (response.ok) {
      setUser(data);
    } else {
      console.error('Authentication failed');
    }
  };

  useEffect(() => {
    if (user && !loading) {
      router.push('/profile');
    }
  }, [user, router, loading]);

  if (loading) {
    return (
      <div className="flex min-h-screen grow items-center justify-center">
        <LoaderIcon className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (user) {
    return null;
  }

  return (
    <div className="mx-auto flex max-w-[24rem] flex-col items-center justify-center">
      <h1 className="mb-10 scroll-m-20 text-center text-3xl font-extrabold tracking-tight text-zinc-950 lg:text-4xl">
        Войти через Telegram
      </h1>

      <TelegramLoginButton
        botName="vcursebot"
        buttonSize={TLoginButtonSize.Large}
        cornerRadius={20}
        onAuthCallback={(user: TUser) => {
          handleTelegramResponse(user);
        }}
        requestAccess={'write'}
      />
    </div>
  );
};
