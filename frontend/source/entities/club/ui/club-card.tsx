import Image from 'next/image';
import Link from 'next/link';
import { ChevronDownIcon } from 'lucide-react';

import { IClub } from '..';
import { Button } from '@/shared/ui/button';

export const ClubCard = ({ club }: { club: IClub }) => {
  return (
    <div className="flex flex-col rounded-lg border bg-white shadow-sm lg:h-[20rem] lg:flex-row">
      <div className="relative h-48 w-full border-b lg:h-auto lg:border-b-0 lg:border-r">
        <Image
          src={club.images.length > 0 ? club.images[0] : '/card.png'}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          alt="Изображение кружка или секции"
          className="rounded-t-lg object-cover lg:rounded-none lg:rounded-s-lg"
        />
        <div className="absolute left-3 top-3 flex h-10 items-center justify-center rounded-full bg-white px-3 font-semibold text-primary shadow-sm">
          {club.ageCategory.from}-{club.ageCategory.to}
        </div>
      </div>

      <div className="flex w-full flex-col gap-y-2 px-3 py-3 lg:px-6">
        {club.categories.length > 0 && (
          <div className="hidden flex-wrap gap-1 lg:flex">
            {club.categories.map((category) => (
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
          <ChevronDownIcon className="h-5 w-5 text-gray-400" />
          <span className="text-gray-400">
            {club.type === 'section' ? 'Секция' : 'Кружок'}
          </span>
        </div>
        <h3 className="line-clamp-1 text-lg font-semibold text-zinc-950 lg:text-xl">
          {club.title}
        </h3>
        <p className="line-clamp-4 text-gray-400">{club.content}</p>
        <Button asChild>
          <Link
            className="mt-auto py-2.5"
            href={`clubs-and-sections/${club.id}`}
          >
            Подробнее
          </Link>
        </Button>
      </div>
    </div>
  );
};
