import {
  Event as EventModel,
  Organizer,
  Format,
  Address,
} from '@prisma/client';

export class Event implements EventModel {
  id: string;

  title: string;

  content: string;

  images: string[];

  organizer: Organizer;

  website: string;

  ageCategory: string;

  startDate: Date;

  endDate: Date;

  format: Format;

  address: Address;

  published: boolean;

  createdAt: Date;

  categoryIds: string[];
}
