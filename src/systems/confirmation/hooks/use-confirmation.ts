import { useConfirmationStore } from '../store';
import { ConfirmationVariant } from '../types';

export function useConfirmation<T>() {
  const openConfirmation = useConfirmationStore(s => s.openConfirmation);

  return {
    confirm: openConfirmation as (config: {
      item: T;
      title: string;
      description?: string | ((item: T) => string);
      onConfirm: (item: T) => Promise<void>;
      variant?: ConfirmationVariant;
    }) => void,
  };
}
