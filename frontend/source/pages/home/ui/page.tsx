import Image from 'next/image';
import Link from 'next/link';

import { CategoryCard, ICategory } from '@/entities/category';
import { Button } from '@/shared/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import { ScrollArea, ScrollBar } from '@/shared/ui/scroll-area';
import { Search } from '@/widgets/search';
import { SearchIcon } from 'lucide-react';
import { Input } from '@/shared/ui/input';
import { EventsList, IEvent } from '@/entities/event';
import axios from 'axios';

interface ISections {
  events: ICategory[];
  sections: ICategory[];
  programs: ICategory[];
}

type LabelsType<T> = { [K in keyof T]: string };

const labels: LabelsType<ISections> = {
  programs: 'Программы',
  events: 'Мероприятия',
  sections: 'Кружки и секции',
};

const getSections = async (): Promise<ISections> => {
  const data: ISections = {
    programs: [
      {
        id: '/programs',
        title: 'Детям',
        image: '/program-1.jpg',
      },
      {
        id: '/programs',
        title: 'Для лиц с ОВЗ',
        image: '/program-2.jpg',
      },
      {
        id: '/programs',
        title: 'ЖКУ',
        image: '/program-3.jpg',
      },
      {
        id: '/programs',
        title: 'Пенсионерам',
        image: '/program-4.jpg',
      },
    ],
    events: [
      {
        id: '/events',
        title: 'Выставка',
        image: '/event-1.jpg',
      },
      {
        id: '/events',
        title: 'Концерт',
        image: '/event-2.jpg',
      },
      {
        id: '/events',
        title: 'Мастер-класс',
        image: '/event-3.jpg',
      },
      {
        id: '/events',
        title: 'Театр',
        image: '/event-4.jpg',
      },
    ],
    sections: [
      {
        id: '/clubs-and-sections',
        title: 'Борьба',
        image: '/club-1.jpg',
      },
      {
        id: '/clubs-and-sections',
        title: 'Живопись',
        image: '/club-2.jpg',
      },
      {
        id: '/clubs-and-sections',
        title: 'Программирование',
        image: '/club-3.jpg',
      },
      {
        id: '/clubs-and-sections',
        title: 'Танцы',
        image: '/club-4.jpg',
      },
    ],
  };

  return data;
};

const getEvents = async () => {
  return await axios
    .get(
      'https://social-programs-portal-backend.vercel.app/api/publications/events'
    )
    .then((response) => {
      const data = response.data;
      data.map((event: IEvent) => {
        event.startDate = new Date(event.startDate);
        event.endDate = new Date(event.endDate);
      });
      return data;
    })
    .catch((e) => {
      console.log(e);
      throw new Error('Failed to fetch data');
    });
};

export const Page = async () => {
  const sections: ISections = await getSections();
  const events: IEvent[] = await getEvents();

  return (
    <div>
      <section>
        <div className="relative px-6 py-12 lg:px-24 lg:py-16">
          <Image
            src="/hero.png"
            fill
            priority
            sizes="100vw"
            alt="Изображение с логотипом"
            className="-z-10 select-none rounded-xl object-cover brightness-[35%]"
          />
          <div className="flex flex-col items-center gap-y-9">
            <div className="flex flex-col gap-y-6">
              <h3 className="text-center text-xl font-bold text-white sm:text-3xl">
                Открой Россию социальных возможностей!
              </h3>
              <p className="text-center text-sm text-white sm:text-xl">
                Добро пожаловать на портал социальных программ – вашу
                незаменимую информационную базу, когда речь заходит о
                мероприятиях, спортивных секциях и социальных программах в твоём
                городе!
              </p>
            </div>
            <Button
              asChild
              variant="outline"
              className="border-2 border-white bg-transparent text-sm text-white sm:w-[16rem] sm:text-base"
            >
              <Link href="/about-us">Подробнее</Link>
            </Button>
          </div>
        </div>
      </section>
      <section className="mt-8">
        <Tabs defaultValue={Object.keys(sections).at(0)}>
          <div className="flex flex-wrap items-center justify-between gap-x-28 gap-y-5">
            <h2 className="scroll-m-20 text-3xl font-extrabold tracking-tight text-zinc-950 lg:text-4xl">
              Популярные разделы
            </h2>
            <div className="self-[start] items-[start] grid rounded-lg shadow-sm">
              <div className="scrollbar-none overflow-x-auto">
                <TabsList>
                  {Object.keys(sections).map((section) => (
                    <TabsTrigger
                      key={`tabs-trigger-${section}`}
                      value={section}
                    >
                      {section in labels &&
                        labels[section as keyof typeof labels]}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
            </div>
          </div>
          {Object.values(sections).map((categories, idx) => (
            <TabsContent
              key={`tabs-content-${idx}`}
              value={Object.keys(sections).at(idx)!}
              className="mt-5 grid gap-5 md:grid-cols-4"
            >
              {categories.map((category: ICategory, idx: number) => (
                <CategoryCard
                  key={`category-card-${category.id}-${idx}`}
                  category={category}
                />
              ))}
            </TabsContent>
          ))}
        </Tabs>
      </section>

      {/* <section className="mt-8">
        <h2 className="scroll-m-20 text-3xl font-extrabold tracking-tight text-zinc-950 lg:text-4xl">
          Общий поиск
        </h2>

        <div className="relative mt-4 w-full">
          <Input
            type="text"
            placeholder="Поиск"
            className="border-2 border-primary py-2.5 pl-12"
          />
          <SearchIcon className="absolute left-3.5 top-[calc(50%-0.625rem)] h-5 w-5 text-primary" />
        </div>

        <div className="mt-4 text-center text-lg font-bold">
          Данная секция находится в разработке
        </div>
      </section> */}

      {events && events.length >= 2 && (
        <section className="mt-8">
          <h2 className="scroll-m-20 text-3xl font-extrabold tracking-tight text-zinc-950 lg:text-4xl">
            Ближайшие события
          </h2>

          <div className="mt-4">
            <EventsList events={[events[0], events[1]]} mounted={true} />
          </div>
        </section>
      )}
    </div>
  );
};
