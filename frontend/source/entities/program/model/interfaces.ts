import { ICategory } from '@/entities/category';

export interface IProgram {
  id: string;
  title: string;
  content: string;
  images: string[];
  startDate?: Date;
  endDate?: Date;
  isDated: boolean;
  categories: ICategory[];
  organizer: {
    name: string;
    email: string;
  };
  website: string;
  city: string;
}
