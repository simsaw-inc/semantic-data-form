import React from 'react';
import { Form, GridColumnProps } from 'semantic-ui-react';

import DataFormField, { DataFormFieldProps, DropDownFieldProps } from './DataFormField';
import { SemanticWIDTHS } from "semantic-ui-react/dist/commonjs/generic";

export interface DataFormFieldGroupProps {
  gridProps?: GridColumnProps;
  width?: SemanticWIDTHS;
  fields: (DataFormFieldProps | DropDownFieldProps | React.ReactElement)
    | Array<DataFormFieldProps | DropDownFieldProps | React.ReactElement>
}

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
