import React from 'react';
import { Form } from 'semantic-ui-react';
import DataFormField from './DataFormField';
import { DataFormFieldGroupProps, DataFormFieldProps } from './index';

export default function DataFormFieldGroup(props: DataFormFieldGroupProps) {
  const isArray = Array.isArray(props.fields);
  const ips = props.fields as Array<DataFormFieldProps>;

  return (
    <Form.Group widths='equal'>
      {
        isArray
          ? ips.map((o, idx) => (
            <DataFormField key={idx} {...o} />
          ))
          : <DataFormField {...props.fields as DataFormFieldProps} />

      }
    </Form.Group>

  )

}
