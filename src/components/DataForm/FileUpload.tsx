import React from 'react';
import {Form, LabelProps, SemanticShorthandItem} from 'semantic-ui-react';

export interface FileUploadProps {
  name: string;
  label?: string | JSX.Element | undefined;
  value: any;
  error: boolean | SemanticShorthandItem<LabelProps>;

  onChange(e: FileList | null): void;
}

export default function FileUpload(props: FileUploadProps) {

  return (
    <Form.Input
      error={props.error}
      label={props.label}
      type="file"
      onChange={(e) => {
        props.onChange(e.target.files);
      }}
    />
  )
}
