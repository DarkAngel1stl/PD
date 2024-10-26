'use client';

import { useEffect, useState } from 'react';
import { CalendarIcon, SlidersHorizontalIcon } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';

import { Search } from '@/widgets/search';
import { EventsList, IEvent } from '@/entities/event';
import { Button } from '@/shared/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/ui/sheet';
import { Label } from '@/shared/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Calendar } from '@/shared/ui/calendar';
import { Input } from '@/shared/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/ui/accordion';
import { Checkbox } from '@/shared/ui/checkbox';
import { ScrollArea } from '@/shared/ui/scroll-area';

const cities = [
  {
    id: 'Moscow',
    label: 'Москва',
  },
  {
    id: 'St. Peterburg',
    label: 'Санкт-Петербург',
  },
];

export const Page = () => {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [search, setSearch] = useState<string>('');
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [time, setTime] = useState<string[]>(['00:00', '00:00']);
  const [mounted, setMounted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [reset, setReset] = useState<boolean>(false);

  const fetchEvents = async () => {
    setLoading(true);
    let query =
      'https://social-programs-portal-backend.vercel.app/api/publications/events?';
    if (search) {
      query += `search=${search}&`;
    }
    if (selectedCities) {
      selectedCities.forEach((city) => {
        query += `city=${city}&`;
      });
    }
    if (startDate && endDate) {
      query += `startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}&`;
    }
    const data = await axios
      .get(query)
      .then((response) => {
        const data = response.data;
        data.map((event: IEvent) => {
          event.startDate = new Date(event.startDate);
          event.endDate = new Date(event.endDate);
        });
        return data;
      })
      .catch(() => {
        throw new Error('Failed to fetch data');
      })
      .finally(() => setLoading(false));
    setEvents(data);
  };

  const handleSubmit = () => {
    if (!startDate && endDate) {
      toast('Фильтрация по дате не была применена', {
        description: 'Необходимо указать дату начала',
      });
    } else if (startDate && !endDate) {
      toast('Фильтрация по дате не была применена', {
        description: 'Необходимо указать дату конца',
      });
    }
    fetchEvents();
  };

  useEffect(() => {
    if (!mounted) {
      fetchEvents().finally(() => setMounted(true));
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [search]);

  useEffect(() => {
    if (reset) {
      fetchEvents();
      setReset(false);
    }
  }, [reset]);

  return (
    <div className="flex flex-col gap-y-4">
      <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight text-zinc-950 lg:text-4xl">
        Мероприятия
      </h1>

      <div className="flex flex-col items-start gap-4 lg:flex-row">
        <Search setText={setSearch} loading={loading} />

        <Sheet>
          <SheetTrigger asChild>
            <Button className="h-12 gap-x-1">
              <SlidersHorizontalIcon className="h-5 w-5" />
              <span>Фильтры</span>
            </Button>
          </SheetTrigger>
          <SheetContent className="p-0">
            <ScrollArea className="h-full w-full p-6">
              <SheetHeader>
                <SheetTitle>Фильтры</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col py-5">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Город</AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-3">
                      {cities.map((city) => (
                        <div key={city.id} className="flex items-center gap-2">
                          <Checkbox
                            id={city.id}
                            checked={selectedCities.includes(city.label)}
                            onCheckedChange={(checked) =>
                              checked
                                ? setSelectedCities([
                                    ...selectedCities,
                                    city.label,
                                  ])
                                : setSelectedCities(
                                    selectedCities.filter(
                                      (selectedCity) =>
                                        selectedCity !== city.label
                                    )
                                  )
                            }
                          />
                          <Label
                            className="leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            htmlFor={city.id}
                          >
                            {city.label}
                          </Label>
                        </div>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Дата и время</AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-3">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-between border-gray-300 px-3 py-2.5 text-sm hover:bg-transparent"
                          >
                            {startDate ? (
                              <span>
                                {format(startDate, 'PPP H:mm', { locale: ru })}
                              </span>
                            ) : (
                              <span>Начало</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 text-zinc-950 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="flex w-auto flex-col gap-4 border border-gray-300 bg-white">
                          <Calendar
                            mode="single"
                            selected={startDate}
                            onSelect={(date: Date | undefined) => {
                              if (!time[0] || !date) {
                                setStartDate(date);
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
                              setStartDate(newDate);
                            }}
                          />
                          <Input
                            disabled={!startDate}
                            type="time"
                            value={time[0]}
                            onChange={(event) => {
                              const value = event.target.value;
                              setTime([value, time[1]]);
                              if (startDate) {
                                const [hours, minutes] = value
                                  .split(':')
                                  .map((str) => parseInt(str, 10));
                                const date = new Date(
                                  startDate.getFullYear(),
                                  startDate.getMonth(),
                                  startDate.getDate(),
                                  hours,
                                  minutes
                                );
                                setStartDate(date);
                              }
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-between border-gray-300 px-3 py-2.5 text-sm hover:bg-transparent"
                          >
                            {endDate ? (
                              <span>
                                {format(endDate, 'PPP H:mm', { locale: ru })}
                              </span>
                            ) : (
                              <span>Конец</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 text-zinc-950 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="flex w-auto flex-col gap-4 border border-gray-300 bg-white">
                          <Calendar
                            mode="single"
                            selected={endDate}
                            onSelect={(date: Date | undefined) => {
                              if (!time[1] || !date) {
                                setEndDate(date);
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
                              setEndDate(newDate);
                            }}
                          />
                          <Input
                            disabled={!endDate}
                            type="time"
                            value={time[1]}
                            onChange={(event) => {
                              const value = event.target.value;
                              setTime([time[0], value]);
                              if (endDate) {
                                const [hours, minutes] = value
                                  .split(':')
                                  .map((str) => parseInt(str, 10));
                                const date = new Date(
                                  endDate.getFullYear(),
                                  endDate.getMonth(),
                                  endDate.getDate(),
                                  hours,
                                  minutes
                                );
                                setEndDate(date);
                              }
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                    </AccordionContent>
                  </AccordionItem>
                  {/* <AccordionItem value="item-3">
                    <AccordionTrigger>Возраст</AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-3">
                      <Select>
                        <SelectTrigger className="text-md placeholder:text-md font-medium">
                          <SelectValue placeholder="Выберите возрастное ограничение" />
                        </SelectTrigger>
                        <SelectContent
                          ref={(ref) => {
                            if (!ref) return;
                            ref.ontouchstart = (e) => {
                              e.preventDefault();
                            };
                          }}
                        >
                          <SelectGroup className="[&>*]:text-sm">
                            <SelectItem value="0+">0+</SelectItem>
                            <SelectItem value="6+">6+</SelectItem>
                            <SelectItem value="12+">12+</SelectItem>
                            <SelectItem value="16+">16+</SelectItem>
                            <SelectItem value="18+">18+</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4">
                    <AccordionTrigger>Формат</AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-3">
                      <Select>
                        <SelectTrigger className="text-md placeholder:text-md font-medium">
                          <SelectValue placeholder="Выберите формат проведения" />
                        </SelectTrigger>
                        <SelectContent
                          ref={(ref) => {
                            if (!ref) return;
                            ref.ontouchstart = (e) => {
                              e.preventDefault();
                            };
                          }}
                        >
                          <SelectGroup className="[&>*]:text-sm">
                            <SelectItem value="offline">Очно</SelectItem>
                            <SelectItem value="online">Онлайн</SelectItem>
                            <SelectItem value="combined">
                              Комбинированно
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-5">
                    <AccordionTrigger>Льгота</AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="term-1" />
                        <Label htmlFor="term-1">Бесплатно для всех</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="term-2" />
                        <Label htmlFor="term-2">Пушкинская карта</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="term-3" />
                        <Label htmlFor="term-3">
                          Бесплатно для пенсионеров
                        </Label>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-6">
                    <AccordionTrigger>Категории</AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="category-1" />
                        <Label htmlFor="category-1">Здоровье</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="category-2" />
                        <Label htmlFor="category-2">Театр</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="category-3" />
                        <Label htmlFor="category-3">Музыка</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="category-4" />
                        <Label htmlFor="category-4">Культура</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="category-5" />
                        <Label htmlFor="category-5">Активный отдых</Label>
                      </div>
                    </AccordionContent>
                  </AccordionItem> */}
                </Accordion>
              </div>
              <SheetFooter>
                <div className="flex w-full flex-col gap-4">
                  <SheetClose asChild className="w-full">
                    <Button type="button" onClick={handleSubmit}>
                      Применить
                    </Button>
                  </SheetClose>
                  <SheetClose asChild className="w-full">
                    <Button
                      type="button"
                      onClick={() => {
                        setSelectedCities([]);
                        setStartDate(undefined);
                        setEndDate(undefined);
                        setTime(['00:00', '00:00']);
                        setReset(true);
                      }}
                    >
                      Сбросить все фильтры
                    </Button>
                  </SheetClose>
                </div>
              </SheetFooter>
            </ScrollArea>
          </SheetContent>
        </Sheet>
      </div>

      <EventsList events={events} mounted={mounted} />
    </div>
  );
};
