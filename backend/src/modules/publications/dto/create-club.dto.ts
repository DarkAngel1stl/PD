import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty, IsUrl, IsArray } from 'class-validator';
import {
  Organizer,
  Format,
  Address,
  ClubType,
  AgeCategory,
} from '@prisma/client';

class OrganizerClass {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ type: String })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;
}

class AddressClass {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  readonly country: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  readonly city: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  readonly text: string;

  @ApiProperty({ isArray: true, type: Number })
  @IsArray()
  @IsNotEmpty()
  readonly point: number[];
}

class AgeCategoryClass {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  readonly from: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  readonly to: string;
}

export class CreateClubDto {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  readonly content: string;

  @ApiProperty({ type: OrganizerClass })
  @IsNotEmpty()
  readonly organizer: Organizer;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  readonly website: string;

  @ApiProperty({ type: AgeCategoryClass })
  @IsNotEmpty()
  readonly ageCategory: AgeCategory;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  readonly format: Format;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  readonly type: ClubType;

  @ApiProperty({ type: AddressClass })
  @IsNotEmpty()
  readonly address: Address;

  @ApiProperty({ isArray: true, type: String })
  @IsArray()
  @IsNotEmpty()
  readonly images: string[];

  @ApiProperty({ isArray: true, type: String })
  @IsArray()
  @IsNotEmpty()
  readonly categoryIds: string[];
}
