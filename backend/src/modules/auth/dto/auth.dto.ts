import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail, IsNotEmpty, Length, Matches } from "class-validator";

export class AuthDto {
  @ApiProperty({ type: String })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ type: String })
  @IsString()
  @Length(6, 32)
  @Matches(/[0-9]/, { message: "password must contain at least one digit" })
  @Matches(/[a-zA-Z]/, { message: "password must contain at least one letter" })
  @Matches(/^\S+$/, { message: "password must not contain spaces" })
  password: string;
}
