import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsDate,
  IsUrl,
  IsArray,
  IsBoolean,
  IsOptional,
} from 'class-validator';
import { Organizer, Format } from '@prisma/client';

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

export class CreateProgramDto {
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

  @ApiProperty({ type: Date })
  @IsString()
  @IsOptional()
  readonly startDate: Date;

  @ApiProperty({ type: Date })
  @IsString()
  @IsOptional()
  readonly endDate: Date;

  @ApiProperty({ type: Boolean })
  @IsBoolean()
  @IsNotEmpty()
  readonly isDated: boolean;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  readonly city: string;

  @ApiProperty({ isArray: true, type: String })
  @IsArray()
  @IsNotEmpty()
  readonly images: string[];

  @ApiProperty({ isArray: true, type: String })
  @IsArray()
  @IsNotEmpty()
  readonly categoryIds: string[];
}
