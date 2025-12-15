import { AlertTriangle, CheckCircle, Trash2 } from 'lucide-react';

export const VARIANT_CONFIG = {
  delete: {
    icon: Trash2,
    confirmButtonVariant: 'destructive' as const,
    defaultConfirmText: 'Delete',
    defaultCancelText: 'Cancel',
    loadingText: 'Deleting…',
    actionButtonClassName: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
    iconColor: 'text-destructive',
  },

  confirm: {
    icon: CheckCircle,
    confirmButtonVariant: 'default' as const,
    defaultConfirmText: 'Confirm',
    defaultCancelText: 'Cancel',
    loadingText: 'Confirming…',
    actionButtonClassName: 'bg-primary text-primary-foreground hover:bg-primary/90',
    iconColor: 'text-primary',
  },

  warning: {
    icon: AlertTriangle,
    confirmButtonVariant: 'warning' as const,
    defaultConfirmText: 'Proceed',
    defaultCancelText: 'Cancel',
    loadingText: 'Processing…',
    actionButtonClassName:
      'bg-yellow-500 text-black hover:bg-yellow-500/90 focus-visible:ring-yellow-500',
    iconColor: 'text-yellow-500',
  },
};
