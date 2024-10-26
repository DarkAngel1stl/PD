'use client';

import { useEffect, useState } from 'react';
import { LoaderIcon } from 'lucide-react';
import Image from 'next/image';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/table';
import { api } from '@/shared/api/axios';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog';
import { Input } from '@/shared/ui/input';
import { Textarea } from '@/shared/ui/textarea';
import { Button } from '@/shared/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/shared/ui/carousel';

export const Page = () => {
  const [loading, setLoading] = useState(true);
  const [publications, setPublications] = useState([]);
  const [editing, setEditing] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        api
          .get('/publications/offers')
          .then((response) => setPublications(response.data))
          .finally(() => setLoading(false));
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const deletePublication = async (id: string) => {
    try {
      const response = await api
        .post(`/publications/delete`, { id })
        .then((res) => {
          setOpen(false);
          setPublications([
            ...publications.filter((p: any) => p.id !== editing.id),
          ]);
          setEditing(null);
          setContent('');
          setTitle('');
        });
    } catch (error) {
      console.error(error);
    }
  };

  const publishPublication = async (
    id: string,
    title: string,
    content: string
  ) => {
    try {
      const response = await api
        .post(`/publications/publish`, { id, title, content })
        .then((res) => {
          setOpen(false);
          setPublications([
            ...publications.filter((p: any) => p.id !== editing.id),
          ]);
          setEditing(null);
          setContent('');
          setTitle('');
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight text-zinc-950 lg:text-4xl">
        Входящие предложения
      </h1>

      <div className="mt-10">
        {loading ? (
          <div className="flex grow items-center justify-center">
            <LoaderIcon className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : publications[0] ? (
          <>
            <Table className="border-separate border-spacing-y-3">
              <TableHeader className="[&_tr]:border-none">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="text-zinc-950">№</TableHead>
                  <TableHead className="text-zinc-950">Организатор</TableHead>
                  <TableHead className="text-zinc-950">Тип</TableHead>
                  <TableHead className="text-zinc-950">Название</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {publications.map((publication: any, idx) => (
                  <TableRow
                    className="cursor-pointer rounded-xl hover:bg-slate-50/70"
                    key={`publication-${publication.id}`}
                    onClick={() => {
                      setEditing(publication);
                      setTitle(publication.title);
                      setContent(publication.content);
                      setOpen(true);
                    }}
                  >
                    <TableCell className="rounded-l-xl border border-r-0 border-slate-300/30">
                      {idx + 1}
                    </TableCell>
                    <TableCell className="border-y border-slate-300/30">
                      {publication.organizer.name}
                    </TableCell>
                    <TableCell className="border-y border-slate-300/30">
                      {publication.ptype === 'event'
                        ? 'Мероприятие'
                        : publication.ptype === 'club'
                          ? 'Кружок или секция'
                          : 'Программа'}
                    </TableCell>
                    <TableCell className="rounded-r-xl border border-l-0 border-slate-300/30">
                      {publication.title}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Редактирование предложения</DialogTitle>
                </DialogHeader>
                {editing && (
                  <>
                    <div className="mt-4 flex flex-col gap-2">
                      <Input
                        className="text-sm"
                        type="text"
                        disabled
                        placeholder="Организатор"
                        value={editing.organizer.name}
                      />

                      <Input
                        className="text-sm"
                        type="email"
                        disabled
                        placeholder="Электронная почта"
                        value={editing.organizer.email}
                      />

                      <Input
                        className="text-sm"
                        type="text"
                        placeholder="Название события"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                      />

                      <Textarea
                        placeholder="Описание события"
                        onChange={(e) => setContent(e.target.value)}
                        value={content}
                      />

                      {editing.images.length > 0 && (
                        <Carousel className="w-full">
                          <CarouselContent>
                            {editing.images.map((image: any, index: number) => (
                              <CarouselItem className="h-64" key={index}>
                                <Image
                                  src={image}
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
                    </div>
                    <div className="mt-4 flex justify-end gap-4">
                      <Button
                        className="text-sm"
                        onClick={() => deletePublication(editing.id)}
                      >
                        Удалить
                      </Button>
                      <Button
                        variant="secondary"
                        className="text-sm"
                        onClick={() =>
                          publishPublication(editing.id, title, content)
                        }
                      >
                        Опубликовать
                      </Button>
                    </div>
                  </>
                )}
              </DialogContent>
            </Dialog>
          </>
        ) : (
          <div className="text-center text-lg font-semibold">
            Список предложений пуст!
          </div>
        )}
      </div>
    </div>
  );
};
