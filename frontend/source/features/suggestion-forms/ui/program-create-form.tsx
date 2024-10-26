'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import axios from 'axios';

import { DateInput } from '@/features/date-input';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/shared/ui/carousel';
import { Input } from '@/shared/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';
import { Textarea } from '@/shared/ui/textarea';
import {
  ProgramFormType,
  programFormSchema,
  photoSchema,
} from '../model/schemas';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/form';
import { Button } from '@/shared/ui/button';
import { Checkbox } from '@/shared/ui/checkbox';
import { toast } from 'sonner';
import { cn } from 'clsx-tailwind-merge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/shared/ui/alert-dialog';

export const ProgramCreateForm = () => {
  const [photos, setPhotos] = useState<File[]>([]);
  const [isDated, setIsDated] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const form = useForm<ProgramFormType>({
    resolver: zodResolver(programFormSchema),
    defaultValues: {
      isDated: false,
      terms: false,
    },
  });

  const onSubmit = async (data: ProgramFormType) => {
    if (!data.terms) {
      toast(
        'Для отправки формы необходимо согласиться с Пользовательским соглашением'
      );
      return;
    }

    if (
      (!form.getValues('startDate') || !form.getValues('endDate')) &&
      form.getValues('isDated')
    ) {
      toast('Вы не указали ограничение по времени', {
        description: 'Укажите дату начала и дату конца',
      });
    } else {
      const formData = new FormData();
      photos.forEach((photo) => formData.append('images', photo));
      const urls: string[] = await axios
        .post(
          'https://social-programs-portal-backend.vercel.app/api/store/multiple-upload',
          formData
        )
        .then((res) => res.data);
      const { images, terms, ...main } = data;
      const newData = { ...main, images: urls, categoryIds: [] };
      const res = await axios.post(
        'https://social-programs-portal-backend.vercel.app/api/publications/programs/create',
        newData
      );
      setOpen(true);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-3 flex flex-col gap-y-2"
      >
        <div className="space-y-3">
          <span>* - обязательное поле</span>

          <h3 className="text-xl font-bold text-zinc-950 lg:text-2xl">
            Основная информация
          </h3>

          <FormField
            control={form.control}
            name="organizer.name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Наименование организатора <span>*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Введите наименование организатора"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="organizer.email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Электронная почта <span>*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Введите электронную почту"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Ссылка на сайт <span>*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Введите ссылку на сайт"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Название события <span>*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Введите название события"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Описание события <span>*</span>
                </FormLabel>
                <FormControl>
                  <Textarea placeholder="Введите описание события" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-3">
          <h3 className="mt-3 text-xl font-bold text-zinc-950 lg:text-2xl">
            Подробная информация
          </h3>

          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Загрузите фотографии <span>*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    multiple
                    accept=".png,.jpg,.jpeg"
                    type="file"
                    onChange={(e) => {
                      const filesArray = Array.from(
                        (e.target.files as FileList) || []
                      );
                      field.onChange(filesArray);
                      try {
                        if (photoSchema.parse(filesArray)) {
                          setPhotos(filesArray);
                        }
                      } catch (e) {
                        setPhotos([]);
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {photos.length > 0 && (
            <Carousel className="w-full">
              <CarouselContent>
                {photos.map((photo, index) => (
                  <CarouselItem className="h-64" key={index}>
                    <Image
                      src={URL.createObjectURL(photo)}
                      width={1920}
                      height={1080}
                      className="h-full w-full rounded-lg border border-gray-300 object-cover shadow-sm"
                      alt="Фотография"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious
                type="button"
                className="left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 hover:bg-white hover:text-zinc-950"
              />
              <CarouselNext
                type="button"
                className="right-0 top-1/2 -translate-y-1/2 translate-x-1/2 hover:bg-white hover:text-zinc-950"
              />
            </Carousel>
          )}

          <FormField
            control={form.control}
            name="isDated"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-gray-300 p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(e: any) => {
                      field.onChange(e);
                      setIsDated(e);
                    }}
                  />
                </FormControl>
                <div className="space-y-2 leading-none">
                  <FormLabel>Событие ограничено по времени?</FormLabel>
                  <FormDescription className="text-sm">
                    Если вы не выберите этот пункт, то не сможете указать дату и
                    время
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />

          {isDated && <DateInput form={form} />}

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Выберите город <span>*</span>
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Город" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent
                    ref={(ref) => {
                      if (!ref) return;
                      ref.ontouchstart = (e) => {
                        e.preventDefault();
                      };
                    }}
                  >
                    <SelectGroup>
                      <SelectItem value="Москва">Москва</SelectItem>
                      <SelectItem value="Санкт-Петербург">
                        Санкт-Петербург
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="terms"
            render={({ field }) => (
              <FormItem
                className={cn(
                  'flex flex-row items-start space-x-3 space-y-0 rounded-md border border-gray-300 p-4'
                )}
              >
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    Я согласен с Пользовательским соглашением <span>*</span>
                  </FormLabel>
                  <FormDescription className="text-sm">
                    Нажимая кнопку «Отправить форму» Вы соглашаетесь с{' '}
                    <a
                      className="underline"
                      target="_blank"
                      href="https://docs.google.com/document/d/1_jjzHJq6vplEE549tJmfc5mFuK1iZjr--aRJm0AAhuY/edit"
                    >
                      Пользовательским соглашением
                    </a>
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
        </div>

        <div className="mt-3 flex justify-center">
          <Button type="submit" className="w-64 py-[0.6875rem]">
            Отправить форму
          </Button>
        </div>

        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogContent className="sm:max-w-[425px]">
            <AlertDialogHeader>
              <AlertDialogTitle>Информационное окно</AlertDialogTitle>
              <AlertDialogDescription>
                Рассмотрение заявки на публикацию события занимает
                приблизительно 1 рабочий день.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction
                type="button"
                onClick={() => location.reload()}
              >
                Продолжить
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </form>
    </Form>
  );
};
