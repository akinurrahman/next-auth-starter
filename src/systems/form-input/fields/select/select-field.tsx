'use client';

import { useEffect, useRef } from 'react';

import { FormControl } from '@ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@ui/select';
import { ControllerRenderProps, useFormContext, useWatch } from 'react-hook-form';

import { SingleSelectFieldProps } from '../../types';

interface SelectProps {
  props: SingleSelectFieldProps;
  field: ControllerRenderProps;
}

// Sentinel used when dependsOn is not set — this key is never registered in any real form,
// so useWatch returns undefined harmlessly without watching real form state.
const NO_PARENT = '__FormInput_cascade_none__';

const SelectField = ({ props, field }: SelectProps) => {
  const { setValue, getValues } = useFormContext();

  // Reactively track the parent field so we re-render when it changes.
  // useWatch must always be called (hooks rules), so we use a sentinel when there is no parent.
  const parentValue = useWatch({ name: props.dependsOn ?? NO_PARENT });

  // Skip the very first run so we don't wipe pre-populated values on mount (e.g. edit mode).
  const isMounted = useRef(false);
  useEffect(() => {
    if (!props.dependsOn) return;
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    setValue(props.name, '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parentValue]);

  // When optionsFn is provided, call it with the full current form values.
  // getValues() is always fresh on every render triggered by the useWatch above.
  const resolvedOptions = props.optionsFn
    ? props.optionsFn(getValues() as Record<string, unknown>)
    : (props.options ?? []);

  return (
    <Select
      disabled={props.disabled}
      onValueChange={value => value && field.onChange(value)}
      value={field.value}
    >
      <FormControl>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={props.placeholder} />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {resolvedOptions.map(item => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectField;
