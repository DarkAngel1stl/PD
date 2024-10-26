import axios from 'axios';
import Image from 'next/image';

import { IClub } from '@/entities/club';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/shared/ui/carousel';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Button } from '@/shared/ui/button';
import Link from 'next/link';
import { MapPinIcon } from 'lucide-react';
import { Map } from '@/widgets/map';

const getClub = async (id: string): Promise<IClub> => {
  const data = await axios
    .get(
      `https://social-programs-portal-backend.vercel.app/api/publications/clubs/${id}`
    )
    .then((response) => response.data)
    .catch(() => {
      throw new Error('Failed to fetch data');
    });

  return data;
};

export const Page = async ({ params: { id } }: { params: { id: string } }) => {
  const club: IClub = await getClub(id);

  return (
    <div>
      <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight text-zinc-950 lg:text-4xl">
        {club.title}
      </h1>

      <div className="relative mt-4 h-48 md:h-64 lg:h-96">
        {club.images.length === 0 && (
          <Image
            src="/card.png"
            width={1920}
            height={1080}
            priority
            className="h-full w-full rounded-lg border border-gray-300 object-cover shadow-sm"
            alt="Стандартное изображение"
          />
        )}

        {club.images.length === 1 && (
          <Image
            src={club.images[0]}
            width={1920}
            height={1080}
            priority
            className="h-full w-full rounded-lg border border-gray-300 object-cover shadow-sm"
            alt="Иллюстрация кружка или секции"
          />
        )}

        {club.images.length > 1 && (
          <Carousel>
            <CarouselContent>
              {club.images.map((image, index) => (
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
                    alt={`Изображение кружка или секции ${index}`}
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
        <div className="absolute left-3 top-3 flex h-10 items-center justify-center rounded-full bg-white px-3 font-semibold text-primary shadow-sm">
          {club.ageCategory.from}-{club.ageCategory.to}
        </div>
      </div>

      <div className="mt-4">
        <div className="mt-10 flex flex-col gap-5 lg:grid lg:grid-cols-12">
          <div className="col-span-7 flex flex-col">
            <table className="table-auto">
              <tbody>
                {club.content && (
                  <tr>
                    <td className="pr-3 align-top text-gray-400 lg:text-lg">
                      Описание
                    </td>
                    <td className="text-zinc-950 lg:text-lg">{club.content}</td>
                  </tr>
                )}

                {club.organizer.name && (
                  <tr>
                    <td className="pr-3 pt-5 align-top text-gray-400 lg:text-lg">
                      Организатор
                    </td>
                    <td className="pt-5 text-zinc-950 lg:text-lg">
                      {club.organizer.name}
                    </td>
                  </tr>
                )}

                {club.type && (
                  <tr>
                    <td className="pr-3 pt-5 align-top text-gray-400 lg:text-lg">
                      Тип
                    </td>
                    <td className="pt-5 text-zinc-950 lg:text-lg">
                      {club.type === 'section' ? 'Секция' : 'Кружок'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {club.website && (
              <div className="mt-5 flex justify-center">
                <Button asChild>
                  <Link href={club.website}>Перейти на сайт организатора</Link>
                </Button>
              </div>
            )}
          </div>

          {club.address.text && (
            <div className="col-span-5 flex flex-col gap-4">
              <span className="text-gray-400 lg:text-lg">
                Адрес проведения мероприятия
              </span>
              <div className="flex items-center gap-1 text-sm text-red-600 lg:text-lg">
                <MapPinIcon className="h-[1.125rem] w-[1.125rem]" />
                <span>{club.address.text}</span>
              </div>
              <Map coordinates={club.address.point} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
