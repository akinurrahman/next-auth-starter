import type { AxiosInstance } from 'axios';
import { toast } from 'sonner';

import { useAuthStore } from '@/stores/auth.store';

let isRefreshing = false;
let queued: ((token: string) => void)[] = [];

async function refresh(refreshToken: string, client: AxiosInstance) {
  try {
    const res = await client.post('/auth/refresh-token', { refreshToken });
    return res.data?.data;
  } catch {
    return null;
  }
}

export function attachInterceptors(client: AxiosInstance) {
  client.interceptors.request.use(config => {
    const token = useAuthStore.getState().accessToken;
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  client.interceptors.response.use(
    res => res,
    async error => {
      const original = error.config;

      if (error.response?.status === 401 && !original._retry) {
        original._retry = true;

        const store = useAuthStore.getState();
        const rt = store.refreshToken;

        const isLoginRoute = typeof window !== 'undefined' && window.location.pathname === '/login';

        if (!rt) {
          if (!isLoginRoute) {
            store.logout();
            toast.error('Session expired. Please login again.');
            window.history.replaceState(null, '', '/login');
          }
          return Promise.reject(error);
        }

        if (!isRefreshing) {
          isRefreshing = true;

          const fresh = await refresh(rt, client);
          isRefreshing = false;

          if (fresh?.accessToken) {
            store.updateTokens(fresh.accessToken, fresh.refreshToken);

            queued.forEach(cb => cb(fresh.accessToken));
            queued = [];

            original.headers.Authorization = `Bearer ${fresh.accessToken}`;
            return client(original);
          }

          store.logout();
          toast.error('Session expired. Please login again.');
          window.history.replaceState(null, '', '/login');
          return Promise.reject(error);
        }

        return new Promise(resolve => {
          queued.push(token => {
            original.headers.Authorization = `Bearer ${token}`;
            resolve(client(original));
          });
        });
      }

      return Promise.reject(error);
    }
  );
}
