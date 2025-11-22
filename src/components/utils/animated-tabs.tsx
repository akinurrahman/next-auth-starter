import React from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@ui/tooltip';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface TabConfig {
  id: string;
  label: string;
  path: string;
  title: string;
  description: string;
  icon?: LucideIcon;
}

interface AnimatedTabsInterface {
  activeTab: string;
  tabConfigs: TabConfig[];
  onTabChange: (tabId: string) => void;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

const AnimatedTabs: React.FC<AnimatedTabsInterface> = ({
  activeTab,
  tabConfigs,
  onTabChange,
  children,
  size = 'md',
  showLabel = true,
}) => {
  const isMobile = useIsMobile();
  const shouldShowLabel = showLabel && !isMobile;

  return (
    <TooltipProvider>
      <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
        <TabsList
          className={cn(
            'inline-flex w-full items-center rounded-lg border p-1',
            'border-[var(--color-border)] bg-[var(--color-muted)]'
          )}
        >
          {tabConfigs.map(tab => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;

            return (
              <Tooltip key={tab.id}>
                <TooltipTrigger asChild>
                  <TabsTrigger
                    value={tab.id}
                    className={cn(
                      'relative inline-flex flex-1 items-center justify-center rounded-md text-xs font-medium transition-all',
                      // Size-based styling
                      size === 'sm' ? 'h-6 px-2' : size === 'md' ? 'h-8 px-3' : 'h-10 px-4',
                      isSelected && 'text-[var(--color-foreground)]',
                      isMobile && 'px-1' // Reduce padding on mobile
                    )}
                  >
                    {isSelected && (
                      <motion.div
                        layoutId="site-config-bg"
                        className="absolute inset-0 rounded-md bg-[var(--color-card)] shadow-sm"
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    )}
                    <div
                      className={cn(
                        'relative z-10 flex items-center',
                        // Decreased gap classes for tighter spacing
                        isMobile
                          ? 'gap-0'
                          : size === 'sm'
                            ? 'gap-0.5'
                            : size === 'md'
                              ? 'gap-1'
                              : 'gap-1.5'
                      )}
                    >
                      {Icon && <Icon size={size === 'sm' ? 12 : size === 'md' ? 14 : 12} />}
                      {shouldShowLabel && <span>{tab.label}</span>}
                    </div>
                  </TabsTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{tab.label}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </TabsList>
        <TabsContent value={activeTab} className="mt-6">
          {children}
        </TabsContent>
      </Tabs>
    </TooltipProvider>
  );
};

export default AnimatedTabs;
