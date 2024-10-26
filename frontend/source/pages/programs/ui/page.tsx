'use client';

import { useEffect, useState } from 'react';
import { SlidersHorizontalIcon } from 'lucide-react';
import axios from 'axios';

import { Search } from '@/widgets/search';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/ui/sheet';
import { Button } from '@/shared/ui/button';
import { Label } from '@/shared/ui/label';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/ui/accordion';
import { Checkbox } from '@/shared/ui/checkbox';
import { ScrollArea } from '@/shared/ui/scroll-area';
import { IProgram, ProgramsList } from '@/entities/program';

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
  const [programs, setPrograms] = useState<IProgram[]>([]);
  const [search, setSearch] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [mounted, setMounted] = useState<boolean>(false);
  const [reset, setReset] = useState<boolean>(false);

  const fetchPrograms = async () => {
    setLoading(true);
    let query =
      'https://social-programs-portal-backend.vercel.app/api/publications/programs?';
    if (search) {
      query += `search=${search}&`;
    }
    if (selectedCities) {
      selectedCities.forEach((city) => {
        query += `city=${city}&`;
      });
    }
    const data = await axios
      .get(query)
      .then((response) => {
        const data = response.data;
        data.map((program: IProgram) => {
          if (program.startDate && program.endDate) {
            program.startDate = new Date(program.startDate);
            program.endDate = new Date(program.endDate);
          }
        });
        return data;
      })
      .catch(() => {
        throw new Error('Failed to fetch data');
      })
      .finally(() => setLoading(false));
    setPrograms(data);
  };

  const handleSubmit = () => {
    fetchPrograms();
  };

  useEffect(() => {
    if (!mounted) {
      fetchPrograms().finally(() => setMounted(true));
    }
  }, []);

  useEffect(() => {
    fetchPrograms();
  }, [search]);

  useEffect(() => {
    if (reset) {
      fetchPrograms();
      setReset(false);
    }
  }, [reset]);

  return (
    <div className="flex flex-col gap-y-4">
      <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight text-zinc-950 lg:text-4xl">
        Программы
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

      <ProgramsList programs={programs} mounted={mounted} />
    </div>
  );
};
