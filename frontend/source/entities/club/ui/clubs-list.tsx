import { AlertCircleIcon } from 'lucide-react';

import { Skeleton } from '@/shared/ui/skeleton';
import { IClub, ClubCard } from '..';

interface ClubsListProps {
  clubs: IClub[];
  mounted: boolean;
}

export const ClubsList = ({ clubs, mounted }: ClubsListProps) => {
  if (!mounted) {
    return (
      <div className="grid gap-y-4">
        {[...Array(3)].map((_, i) => (
          <Skeleton
            key={`skeleton-card-${i}`}
            className="h-[20rem] rounded-lg"
          />
        ))}
      </div>
    );
  }

  if (clubs.length == 0) {
    return (
      <div className="mt-6 flex w-full flex-col items-center justify-center gap-y-1 text-zinc-950">
        <AlertCircleIcon className="h-48 w-48 text-slate-300" />
        <p className="mt-4 text-center text-lg font-semibold lg:text-xl">
          Кружки или секции не найдены
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-y-4">
      {clubs.map((club) => (
        <ClubCard key={`club-card-${club.id}`} club={club} />
      ))}
    </div>
  );
};
