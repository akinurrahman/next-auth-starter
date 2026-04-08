import { ControllerRenderProps } from 'react-hook-form';

import { FileUploadProps } from '../../types';
import FileUpload01 from './file-upload-v1';

export const renderFileByVariant = (props: FileUploadProps, field: ControllerRenderProps) => {
  switch (props.variant) {
    case 'v1':
      return <FileUpload01 props={props} field={field} />;
    default:
      return null;
  }
};
