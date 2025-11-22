import React from 'react';

type PageHeaderProps = {
  title: string;
  description?: string;
  icon: React.ReactNode;
};

const PageHeader = ({ title, description, icon }: PageHeaderProps) => {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/10 text-purple-500">
        {icon}
      </div>
      <div>
        <h1 className="title">{title}</h1>
        {description && <p className="description">{description}</p>}
      </div>
    </div>
  );
};

export default PageHeader;
