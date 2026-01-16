import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

import { AuthResponse, User } from '@/features/auth/login/types/auth.types';
import { cookieStorage } from '@/lib/cookie-helper';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;

  isLoggedIn: boolean;

  login: (data: AuthResponse['data']) => void;
  updateTokens: (accessToken: string, refreshToken: string) => void;
  logout: () => void;

  isAuthInitialized: boolean;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      set => ({
        user: null,
        accessToken: null,
        refreshToken: null,
        isLoggedIn: false,

        isAuthInitialized: false,

        login: data => {
          set({
            user: data.user,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
            isLoggedIn: true,
          });
        },

        updateTokens: (accessToken, refreshToken) => {
          set({
            accessToken,
            refreshToken,
          });
        },

        logout: () => {
          set({
            user: null,
            accessToken: null,
            refreshToken: null,
            isLoggedIn: false,
          });
        },
      }),
      {
        name: 'auth-storage',
        storage: createJSONStorage(() => cookieStorage),

        onRehydrateStorage: () => state => {
          if (!state) return;

          // 👇 DEV DEFAULT USER
          if (process.env.NODE_ENV === 'development' && !state.user) {
            state.user = {
              _id: 'dev-user',
              email: 'dev@local.test',
              role: 'ADMIN', // 🔁 change role here
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              fullName: 'Dev User',
              isActive: true,
              lastLogin: new Date().toISOString(),
            } as User;

            state.isLoggedIn = true;
          }

          state.isAuthInitialized = true;
        },
      }
    )
  )
);
