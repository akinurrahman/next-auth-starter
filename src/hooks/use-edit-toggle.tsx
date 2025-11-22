'use client';

import { useState } from 'react';

import { Button } from '@ui/button';
import { Edit, Eye } from 'lucide-react';

interface EditToggleProps {
  editText?: string;
  cancelText?: string;
  onCancel?: () => void;
  className?: string;
}

export const useEditToggle = (initialState = false) => {
  const [isEditing, setIsEditing] = useState(initialState);

  const EditButton = ({
    editText = 'Edit Mode',
    cancelText = 'View Mode',
    onCancel,
    className = '',
  }: EditToggleProps = {}) => (
    <div className={className}>
      <Button
        type="button"
        variant="outline"
        onClick={() => {
          if (isEditing) {
            onCancel?.();
            setIsEditing(false);
          } else {
            setIsEditing(true);
          }
        }}
        className="h-9 px-4"
      >
        {isEditing ? (
          <>
            <Eye className="mr-.5 h-4 w-4" />
            {cancelText}
          </>
        ) : (
          <>
            <Edit className="mr-.5 h-4 w-4" />
            {editText}
          </>
        )}
      </Button>
    </div>
  );

  return { isEditing, EditButton, setIsEditing };
};
