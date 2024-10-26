import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class SubscribeEventDto {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  readonly userId: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  readonly eventId: string;
}
