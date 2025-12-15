import { create } from 'zustand';

import { ConfirmationConfig } from './types';

type ConfirmationState = {
  open: boolean;
  loading: boolean;
  config: ConfirmationConfig<unknown> | null;

  openConfirmation: (config: ConfirmationConfig<unknown>) => void;
  closeConfirmation: () => void;
  setLoading: (loading: boolean) => void;
};

export const useConfirmationStore = create<ConfirmationState>(set => ({
  open: false,
  loading: false,
  config: null,

  openConfirmation: config =>
    set({
      open: true,
      loading: false,
      config,
    }),

  closeConfirmation: () =>
    set({
      open: false,
      loading: false,
      config: null,
    }),

  setLoading: loading => set({ loading }),
}));
