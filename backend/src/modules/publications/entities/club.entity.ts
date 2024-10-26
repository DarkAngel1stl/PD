import {
  Club as ClubModel,
  Organizer,
  Format,
  Address,
  ClubType,
  AgeCategory,
} from '@prisma/client';

export class Club implements ClubModel {
  id: string;

  title: string;

  content: string;

  images: string[];

  organizer: Organizer;

  website: string;

  ageCategory: AgeCategory;

  type: ClubType;

  format: Format;

  address: Address;

  createdAt: Date;

  published: boolean;

  categoryIds: string[];
}
