import React from 'react';

import { Button } from '@ui/button';
import { Spinner } from '@ui/spinner';
import { RotateCcw, Save } from 'lucide-react';

const ActionButtons = ({
  saveLabel,
  isSubmitting,
  onReset,
}: {
  saveLabel?: string;
  isSubmitting?: boolean;
  onReset?: () => void;
}) => {
  return (
    <div className="border-border flex items-center justify-end space-x-4 border-t pt-6">
      <Button
        type="button"
        variant="outline"
        onClick={onReset}
        className="h-10 px-6 py-2"
        disabled={isSubmitting}
      >
        <RotateCcw className="mr-2 h-4 w-4" />
        Clear
      </Button>
      <Button
        type="submit"
        className="bg-primary hover:bg-primary/90 h-10 px-6 py-2"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <Spinner />
        ) : (
          <>
            <Save className="h-4 w-4" />
            {saveLabel || 'Save Changes'}
          </>
        )}
      </Button>
    </div>
  );
};

export default ActionButtons;
