'use client';

import { ComponentProps } from 'react';
import { DayPicker } from 'react-day-picker';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import { cn } from 'clsx-tailwind-merge';
import { ru } from 'date-fns/locale';

import { buttonVariants } from '@/shared/ui/button';

type CalendarProps = ComponentProps<typeof DayPicker>;

export const Calendar = ({
  className,
  classNames,
  showOutsideDays = true,
  fixedWeeks = true,
  ...props
}: CalendarProps) => {
  return (
    <DayPicker
      className={className}
      classNames={{
        root: '',
        multiple_months: '',
        with_weeknumber: '',
        vhidden: '',
        button_reset: '',
        button: '',
        caption: 'flex justify-center relative items-center',
        caption_start: '',
        caption_end: '',
        caption_between: '',
        caption_label: 'text-zinc-950 text-md font-medium',
        caption_dropdowns: '',
        dropdown: '',
        dropdown_month: '',
        dropdown_year: '',
        dropdown_icon: '',
        months: 'flex justify-center flex-row flex-wrap gap-4',
        month: 'flex flex-col gap-4',
        table: '',
        tbody: '',
        tfoot: '',
        head: '',
        head_row: '',
        head_cell: 'text-zinc-950 font-normal text-md',
        nav: 'flex items-center',
        nav_button: cn(
          buttonVariants({ size: 'icon', variant: 'ghost' }),
          'absolute bg-transparent opacity-50 hover:opacity-100 disabled:opacity-0 text-zinc-950'
        ),
        nav_button_previous: 'left-0',
        nav_button_next: 'right-0',
        nav_icon: '',
        row: '',
        weeknumber: '',
        cell: 'p-0',
        day: cn(
          buttonVariants({ size: 'icon', variant: 'ghost' }),
          'h-9 w-9 bg-transparent text-zinc-950 rounded-md hover:bg-primary hover:text-white aria-selected:opacity-100 aria-selected:bg-primary aria-selected:text-white'
        ),
        day_outside: 'text-zinc-950 opacity-50',
        day_selected:
          'bg-primary text-white hover:bg-primary hover:text-white focus:bg-primary focus:text-white',
        day_disabled: 'text-zinc-950 disabled:opacity-25',
        day_hidden: 'invisible',
        day_range_start: 'aria-selected:bg-primary text-white rounded-r-none',
        day_range_middle: 'aria-selected:bg-primary aria-selected:text-white',
        day_range_end: 'aria-selected:bg-primary text-white rounded-l-none',
        day_today: 'text-zinc-950 bg-zinc-200',
        ...classNames,
      }}
      components={{
        IconLeft: () => <ArrowLeftIcon className="h-5 w-5 text-zinc-950" />,
        IconRight: () => <ArrowRightIcon className="h-5 w-5 text-zinc-950" />,
      }}
      showOutsideDays={showOutsideDays}
      fixedWeeks={fixedWeeks}
      locale={ru}
      {...props}
    />
  );
};

Calendar.displayName = 'Calendar';
