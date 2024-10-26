'use client';

import { useEffect, useRef, useState } from 'react';
import { Map, Placemark, YMaps } from '@pbe/react-yandex-maps';
import { ChevronsUpDownIcon, Loader2Icon } from 'lucide-react';
import { cn } from 'clsx-tailwind-merge';
import { UseFormReturn } from 'react-hook-form';

import { IPlace, ISuggestion } from '..';
import { useDebounce } from '@/shared/lib/hooks/use-debounce';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { ClubFormType, EventFormType } from '@/features/suggestion-forms';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/form';
import { Skeleton } from '@/shared/ui/skeleton';

interface AddressInputProps {
  form: any;
}

export const AddressInput = ({ form }: AddressInputProps) => {
  const API_KEY: string = 'fc2b85cc-d782-4ee0-a120-a986f371b08d';
  const SUGGEST_API_KEY: string = '944a3ed0-993e-4697-84f3-b06a7b472017';

  const [mounted, setMounted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [place, setPlace] = useState<IPlace | null>(null);
  const [suggestions, setSuggestions] = useState<ISuggestion[]>([]);
  const [text, setText] = useState<string>('');
  const [choice, setChoice] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);

  const debouncedText = useDebounce(text, 1000);

  const mapRef: any = useRef(null);

  useEffect(() => {
    if (place) {
      form.setValue('address', place);
      form.clearErrors('address');
    } else if (!place && mounted) {
      form.setError('address', { message: 'Это поле является обязательным ' });
    }
  }, [place]);

  useEffect(() => {
    if (!debouncedText) return;

    (async () => {
      try {
        setLoading(true);
        const response = await mapRef.current
          ?.suggest(debouncedText, { results: 3 })
          .then((res: any) =>
            res.map((object: any) => ({
              text: object.value,
            }))
          );
        setSuggestions(response);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [debouncedText]);

  useEffect(() => {
    (async () => {
      try {
        const response = await mapRef.current
          ?.geocode(choice, { results: 1 })
          .then((res: any) => {
            setPlace(null);
            setError('');

            const object = res.geoObjects.get(0);

            if (!object) {
              setError('Адрес не найден');
            }

            switch (
              object.properties.get(
                'metaDataProperty.GeocoderMetaData.precision'
              )
            ) {
              case 'exact':
                const data =
                  object.properties.get('metaDataProperty').GeocoderMetaData
                    .AddressDetails.Country.AdministrativeArea;
                let city = '';
                if ('SubAdministrativeArea' in data) {
                  city = data.SubAdministrativeArea.Locality.LocalityName;
                } else if (data.Locality) {
                  city = data.Locality.LocalityName;
                } else {
                  city = data.AdministrativeAreaName;
                }

                setPlace({
                  country: object.getCountry(),
                  city: city,
                  text: object.getAddressLine(),
                  point: object.geometry.getCoordinates(),
                });
                break;
              case 'number':
              case 'near':
              case 'range':
                setError('Неточный адрес, требуется уточнение');
                break;
              case 'street':
                setError('Неполный адрес, требуется уточнение');
                break;
              case 'other':
              default:
                setError('Неточный адрес, требуется уточнение');
            }
          });
      } catch (error) {
        console.error(error);
      }
    })();
  }, [choice]);

  return (
    <div className="flex w-full flex-col gap-y-3">
      <FormField
        control={form.control}
        name="address"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Введите адрес <span>*</span>
            </FormLabel>
            <FormControl>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    disabled={!mounted}
                    variant="outline"
                    role="combobox"
                    type="button"
                    aria-expanded={open}
                    className="w-full justify-between border-gray-300 px-3 py-2.5 hover:bg-transparent"
                  >
                    Выберите адрес
                    <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="popover-content-width p-0">
                  <Input
                    value={text}
                    onChange={(event) => setText(event.target.value)}
                    disabled={!mounted}
                    placeholder="Поиск адреса"
                    className={cn('w-full rounded-b-none border-0', {
                      'border-b': suggestions.length > 0 && text && !loading,
                    })}
                  />
                  {loading && (
                    <div className="flex justify-center py-1">
                      <Loader2Icon className="h-6 w-6 animate-spin text-gray-400" />
                    </div>
                  )}
                  {suggestions.length > 0 && text && !loading && (
                    <div className="flex flex-col">
                      {suggestions.map((suggestion, idx) => (
                        <Button
                          key={idx}
                          type="button"
                          onClick={() => {
                            setText(suggestion.text);
                            setChoice(suggestion.text);
                            setOpen(false);
                          }}
                          variant="ghost"
                          className="relative w-full justify-start overflow-hidden whitespace-nowrap rounded-none px-3 after:absolute after:right-0 after:top-0 after:h-full after:w-8 after:bg-gradient-to-r after:from-[rgba(255,255,255,0.1)] after:to-white last:rounded-b-lg"
                        >
                          {suggestion.text}
                        </Button>
                      ))}
                    </div>
                  )}
                </PopoverContent>
              </Popover>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {error && (
        <div className="w-full space-y-1 rounded-lg border border-red-700 px-3 py-2.5 text-red-700">
          <p className="font-semibold">Ошибка!</p>
          <p>{error}</p>
        </div>
      )}

      {place && (
        <div className="w-full space-y-1 rounded-lg border border-gray-300 px-3 py-2.5 text-zinc-950">
          <p className="font-semibold">Данные получены:</p>
          <p>{place.text}</p>
        </div>
      )}

      <div className="relative h-64 w-full border border-gray-300 shadow-sm">
        <YMaps
          query={{
            apikey: API_KEY,
            suggest_apikey: SUGGEST_API_KEY,
            load: 'package.full',
            lang: 'ru_RU',
          }}
        >
          {!mounted && <Skeleton className="h-full" />}

          <Map
            state={{
              center: place ? place.point : [55.751999, 37.617734],
              zoom: 18,
              controls: [],
            }}
            onLoad={(api) => {
              mapRef.current = api;
              setMounted(true);
            }}
            style={{ position: 'absolute', inset: '0' }}
          >
            {place && <Placemark geometry={place.point} />}
          </Map>
        </YMaps>
      </div>
    </div>
  );
};
