'use client';

import { useState } from 'react';
import { AlertCircleIcon } from 'lucide-react';

import { Label } from '@/shared/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';
import {
  ClubCreateForm,
  EventCreateForm,
  ProgramCreateForm,
} from '@/features/suggestion-forms';

export const Page = () => {
  const [type, setType] = useState<string>('');

  return (
    <div>
      <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight text-zinc-950 lg:text-4xl">
        Предложить событие
      </h1>

      <div className="mt-4 flex flex-col gap-y-2">
        <div className="flex flex-col gap-y-2">
          <h3 className="text-xl font-bold text-zinc-950 lg:text-2xl">
            Выбор типа события
          </h3>

          <div className="space-y-1">
            <Label>Выберите тип события</Label>

            <Select onValueChange={setType}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Тип события" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="program">Программа</SelectItem>
                <SelectItem value="event">Мероприятие</SelectItem>
                <SelectItem value="club">Кружок или секция</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {!type && (
          <div className="mt-6 flex w-full flex-col items-center justify-center gap-y-1 text-zinc-950">
            <AlertCircleIcon className="h-48 w-48 text-slate-300" />
            <p className="mt-4 text-center text-lg font-semibold lg:text-xl">
              Тип события не выбран
            </p>
            <p className="text-center">
              Для отображения формы выберите тип события
            </p>
          </div>
        )}
        {type === 'program' && <ProgramCreateForm />}
        {type === 'event' && <EventCreateForm />}
        {type === 'club' && <ClubCreateForm />}
      </div>
    </div>
  );
};
