import Link from 'next/link';

import { Logotype } from '@/shared/ui/logotype';
import { MailIcon, PhoneIcon } from 'lucide-react';

const items = [
  { text: 'Программы', href: '/programs' },
  { text: 'Мероприятия', href: '/events' },
  { text: 'Кружки и секции', href: '/clubs-and-sections' },
  { text: 'Предложить событие', href: '/suggestions' },
  { text: 'О нас', href: '/about-us' },
  { text: 'Панель управления', href: '/dashboard' },
];

export const Footer = () => {
  return (
    <footer className="w-full bg-primary">
      <div className="container">
        <div className="flex flex-col gap-y-6 py-4 font-medium text-white">
          <div className="flex flex-wrap justify-between gap-x-12 gap-y-6">
            <div className="flex flex-col flex-wrap gap-x-8 gap-y-6 md:flex-row">
              {items.map((item, idx) => (
                <Link key={`footer-navigation-item-${idx}`} href={item.href}>
                  {item.text}
                </Link>
              ))}
            </div>

            <div className="flex flex-wrap gap-x-8 gap-y-6">
              <Link
                href="mailto: help_vkurse@mail.ru"
                className="flex items-center gap-x-1.5"
              >
                <MailIcon className="h-5 w-5" />
                help_vkurse@mail.ru
              </Link>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between gap-y-6 sm:flex-row">
            <div className="flex items-center gap-x-4">
              <Logotype className="h-6" />
              <span className="hidden text-base font-medium lg:inline-block">
                Наша цель наполнить Вашу социальную жизнь большим количеством
                красок!
              </span>
            </div>
            <span className="text-center text-base font-medium">
              © 2024 Оформление сайта. Команда «Web».
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
