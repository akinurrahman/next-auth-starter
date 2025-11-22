import { create } from 'zustand';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface DeleteConfirmationState<T = any> {
  isOpen: boolean;
  isLoading: boolean;

  item: T | null;

  title: string;
  description: string;
  confirmButtonText: string;
  cancelButtonText: string;

  onConfirm: ((item: T) => Promise<void>) | null;

  openDialog: (config: {
    item: T;
    title?: string;
    description?: string;
    confirmButtonText?: string;
    cancelButtonText?: string;
    onConfirm: (item: T) => Promise<void>;
  }) => void;

  closeDialog: () => void;
  setLoading: (loading: boolean) => void;
  confirm: () => Promise<void>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useDeleteConfirmationStore = create<DeleteConfirmationState<any>>((set, get) => ({
  isOpen: false,
  isLoading: false,

  item: null,
  title: 'Are you absolutely sure?',
  description: '',
  confirmButtonText: 'Delete',
  cancelButtonText: 'Cancel',
  onConfirm: null,

  openDialog: ({ item, title, description, confirmButtonText, cancelButtonText, onConfirm }) => {
    set({
      isOpen: true,
      isLoading: false,
      item,
      title: title || 'Are you absolutely sure?',
      description:
        description || 'This action cannot be undone. This will permanently delete the item.',
      confirmButtonText: confirmButtonText || 'Delete',
      cancelButtonText: cancelButtonText || 'Cancel',
      onConfirm,
    });
  },

  closeDialog: () =>
    set({
      isOpen: false,
      item: null,
      isLoading: false,
      onConfirm: null,
    }),

  setLoading: loading => set({ isLoading: loading }),

  confirm: async () => {
    const { item, onConfirm } = get();
    if (!item || !onConfirm) return;

    try {
      set({ isLoading: true });
      await onConfirm(item);

      set({
        isOpen: false,
        isLoading: false,
        item: null,
        onConfirm: null,
      });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
}));
