'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { useAccountStore } from '@/entities/account';
import { LoaderIcon } from 'lucide-react';
import { toast } from 'sonner';
import { Label } from '@/shared/ui/label';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';

export const Page = () => {
  const { account, loading, error, login } = useAccountStore((state) => ({
    account: state.account,
    loading: state.loading,
    error: state.error,
    login: state.login,
  }));

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const router = useRouter();

  useEffect(() => {
    if (account && !loading) {
      router.push('/dashboard');
    }
  }, [account]);

  useEffect(() => {
    if (error && !loading) {
      toast('Произошла ошибка', {
        description: 'Возможно вы указали неверные данные',
      });
    }
  }, [loading]);

  if (loading) {
    return (
      <div className="flex grow items-center justify-center">
        <LoaderIcon className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!account) {
    return (
      <div className="mx-auto flex max-w-[24rem] flex-col">
        <h1 className="scroll-m-20 text-center text-3xl font-extrabold tracking-tight text-zinc-950 lg:text-4xl">
          Авторизация
        </h1>

        <div className="mt-10 flex flex-col gap-4">
          <div className="space-y-1">
            <Label htmlFor="login">Логин</Label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              id="login"
              placeholder="Введите имя пользователя"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="password">Пароль</Label>
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              placeholder="Введите пароль"
            />
          </div>

          <Button onClick={() => login({ email, password })}>Войти</Button>
        </div>
      </div>
    );
  }
};
