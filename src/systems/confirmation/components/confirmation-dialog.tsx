'use client';

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@ui/alert-dialog';
import { Button } from '@ui/button';

import { useConfirmationStore } from '../store';
import { VARIANT_CONFIG } from './variant-config';

export function ConfirmationDialog() {
  const { open, config, loading, closeConfirmation, setLoading } = useConfirmationStore();

  if (!config) return null;

  const {
    title,
    description,
    item,
    onConfirm,
    variant = 'delete',
    confirmText,
    cancelText,
  } = config;

  const variantConfig = VARIANT_CONFIG[variant];
  const Icon = variantConfig.icon;

  const resolvedDescription = typeof description === 'function' ? description(item) : description;

  const handleConfirm = async () => {
    try {
      setLoading(true);
      await onConfirm(item);
      closeConfirmation();
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={loading ? () => {} : closeConfirmation}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <Icon size={20} className={variantConfig.iconColor} />
            {title}
          </AlertDialogTitle>

          <AlertDialogDescription>{resolvedDescription}</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>
            {cancelText ?? variantConfig.defaultCancelText}
          </AlertDialogCancel>

          <Button
            type="button"
            onClick={handleConfirm}
            disabled={loading}
            className={variantConfig.actionButtonClassName}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                {variantConfig.loadingText}
              </span>
            ) : (
              (confirmText ?? variantConfig.defaultConfirmText)
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
