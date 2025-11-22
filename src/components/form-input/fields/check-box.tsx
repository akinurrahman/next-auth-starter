'use client';

import { Checkbox } from '@ui/checkbox';

export function CheckboxField() {
  return (
    <div className="flex items-center gap-3">
      <Checkbox id="terms" className="border-primary" />
    </div>
  );
}
