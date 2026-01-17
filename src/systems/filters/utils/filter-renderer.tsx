import DatePicker from '@ui/date-picker';
import { RadioGroup, RadioGroupItem } from '@ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@ui/select';
import { Switch } from '@ui/switch';

import { cn } from '@/lib/utils';

import { FilterField } from '../components/filter-field';
import { FilterConfig } from '../types';

export function renderFilterField(
  item: FilterConfig,
  value: string | undefined,
  onChange: (v?: string) => void
) {
  const disabled = item.disabled;

  switch (item.type) {
    case 'date': {
      const displayFormat = item.span === 'full' ? 'PPP' : 'yyyy-MM-dd';

      return (
        <FilterField key={item.key} label={item.label} span={item.span}>
          <DatePicker
            date={value}
            onDateChange={disabled ? undefined : onChange}
            displayFormat={displayFormat}
            disabled={disabled}
          />
        </FilterField>
      );
    }

    case 'select':
      return (
        <FilterField key={item.key} label={item.label} span={item.span}>
          <Select value={value} onValueChange={onChange} disabled={disabled}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              {item.options?.map(o => (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FilterField>
      );

    case 'radio':
      return (
        <FilterField key={item.key} label={item.label} span={item.span}>
          <RadioGroup
            value={value}
            onValueChange={disabled ? undefined : onChange}
            disabled={disabled}
            className={cn(
              item.orientation === 'horizontal' ? 'flex flex-wrap gap-4' : 'grid grid-cols-1 gap-2'
            )}
          >
            {item.options?.map(o => (
              <label
                htmlFor={o.value}
                key={o.value}
                className="flex items-center gap-2 opacity-100"
              >
                <RadioGroupItem value={o.value} disabled={disabled} id={o.value} />
                <span>{o.label}</span>
              </label>
            ))}
          </RadioGroup>
        </FilterField>
      );

    case 'switch':
      return (
        <FilterField key={item.key} label={item.label} span={item.span}>
          <Switch
            checked={value === 'true'}
            disabled={disabled}
            onCheckedChange={v => onChange(v ? 'true' : undefined)}
          />
        </FilterField>
      );

    default:
      return null;
  }
}
