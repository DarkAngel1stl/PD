'use client';

import { useAuth } from '@/app/contexts/auth-context';
import { IEvent } from '@/entities/event';
import { Button } from '@/shared/ui/button';
import { ScrollArea, ScrollBar } from '@/shared/ui/scroll-area';
import axios from 'axios';
import { LoaderIcon, LogOutIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type CardProps = {
  event: IEvent;
};

const Card = ({ event }: CardProps) => {
  return (
    <Link href={`/events/${event.id}`}>
      <div className="flex w-full items-center gap-3 rounded-md border p-2">
        <img
          alt="Event Image"
          src={event.images.length > 0 ? event.images[0] : '/card.png'}
          className="aspect-video h-16 rounded-md"
        />
        <div className="flex flex-col gap-1">
          <span className="line-clamp-1 text-sm font-semibold text-zinc-950 lg:text-base">
            {event.title}
          </span>
          <span className="line-clamp-2 text-xs font-medium text-gray-400 lg:text-sm">
            {event.content}
          </span>
        </div>
      </div>
    </Link>
  );
};

export const Page = () => {
  const { user, logout, loading } = useAuth();
  const [cards, setCards] = useState<IEvent[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    if (!user && !loading) {
      router.replace('/tg-login');
    }
  }, [user, router, loading]);

  useEffect(() => {
    (async () => {
      if (user) {
        const res = await axios
          .get(
            `https://social-programs-portal-backend.vercel.app/api/publications/events/subscribed/${user.id}`
          )
          .then((response) => response.data)
          .catch(() => {
            throw new Error('Failed to fetch data');
          })
          .finally(() => setIsLoading(false));
        const data = res.map((i: any) => i.event);
        setCards(data);
      }
    })();
  }, [user]);

  if (loading) {
    return (
      <div className="flex min-h-screen grow items-center justify-center">
        <LoaderIcon className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="relative flex flex-col items-center justify-center gap-4">
      <span className="mb-4 scroll-m-20 text-3xl font-extrabold tracking-tight text-zinc-950 lg:text-4xl">
        Страница профиля
      </span>
      <div className="relative h-24 w-24 lg:h-48 lg:w-48">
        <img
          alt="User photo"
          src={user.photo_url}
          className="h-full w-full rounded-full object-cover"
        />
        <Button
          type="button"
          size="icon"
          variant="ghost"
          onClick={() => {
            logout();
            router.replace('/');
          }}
          className="absolute -right-10 top-0 z-10"
        >
          <LogOutIcon className="h-6 w-6" />
        </Button>
      </div>
      <div className="flex flex-col items-center justify-center gap-1">
        <span className="text-lg font-semibold text-zinc-950 lg:text-2xl">
          {user.first_name ? user.first_name : ''}{' '}
          {user.last_name ? user.last_name : ''}
        </span>
        <span className="text-base font-medium text-gray-400">
          @{user.username}
        </span>
      </div>
      <ScrollArea className="h-72 w-full max-w-[40rem] rounded-md border">
        <div className="flex flex-col items-center gap-2 p-4">
          {isLoading ? (
            <LoaderIcon className="h-8 w-8 animate-spin text-primary" />
          ) : cards.length > 0 ? (
            cards.map((card) => <Card key={card.id} event={card} />)
          ) : (
            <p className="text-center text-base font-medium text-gray-400">
              Вы не подписаны на события
            </p>
          )}
        </div>
        <ScrollBar orientation="vertical" />
      </ScrollArea>
    </div>
  );
};
