'use client';

import React from 'react';

import { Trash } from 'lucide-react';
import { toast } from 'sonner';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useDeleteConfirmationStore } from '@/stores/delete-confirmation';

const DeleteConfirmationDialog: React.FC = () => {
  const {
    isOpen,
    isLoading,
    title,
    description,
    confirmButtonText,
    cancelButtonText,
    closeDialog,
    confirm,
  } = useDeleteConfirmationStore();

  const handleOpenChange = (open: boolean) => {
    // Only allow closing when not loading
    if (!open && !isLoading) {
      closeDialog();
    }
  };

  const handleConfirm = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await confirm();
      toast.success('Item deleted successfully');
    } catch (error) {
      toast.error('Failed to delete item. Please try again.');
      console.error('Delete error:', error);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={isLoading ? () => {} : handleOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <Trash className="text-destructive h-5 w-5" />
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>{cancelButtonText}</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            disabled={isLoading}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Deleting...
              </div>
            ) : (
              confirmButtonText
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteConfirmationDialog;
