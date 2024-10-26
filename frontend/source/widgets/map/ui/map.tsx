'use client';

import { YMaps, Map as YMap, Placemark } from '@pbe/react-yandex-maps';

export const Map = ({ coordinates }: { coordinates: number[] }) => {
  const API_KEY = 'fc2b85cc-d782-4ee0-a120-a986f371b08d';

  return (
    <div className="relative h-[13rem] w-full border shadow-sm lg:h-[26rem]">
      <YMaps
        query={{
          apikey: API_KEY,
          lang: 'ru_RU',
        }}
      >
        <YMap
          defaultState={{ center: coordinates, zoom: 15 }}
          style={{ position: 'absolute', inset: '0' }}
        >
          <Placemark geometry={coordinates} />
        </YMap>
      </YMaps>
    </div>
  );
};
