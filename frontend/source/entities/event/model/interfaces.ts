import { ICategory } from '@/entities/category';

interface ISubscription {
  userId: string;
}

export interface IEvent {
  id: string;
  title: string;
  content: string;
  images: string[];
  ageCategory: string;
  startDate: Date;
  endDate: Date;
  format: string;
  categories: ICategory[];
  subscriptions: ISubscription[];
  organizer: {
    name: string;
    email: string;
  };
  website: string;
  address: {
    text: string;
    city: string;
    country: string;
    point: number[];
  };
}
