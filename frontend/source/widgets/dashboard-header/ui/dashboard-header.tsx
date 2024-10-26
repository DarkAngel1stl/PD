'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useMediaQuery } from 'react-responsive';
import { LogOutIcon, MenuIcon, UserIcon } from 'lucide-react';

import { Drawer, DrawerContent, DrawerTrigger } from '@/shared/ui/drawer';
import { ScrollArea } from '@/shared/ui/scroll-area';
import { Logotype } from '@/shared/ui/logotype';
import { Button } from '@/shared/ui/button';
import { useAccountStore } from '@/entities/account';

const items = [
  { text: 'Статистика', href: '/dashboard' },
  { text: 'Предложения', href: '/offers' },
  { text: 'База данных', href: '/database' },
];

export const DashboardHeader = () => {
  const logout = useAccountStore((state) => state.logout);

  const [isOpened, setIsOpened] = useState<boolean>(false);

  const isDesktop = useMediaQuery({ query: '(min-width: 1024px)' });

  const pathname = usePathname();

  useEffect(() => setIsOpened(false), [pathname]);

  useEffect(() => {
    if (isOpened && isDesktop) {
      setIsOpened(false);
    }
  }, [isDesktop]);

  return (
    <header className="sticky top-0 z-10 w-full bg-primary shadow-md">
      <Drawer open={isOpened} onOpenChange={setIsOpened}>
        <div className="container">
          <nav className="flex h-16 items-center justify-between">
            <Link href="/">
              <Logotype className="h-8 w-10 text-white" />
            </Link>

            <div className="hidden gap-x-8 lg:flex">
              {items.map((item, idx) => (
                <Link
                  key={`navigation-item-${idx}`}
                  href={item.href}
                  className="font-medium text-white"
                >
                  {item.text}
                </Link>
              ))}
            </div>

            <div className="-mr-2 hidden gap-x-6 lg:flex">
              <Button
                size="icon"
                variant="ghost"
                className="hover:bg-red-700/30"
                onClick={() => logout()}
              >
                <LogOutIcon className="h-6 w-6 text-white" />
              </Button>
            </div>

            <DrawerTrigger className="lg:hidden" asChild>
              <Button
                type="button"
                size="icon"
                variant="ghost"
                className="-mr-2 hover:bg-red-700/30"
              >
                <MenuIcon className="h-6 w-6 text-white" />
              </Button>
            </DrawerTrigger>
          </nav>
        </div>

        <DrawerContent className="h-[60%]">
          <ScrollArea className="h-full w-full">
            <nav className="flex h-full flex-col justify-between gap-y-2 px-6 pb-4">
              <div className="flex flex-col items-center gap-y-2">
                {items.map((item, idx) => (
                  <Button
                    key={`mobile-navigation-item-${idx}`}
                    variant="ghost"
                    className="w-full"
                    asChild
                  >
                    <Link href={item.href}>{item.text}</Link>
                  </Button>
                ))}
              </div>

              <div className="flex flex-col items-center gap-y-2">
                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={() => logout()}
                >
                  Выйти из аккаунта
                </Button>
              </div>
            </nav>
          </ScrollArea>
        </DrawerContent>
      </Drawer>
    </header>
  );
};
