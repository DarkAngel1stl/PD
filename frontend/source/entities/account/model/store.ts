import { create } from 'zustand';
import { IAccount } from '..';
import { AxiosPromise } from 'axios';
import { AuthService } from '@/shared/api/auth-service';
import { isTokenExpired } from '@/shared/lib/jwt';

interface IAccountStore {
  token: string;
  account: IAccount | null;
  loading: boolean;
  error: boolean;
  login: (data: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  getAccount: () => Promise<void>;
  getToken: () => Promise<string | null>;
}

let refreshTokenRequest: AxiosPromise<{ accessToken: string }> | null = null;

export const useAccountStore = create<IAccountStore>()((set, get) => ({
  token: '',
  account: null,
  loading: true,
  error: false,
  login: async (data: { email: string; password: string }) => {
    try {
      set({ loading: true });
      const response = await AuthService.login(data);
      const { accessToken, ...account } = response.data;
      set({ token: accessToken });
      set({ account: account });
      set({ error: false });
    } catch (error: unknown) {
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },
  logout: async () => {
    try {
      set({ loading: true });
      await AuthService.logout();
      set({ token: '' });
      set({ account: null });
    } catch (error: unknown) {
    } finally {
      set({ loading: false });
    }
  },
  getAccount: async () => {
    try {
      set({ loading: true });
      const response = await AuthService.getMe();
      set({ account: response.data });
    } catch (error: unknown) {
    } finally {
      set({ loading: false });
    }
  },
  getToken: async () => {
    try {
      const token = get().token;
      if (!token || isTokenExpired(token)) {
        if (refreshTokenRequest === null) {
          refreshTokenRequest = AuthService.refreshTokens();
        }
        const response = await refreshTokenRequest;
        refreshTokenRequest = null;
        set({ token: response.data.accessToken });
        return response.data.accessToken;
      }
      return token;
    } catch (error: unknown) {
      return null;
    }
  },
}));
