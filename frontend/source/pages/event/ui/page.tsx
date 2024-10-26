import axios from 'axios';
import Image from 'next/image';

import { IEvent } from '@/entities/event';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/shared/ui/carousel';
import { ru } from 'date-fns/locale';
import { formatInTimeZone } from 'date-fns-tz';
import { Button } from '@/shared/ui/button';
import Link from 'next/link';
import { MapPinIcon } from 'lucide-react';
import { Map } from '@/widgets/map';
import { SubscriptionButton } from './subscription-button';

const getEvent = async (id: string): Promise<IEvent> => {
  const data = await axios
    .get(
      `https://social-programs-portal-backend.vercel.app/api/publications/events/${id}`
    )
    .then((response) => response.data)
    .catch(() => {
      throw new Error('Failed to fetch data');
    });

  return data;
};

export const Page = async ({ params: { id } }: { params: { id: string } }) => {
  const event: IEvent = await getEvent(id);

  return (
    <div>
      <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight text-zinc-950 lg:text-4xl">
        {event.title}
      </h1>

      <div className="relative mt-4 h-48 md:h-64 lg:h-96">
        {event.images.length === 0 && (
          <Image
            src="/card.png"
            width={1920}
            height={1080}
            priority
            className="h-full w-full rounded-lg border border-gray-300 object-cover shadow-sm"
            alt="Стандартное изображение"
          />
        )}

        {event.images.length === 1 && (
          <Image
            src={event.images[0]}
            width={1920}
            height={1080}
            priority
            className="h-full w-full rounded-lg border border-gray-300 object-cover shadow-sm"
            alt="Иллюстрация мероприятия"
          />
        )}

        {event.images.length > 1 && (
          <Carousel>
            <CarouselContent>
              {event.images.map((image, index) => (
                <CarouselItem
                  className="h-48 md:h-64 lg:h-96"
                  key={`event-image-${index}`}
                >
                  <Image
                    src={image}
                    width={1920}
                    height={1080}
                    priority
                    className="h-full w-full rounded-lg border object-cover shadow-sm"
                    alt={`Изображение мероприятия ${index}`}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious
              type="button"
              className="left-4 top-1/2 -translate-y-1/2 hover:bg-white hover:text-zinc-950"
            />
            <CarouselNext
              type="button"
              className="right-4 top-1/2 -translate-y-1/2 hover:bg-white hover:text-zinc-950"
            />
          </Carousel>
        )}
        <div className="absolute left-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white font-semibold text-primary shadow-sm">
          {event.ageCategory}
        </div>
      </div>

      <div className="mt-4">
        <div className="mt-10 flex flex-col gap-5 lg:grid lg:grid-cols-12">
          <div className="col-span-7 flex flex-col">
            <table className="table-auto">
              <tbody>
                {event.content && (
                  <tr>
                    <td className="pr-3 align-top text-gray-400 lg:text-lg">
                      Описание
                    </td>
                    <td className="text-zinc-950 lg:text-lg">
                      {event.content}
                    </td>
                  </tr>
                )}

                {event.organizer.name && (
                  <tr>
                    <td className="pr-3 pt-5 align-top text-gray-400 lg:text-lg">
                      Организатор
                    </td>
                    <td className="pt-5 text-zinc-950 lg:text-lg">
                      {event.organizer.name}
                    </td>
                  </tr>
                )}

                {event.startDate && event.endDate && (
                  <>
                    <tr>
                      <td className="pr-3 pt-5 align-top text-gray-400 lg:text-lg">
                        Дата
                      </td>
                      <td className="pt-5 text-base text-zinc-950 lg:text-lg">
                        {`${formatInTimeZone(event.startDate, 'Europe/Moscow', 'PPP', { locale: ru })} -
                          ${formatInTimeZone(event.endDate, 'Europe/Moscow', 'PPP', { locale: ru })}`}
                      </td>
                    </tr>

                    <tr>
                      <td className="pr-3 pt-5 align-top text-gray-400 lg:text-lg">
                        Время
                      </td>
                      <td className="pt-5 text-base text-zinc-950 lg:text-lg">
                        {`${formatInTimeZone(event.startDate, 'Europe/Moscow', 'H:mm', { locale: ru })} -
                          ${formatInTimeZone(event.endDate, 'Europe/Moscow', 'H:mm', { locale: ru })}`}
                      </td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>

            {event.website && (
              <div className="mt-5 flex flex-col items-center justify-center gap-2 lg:flex-row">
                <Button asChild>
                  <Link href={event.website}>Перейти на сайт организатора</Link>
                </Button>

                <SubscriptionButton event={event} />
              </div>
            )}
          </div>

          {event.address.text && (
            <div className="col-span-5 flex flex-col gap-4">
              <span className="text-gray-400 lg:text-lg">
                Адрес проведения мероприятия
              </span>
              <div className="flex items-center gap-1 text-sm text-red-600 lg:text-lg">
                <MapPinIcon className="h-[1.125rem] w-[1.125rem]" />
                <span>{event.address.text}</span>
              </div>
              <Map coordinates={event.address.point} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
