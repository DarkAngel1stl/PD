import { IAccount } from '@/entities/account/model/interfaces';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse extends IAccount {
  accessToken: string;
}
