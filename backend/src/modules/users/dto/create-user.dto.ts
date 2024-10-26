import { OmitType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail, IsNotEmpty, Length, Matches } from "class-validator";
import { User } from "../entities/user.entity";

export class CreateUserDto extends OmitType(User, ["id"]) {
  @ApiProperty({ type: String })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({ type: String })
  @IsString()
  @Length(6, 32)
  @Matches(/[0-9]/, { message: "password must contain at least one digit" })
  @Matches(/[a-zA-Z]/, { message: "password must contain at least one letter" })
  @Matches(/^\S+$/, { message: "password must not contain spaces" })
  readonly password: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  readonly name: string;
}
