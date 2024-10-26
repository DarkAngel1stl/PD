import type { Metadata } from 'next';
import { Roboto_Flex } from 'next/font/google';
import { cn } from 'clsx-tailwind-merge';
import { CookiesProvider } from 'next-client-cookies/server';

import '@/app/styles/globals.css';
import { Toaster } from '@/shared/ui/toaster';

const font = Roboto_Flex({
  subsets: ['latin'],
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: 'Портал социальных программ',
  icons: {
    icon: '/favicon.ico',
  },
};

export const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <CookiesProvider>
      <html lang="ru" className="h-full">
        <body
          className={cn('flex min-h-full flex-col antialiased', font.variable)}
        >
          {children}
          <Toaster />
        </body>
      </html>
    </CookiesProvider>
  );
};
