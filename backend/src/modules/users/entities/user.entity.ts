import { Role, User as UserModel } from "@prisma/client";
import { Exclude } from "class-transformer";

export class User implements UserModel {
  id: string;

  email: string;

  @Exclude({ toPlainOnly: true })
  password: string;

  name: string;

  role: Role;
}
