import axios from 'axios';
import Image from 'next/image';

import { IProgram } from '@/entities/program';
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

const getProgram = async (id: string): Promise<IProgram> => {
  const data = await axios
    .get(
      `https://social-programs-portal-backend.vercel.app/api/publications/programs/${id}`
    )
    .then((response) => response.data)
    .catch(() => {
      throw new Error('Failed to fetch data');
    });

  return data;
};

export const Page = async ({ params: { id } }: { params: { id: string } }) => {
  const program: IProgram = await getProgram(id);

  return (
    <div>
      <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight text-zinc-950 lg:text-4xl">
        {program.title}
      </h1>

      <div className="relative mt-4 h-48 md:h-64 lg:h-96">
        {program.images.length === 0 && (
          <Image
            src="/card.png"
            width={1920}
            height={1080}
            priority
            className="h-full w-full rounded-lg border border-gray-300 object-cover shadow-sm"
            alt="Стандартное изображение"
          />
        )}

        {program.images.length === 1 && (
          <Image
            src={program.images[0]}
            width={1920}
            height={1080}
            priority
            className="h-full w-full rounded-lg border border-gray-300 object-cover shadow-sm"
            alt="Иллюстрация программы"
          />
        )}

        {program.images.length > 1 && (
          <Carousel>
            <CarouselContent>
              {program.images.map((image, index) => (
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
                    alt={`Изображение программы ${index}`}
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
      </div>

      <div className="mt-4">
        <div className="mt-10 flex flex-col gap-5">
          <div className="flex flex-col">
            <table className="table-auto">
              <tbody>
                {program.content && (
                  <tr>
                    <td className="pr-3 align-top text-gray-400 lg:text-lg">
                      Описание
                    </td>
                    <td className="text-zinc-950 lg:text-lg">
                      {program.content}
                    </td>
                  </tr>
                )}

                {program.organizer.name && (
                  <tr>
                    <td className="pr-3 pt-5 align-top text-gray-400 lg:text-lg">
                      Организатор
                    </td>
                    <td className="pt-5 text-zinc-950 lg:text-lg">
                      {program.organizer.name}
                    </td>
                  </tr>
                )}

                {program.isDated && program.startDate && program.endDate && (
                  <>
                    <tr>
                      <td className="pr-3 pt-5 align-top text-gray-400 lg:text-lg">
                        Дата
                      </td>
                      <td className="pt-5 text-base text-zinc-950 lg:text-lg">
                        {`${formatInTimeZone(program.startDate, 'Europe/Moscow', 'PPP', { locale: ru })} -
                        ${formatInTimeZone(program.endDate, 'Europe/Moscow', 'PPP', { locale: ru })}`}
                      </td>
                    </tr>

                    <tr>
                      <td className="pr-3 pt-5 align-top text-gray-400 lg:text-lg">
                        Время
                      </td>
                      <td className="pt-5 text-base text-zinc-950 lg:text-lg">
                        {`${formatInTimeZone(program.startDate, 'Europe/Moscow', 'H:mm', { locale: ru })} -
                        ${formatInTimeZone(program.endDate, 'Europe/Moscow', 'H:mm', { locale: ru })}`}
                      </td>
                    </tr>
                  </>
                )}

                {!program.isDated && (
                  <tr>
                    <td className="pr-3 pt-5 align-top text-gray-400 lg:text-lg">
                      Дата
                    </td>
                    <td className="pt-5 text-zinc-950 lg:text-lg">Бессрочно</td>
                  </tr>
                )}
              </tbody>
            </table>

            {program.website && (
              <div className="mt-5 flex justify-center">
                <Button asChild>
                  <Link href={program.website}>
                    Перейти на сайт организатора
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
