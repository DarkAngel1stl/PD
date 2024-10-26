'use client';

import { useEffect, useState } from 'react';
import { Loader2, SearchIcon } from 'lucide-react';
import { cn } from 'clsx-tailwind-merge';

import { Input } from '@/shared/ui/input';
import { useDebounce } from '@/shared/lib/hooks/use-debounce';

interface SearchProps {
  loading: boolean;
  setText: (text: string) => void;
}

export const Search = ({ loading, setText }: SearchProps) => {
  const [search, setSearch] = useState<string>('');

  const debouncedSearch = useDebounce(search, 750);

  useEffect(() => {
    setText(debouncedSearch);
  }, [debouncedSearch]);

  return (
    <div className="relative w-full">
      <Input
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        type="text"
        placeholder="Поиск"
        className={cn('border-2 border-primary py-2.5 pl-12', {
          'pr-12': loading,
        })}
      />
      <SearchIcon className="absolute left-3.5 top-[calc(50%-0.625rem)] h-5 w-5 text-primary" />
      <Loader2
        className={cn(
          'absolute right-3.5 top-[calc(50%-0.625rem)] hidden h-5 w-5 animate-spin text-zinc-950 opacity-50',
          {
            block: loading,
          }
        )}
      />
    </div>
  );
};
