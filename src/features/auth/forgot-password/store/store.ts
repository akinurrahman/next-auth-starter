import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type ForgotPasswordStore = {
  email: string | null;
  resetToken: string | null;
  setEmail: (email: string) => void;
  setResetToken: (token: string) => void;
  clear: () => void;
};

export const useForgotPasswordStore = create(
  persist<ForgotPasswordStore>(
    set => ({
      email: null,
      resetToken: null,
      setEmail: email => set({ email }),
      setResetToken: resetToken => set({ resetToken }),
      clear: () => set({ email: null, resetToken: null }),
    }),
    {
      name: 'forgot-password',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
