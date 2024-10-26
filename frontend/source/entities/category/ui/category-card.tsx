import Link from 'next/link';
import Image from 'next/image';

import { ICategory } from '..';

export const CategoryCard = ({ category }: { category: ICategory }) => {
  return (
    <Link href={category.id} className="relative block min-h-[11.5rem] px-6">
      <Image
        priority
        src={category.image}
        fill
        sizes="(max-width: 768px) 100vw, 25vw"
        alt="Изображение категории"
        className="-z-10 select-none rounded-xl object-cover brightness-[35%]"
      />
      <div className="flex h-full items-center justify-center text-xl font-medium text-white sm:text-2xl">
        <p className="line-clamp-2 text-center">{category.title}</p>
      </div>
    </Link>
  );
};
