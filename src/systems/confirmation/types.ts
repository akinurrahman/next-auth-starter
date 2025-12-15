import { ReactNode } from 'react';

export type ConfirmationVariant = 'delete' | 'confirm' | 'warning';

export type ConfirmationConfig<T> = {
  title: string;
  description: string | ((item: T) => ReactNode);
  variant?: ConfirmationVariant;
  item: T;
  confirmText?: string;
  cancelText?: string;
  onConfirm: (item: T) => Promise<void> | void;
};
