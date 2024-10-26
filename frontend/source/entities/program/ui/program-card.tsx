import Image from 'next/image';
import Link from 'next/link';
import { MapPinIcon } from 'lucide-react';

import { IProgram } from '..';
import { Button } from '@/shared/ui/button';

export const ProgramCard = ({ program }: { program: IProgram }) => {
  return (
    <div className="flex flex-col rounded-lg border bg-white shadow-sm lg:h-[20rem] lg:flex-row">
      <div className="relative h-48 w-full border-b lg:h-auto lg:border-b-0 lg:border-r">
        <Image
          src={program.images.length > 0 ? program.images[0] : '/card.png'}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          alt="Изображение программы"
          className="rounded-t-lg object-cover lg:rounded-none lg:rounded-s-lg"
        />
      </div>

      <div className="flex w-full flex-col gap-y-2 px-3 py-3 lg:px-6">
        {program.categories.length > 0 && (
          <div className="hidden flex-wrap gap-1 lg:flex">
            {program.categories.map((category) => (
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
          <MapPinIcon className="h-5 w-5 text-gray-400" />
          <span className="text-gray-400">{program.city}</span>
        </div>
        <h3 className="line-clamp-1 text-lg font-semibold text-zinc-950 lg:text-xl">
          {program.title}
        </h3>
        <p className="line-clamp-4 text-gray-400">{program.content}</p>
        <Button asChild>
          <Link className="mt-auto py-2.5" href={`programs/${program.id}`}>
            Подробнее
          </Link>
        </Button>
      </div>
    </div>
  );
};
