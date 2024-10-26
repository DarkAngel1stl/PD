import Image from 'next/image';

import { AspectRatio } from '@/shared/ui/aspect-ratio';

export const Page = () => {
  return (
    <div>
      <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight text-zinc-950 lg:text-4xl">
        Наши особенности
      </h1>

      <div className="mt-6 grid grid-rows-3 gap-y-2 lg:gap-y-2">
        <div className="flex grid-cols-4 flex-col items-center gap-x-6 gap-y-4 lg:grid">
          <div className="col-span-1 w-full px-12 lg:w-auto lg:p-0">
            <AspectRatio ratio={1 / 1}>
              <Image
                src="/feature-1.png"
                alt="Иллюстрация №1"
                sizes="(max-width: 1024px) 100vw, 25vw"
                fill
                priority
                className="object-contain"
              />
            </AspectRatio>
          </div>

          <div className="col-span-3 flex flex-col gap-2">
            <h3 className="text-2xl font-bold text-zinc-950 underline decoration-primary underline-offset-2 lg:text-3xl">
              Наша цель
            </h3>
            <p className="text-base font-medium text-zinc-950 md:text-xl">
              Мы стремимся облегчить ваш поиск и предоставить наиболее полную
              информацию о разнообразных возможностях для активного и
              интересного времяпрепровождения в России. Наша команда регулярно
              обновляет данные о проводимых мероприятиях и программах, чтобы вы
              всегда были в курсе самых свежих и актуальных предложений.
            </p>
          </div>
        </div>

        <div className="flex grid-cols-4 flex-col items-center gap-x-6 gap-y-4 lg:grid">
          <div className="order-2 col-span-3 flex flex-col gap-2 lg:order-1">
            <h3 className="text-2xl font-bold text-zinc-950 underline decoration-primary underline-offset-2 lg:text-3xl">
              Что делает нас особенными?
            </h3>
            <p className="text-base font-medium text-zinc-950 md:text-xl">
              У нас собраны все мероприятия в России на одной платформе. Вы
              найдете информацию о времени, месте, контактах и условиях участия.
              Организаторы могут бесплатно разместить информацию о своих
              проектах. Создаем уникальное пространство для взаимодействия
              организаторов и участников.
            </p>
          </div>

          <div className="order-1 col-span-1 w-full px-12 lg:order-2 lg:w-auto lg:p-0">
            <AspectRatio ratio={1 / 1}>
              <Image
                src="/feature-2.png"
                alt="Иллюстрация №2"
                sizes="(max-width: 1024px) 100vw, 25vw"
                fill
                priority
                className="object-contain"
              />
            </AspectRatio>
          </div>
        </div>

        <div className="flex grid-cols-4 flex-col items-center gap-x-6 gap-y-4 lg:grid">
          <div className="col-span-1 w-full px-12 lg:w-auto lg:p-0">
            <AspectRatio ratio={1 / 1}>
              <Image
                src="/feature-3.png"
                alt="Иллюстрация №3"
                sizes="(max-width: 1024px) 100vw, 25vw"
                fill
                priority
                className="object-contain"
              />
            </AspectRatio>
          </div>

          <div className="col-span-3 flex flex-col gap-2">
            <h3 className="text-2xl font-bold text-zinc-950 underline decoration-primary underline-offset-2 lg:text-3xl">
              Будьте с нами!
            </h3>
            <p className="text-base font-medium text-zinc-950 md:text-xl">
              На нашем портале есть выбор для всех возрастов и уровней
              подготовки. Спортивные секции, мастер-классы, культурные события,
              благотворительные акции и образовательные программы – ждут вас!
              Поможем расширить горизонты, найти новые увлечения и друзей. Будем
              рады видеть вас в числе наших пользователей!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
