import React from 'react';

import { Button } from '@ui/button';
import { ChevronLeft } from 'lucide-react';

type PageHeaderProps = {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  onBack?: () => void;
};

const PageHeader = ({ title, description, icon, onBack }: PageHeaderProps) => {
  return (
    <div className="flex items-center gap-3">
      {!onBack && (
        <div className="bg-primary-500/10 text-primary hidden h-12 w-12 items-center justify-center rounded-lg sm:flex">
          {icon}
        </div>
      )}

      {onBack && (
        <Button variant="outline" size="icon" onClick={onBack}>
          <ChevronLeft />
        </Button>
      )}
      <div>
        <h1 className="title">{title}</h1>
        {description && <p className="description">{description}</p>}
      </div>
    </div>
  );
};

export default PageHeader;
