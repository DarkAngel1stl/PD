import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';

import { IEvent } from '..';
import { Button } from '@/shared/ui/button';

export const EventCard = ({ event }: { event: IEvent }) => {
  return (
    <div className="flex flex-col rounded-lg border bg-white shadow-sm lg:h-[20rem] lg:flex-row">
      <div className="relative h-48 w-full border-b lg:h-auto lg:border-b-0 lg:border-r">
        <Image
          src={event.images.length > 0 ? event.images[0] : '/card.png'}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          alt="Изображение мероприятия"
          className="rounded-t-lg object-cover lg:rounded-none lg:rounded-s-lg"
        />
        <div className="absolute left-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white font-semibold text-primary shadow-sm">
          {event.ageCategory}
        </div>
      </div>

      <div className="flex w-full flex-col gap-y-2 px-3 py-3 lg:px-6">
        {event.categories.length > 0 && (
          <div className="hidden flex-wrap gap-1 lg:flex">
            {event.categories.map((category) => (
              <div
                key={`category-id-${category.id}`}
                className="rounded-lg bg-primary px-2 py-1 text-white"
              >
                {category.title}
              </div>
            ))}
          </div>
        )}
        <div className="flex items-center gap-x-1">
          <CalendarIcon className="h-5 w-5 text-gray-400" />
          <span className="text-gray-400">
            {`${format(event.startDate, 'dd.MM.yyyy H:mm', { locale: ru })} -
                ${format(event.endDate, 'dd.MM.yyyy H:mm', { locale: ru })}`}
          </span>
        </div>
        <h3 className="line-clamp-1 text-lg font-semibold text-zinc-950 lg:text-xl">
          {event.title}
        </h3>
        <p className="line-clamp-4 text-gray-400">{event.content}</p>
        <Button asChild>
          <Link className="mt-auto py-2.5" href={`events/${event.id}`}>
            Подробнее
          </Link>
        </Button>
      </div>
    </div>
  );
};
