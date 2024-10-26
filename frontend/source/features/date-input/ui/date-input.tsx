'use client';

import { useEffect, useState } from 'react';
import { CalendarIcon } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { format, isAfter, startOfDay } from 'date-fns';
import { ru } from 'date-fns/locale';

import { Button } from '@/shared/ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';
import { Calendar } from '@/shared/ui/calendar';

interface DateInputProps {
  form: any;
}

export const DateInput = ({ form }: DateInputProps) => {
  const [error, setError] = useState<boolean>(false);
  const [updated, setUpdated] = useState<boolean>(false);
  const [time, setTime] = useState<string[]>(['00:00', '00:00']);

  useEffect(() => {
    if (isAfter(form.getValues('startDate'), form.getValues('endDate'))) {
      setError(true);
    } else {
      setError(false);
    }
  }, [time, updated]);

  return (
    <div className="flex flex-col gap-y-1">
      <div className="flex flex-col gap-x-4 gap-y-3 lg:flex-row">
        <div className="w-full">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-y-1">
                <FormLabel>
                  Дата и время начала <span>*</span>
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className="w-full justify-between border-gray-300 px-3 py-2.5 hover:bg-transparent"
                      >
                        {field.value ? (
                          format(field.value, 'PPP H:mm', { locale: ru })
                        ) : (
                          <span>Выберите дату и время</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 text-zinc-950 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="flex w-auto flex-col gap-4 border border-gray-300 bg-white">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      disabled={(days) =>
                        days > startOfDay(form.getValues('endDate'))
                      }
                      onSelect={(date: Date | undefined) => {
                        if (!time[0] || !date) {
                          field.onChange(date);
                          return;
                        }
                        const [hours, minutes] = time[0]
                          .split(':')
                          .map((str) => parseInt(str, 10));
                        const newDate = new Date(
                          date.getFullYear(),
                          date.getMonth(),
                          date.getDate(),
                          hours,
                          minutes
                        );
                        field.onChange(newDate);
                        setError(false);
                        setUpdated((prev) => !prev);
                      }}
                    />
                    <Input
                      disabled={!field.value}
                      type="time"
                      value={time[0]}
                      onChange={(event) => {
                        const value = event.target.value;
                        setTime([value, time[1]]);
                        if (field.value) {
                          const [hours, minutes] = value
                            .split(':')
                            .map((str) => parseInt(str, 10));
                          const date = new Date(
                            field.value.getFullYear(),
                            field.value.getMonth(),
                            field.value.getDate(),
                            hours,
                            minutes
                          );
                          field.onChange(date);
                        }
                      }}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="w-full">
          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-y-1">
                <FormLabel>
                  Дата и время конца <span>*</span>
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className="w-full justify-between border-gray-300 px-3 py-2.5 hover:bg-transparent"
                      >
                        {field.value ? (
                          format(field.value, 'PPP H:mm', { locale: ru })
                        ) : (
                          <span>Выберите дату и время</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 text-zinc-950 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="flex w-auto flex-col gap-4 border border-gray-300 bg-white">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      disabled={(days) =>
                        days < startOfDay(form.getValues('startDate'))
                      }
                      onSelect={(date: Date | undefined) => {
                        if (!time[1] || !date) {
                          field.onChange(date);
                          return;
                        }
                        const [hours, minutes] = time[1]
                          .split(':')
                          .map((str) => parseInt(str, 10));
                        const newDate = new Date(
                          date.getFullYear(),
                          date.getMonth(),
                          date.getDate(),
                          hours,
                          minutes
                        );
                        field.onChange(newDate);
                        setError(false);
                        setUpdated((prev) => !prev);
                      }}
                    />
                    <Input
                      disabled={!field.value}
                      type="time"
                      value={time[1]}
                      onChange={(event) => {
                        const value = event.target.value;
                        setTime([time[0], value]);
                        if (field.value) {
                          const [hours, minutes] = value
                            .split(':')
                            .map((str) => parseInt(str, 10));
                          const date = new Date(
                            field.value.getFullYear(),
                            field.value.getMonth(),
                            field.value.getDate(),
                            hours,
                            minutes
                          );
                          field.onChange(date);
                        }
                      }}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
      {error && (
        <p className="text-[0.8rem] font-medium text-red-600">
          Дата конца не может быть больше даты начала
        </p>
      )}
    </div>
  );
};
