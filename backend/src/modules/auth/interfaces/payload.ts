import { Role } from "@prisma/client";

export interface TokenPayload {
  iat: number;
  exp: number;
  id: string;
  email: string;
  role: Role;
}
