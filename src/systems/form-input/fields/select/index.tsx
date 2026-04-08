import { ControllerRenderProps } from 'react-hook-form';

import { SelectFieldProps } from '../../types';
import MultiSelect from './multi-select';
import SelectField from './select-field';

export const renderSelectByType = (props: SelectFieldProps, field: ControllerRenderProps) => {
  switch (props.type) {
    case 'multi-select':
      return <MultiSelect props={props} field={field} />;

    default:
      return <SelectField props={props} field={field} />;
  }
};
