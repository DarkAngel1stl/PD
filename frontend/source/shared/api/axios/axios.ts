import axios, { AxiosError } from 'axios';

import { Endpoints } from './endpoints';
import { useAccountStore } from '@/entities/account';

export const API_URL = 'https://social-programs-portal-backend.vercel.app/api/';

export const api = axios.create({ baseURL: API_URL, withCredentials: true });

const urlsAuth = [
  Endpoints.AUTH.GETME,
  Endpoints.AUTH.LOGOUT,
  Endpoints.OFFERS.GET,
  Endpoints.OFFERS.DATABASE,
  Endpoints.OFFERS.DELETE,
  Endpoints.OFFERS.PUBLISH,
];

api.interceptors.request.use(async (config) => {
  if (typeof window === 'undefined') {
    return config;
  }
  if (config.url && !urlsAuth.includes(config.url)) {
    return config;
  }
  const getToken = useAccountStore.getState().getToken;
  const token = await getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (typeof window !== 'undefined') {
      const token = useAccountStore.getState().token;
      const logout = useAccountStore.getState().logout;
      const isLoggedIn = !!token;
      if (error.response?.status === 401 && isLoggedIn) {
        logout();
      }
    }
  }
);
