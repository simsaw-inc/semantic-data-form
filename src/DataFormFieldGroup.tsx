import React from 'react';
import { Form } from 'semantic-ui-react';
import { DataFormFieldGroupProps, DataFormFieldProps } from './types';
import DataFormField from './DataFormField';


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
