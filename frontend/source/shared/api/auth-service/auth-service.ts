import { AxiosPromise } from 'axios';

import { api } from '../axios/axios';
import { Endpoints } from '../axios/endpoints';
import { IAccount } from '@/entities/account';
import { LoginRequest, LoginResponse } from './interfaces';

export class AuthService {
  static login = (data: LoginRequest): AxiosPromise<LoginResponse> =>
    api.post(Endpoints.AUTH.LOGIN, data);

  static logout = (): AxiosPromise<void> => api.get(Endpoints.AUTH.LOGOUT);

  static refreshTokens = (): AxiosPromise<LoginResponse> =>
    api.get(Endpoints.AUTH.REFRESHTOKENS);

  static getMe = (): AxiosPromise<IAccount> => api.get(Endpoints.AUTH.GETME);
}
