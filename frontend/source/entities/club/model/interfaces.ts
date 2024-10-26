import { ICategory } from '@/entities/category';

export interface IClub {
  id: string;
  title: string;
  content: string;
  images: string[];
  categories: ICategory[];
  organizer: {
    name: string;
    email: string;
  };
  website: string;
  format: string;
  type: string;
  ageCategory: {
    from: string;
    to: string;
  };
  address: {
    point: number[];
    city: string;
    text: string;
    country: string;
  };
}
