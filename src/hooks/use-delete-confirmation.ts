import { useDeleteConfirmationStore } from '@/stores/delete-confirmation';

export type DeletableItem = { _id: string; [key: string]: unknown };

interface UseDeleteConfirmationConfig<T extends DeletableItem> {
  onDelete: (item: T) => Promise<void>;
  title?: string;
  description?: string | ((item: T) => string);
  confirmButtonText?: string;
  cancelButtonText?: string;
  nameField?: keyof T;
}

export function useDeleteConfirmation<T extends DeletableItem>({
  onDelete,
  title = 'Are you absolutely sure?',
  description,
  confirmButtonText = 'Delete',
  cancelButtonText = 'Cancel',
  nameField = 'name' as keyof T,
}: UseDeleteConfirmationConfig<T>) {
  const { openDialog } = useDeleteConfirmationStore();

  const confirmDelete = (item: T) => {
    const itemName = String(item[nameField] ?? item._id);

    const finalDescription =
      typeof description === 'function'
        ? description(item)
        : description ||
          `This action cannot be undone. This will permanently delete "${itemName}".`;

    openDialog({
      item,
      title,
      description: finalDescription,
      confirmButtonText,
      cancelButtonText,
      onConfirm: async i => {
        await onDelete(i as T);
      },
    });
  };

  return { confirmDelete };
}
