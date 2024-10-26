import { AlertCircleIcon } from 'lucide-react';

import { Skeleton } from '@/shared/ui/skeleton';
import { ProgramCard, IProgram } from '..';

interface ProgramsListProps {
  programs: IProgram[];
  mounted: boolean;
}

export const ProgramsList = ({ programs, mounted }: ProgramsListProps) => {
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

  if (programs.length == 0) {
    return (
      <div className="mt-6 flex w-full flex-col items-center justify-center gap-y-1 text-zinc-950">
        <AlertCircleIcon className="h-48 w-48 text-slate-300" />
        <p className="mt-4 text-center text-lg font-semibold lg:text-xl">
          Программы не найдены
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-y-4">
      {programs.map((program) => (
        <ProgramCard key={`program-card-${program.id}`} program={program} />
      ))}
    </div>
  );
};
