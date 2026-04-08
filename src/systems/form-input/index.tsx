import { FormControl, FormDescription, FormField, FormItem, FormMessage } from '@ui/form';
import { Label } from '@ui/label';
import { useFormContext, useWatch } from 'react-hook-form';

import { renderFieldByType } from './render-field-by-types';
import { FormInputProps } from './types';

// Sentinel used when dependsOn is not set — never matches a real field,
// so useWatch returns undefined harmlessly (keeps hook call count stable).
const NO_PARENT = '__FormInput_cascade_none__';

export function FormInput(props: FormInputProps) {
  const { control } = useFormContext();

  // Always watch the parent field (hooks must not be called conditionally).
  // When dependsOn is not set we watch the sentinel, which is always undefined.
  const parentValue = useWatch({ name: props.dependsOn ?? NO_PARENT, control });

  // Hide the field if: dependsOn is set AND alwaysVisible is not AND parent has no value.
  if (props.dependsOn && !props.alwaysVisible && !parentValue) {
    return null;
  }

  return (
    <FormField
      control={control}
      name={props.name}
      render={({ field }) => {
        return (
          <FormItem title={props.title || props.label}>
            {props.label && (
              <Label>
                {props.label} {props.required && <span className="text-destructive">*</span>}
              </Label>
            )}
            <FormControl>{renderFieldByType(props, field)}</FormControl>
            {props.description && <FormDescription>{props.description}</FormDescription>}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
