import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsDate,
  IsUrl,
  IsArray,
} from 'class-validator';
import { Organizer, Format, Address } from '@prisma/client';

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

export class CreateEventDto {
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

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  readonly ageCategory: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  readonly format: Format;

  @ApiProperty({ type: Date })
  @IsString()
  @IsNotEmpty()
  readonly startDate: Date;

  @ApiProperty({ type: Date })
  @IsString()
  @IsNotEmpty()
  readonly endDate: Date;

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
