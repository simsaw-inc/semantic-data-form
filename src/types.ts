import { ReactElement } from 'react'
import { GridColumnProps, GridProps } from 'semantic-ui-react';
import { FormikHelpers } from 'formik';
import { SemanticWIDTHS } from 'semantic-ui-react/dist/commonjs/generic';

export interface DataFormProps<V> {
  initialValues: V;
  validationSchema?: any | (() => any);

  gridProps?: GridProps;
  width?: SemanticWIDTHS;
  fieldGroups: Array<DataFormFieldGroupProps>;

  onSubmit(values: V, formikHelpers: FormikHelpers<V>): void | Promise<any>;

  onCancel?(): void;
}

export interface DataFormFieldGroupProps {
  gridProps?: GridColumnProps;
  width?: SemanticWIDTHS;
  fields: DataFormFieldProps | Array<DataFormFieldProps | ReactElement> | ReactElement
}


export interface DataFormFieldProps {
  type: DataFormFieldType;
  name: string;
  placeholder?: string;
  label?: string;
  style?: object

  render?(value: any): any

}

export enum DataFormFieldType {
  Text = 'text',
  TextArea = 'textArea',
  Email = 'email',
  Password = 'password',
  Radio = 'radio',
  CheckBox = 'chk',
  DropDown = 'select',
  Upload = 'upload',
  UploadMulti = 'uploadMulti',
  Custom = 'custom',
}


