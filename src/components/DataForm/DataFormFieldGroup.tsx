import React from 'react';
import { Form } from 'semantic-ui-react';
import DataFormField from './DataFormField';
import { DataFormFieldGroupProps, DataFormFieldProps } from './index';

export default function DataFormFieldGroup<V>(props: DataFormFieldGroupProps<V>) {
  const isArray = Array.isArray(props.fields);
  const ips = props.fields as Array<DataFormFieldProps<V>>;

  return (
    <Form.Group widths='equal'>
      {
        isArray
          ? ips.map((o, idx) => (
            <DataFormField key={idx} {...o} formProps={props.formProps}/>
          ))
          : <DataFormField {...props.fields as DataFormFieldProps<V>} formProps={props.formProps}/>

      }
    </Form.Group>

  )

}
