import { Program as ProgramModel, Organizer } from '@prisma/client';

export class Program implements ProgramModel {
  id: string;

  title: string;

  content: string;

  images: string[];

  organizer: Organizer;

  website: string;

  startDate: Date;

  endDate: Date;

  isDated: boolean;

  city: string;

  published: boolean;

  createdAt: Date;

  categoryIds: string[];
}
