import React from 'react'
import { GridColumnProps, GridProps } from 'semantic-ui-react';
import { FormikHelpers } from 'formik';
import { SemanticWIDTHS } from 'semantic-ui-react/dist/commonjs/generic';
import { DropdownItemProps } from 'semantic-ui-react/dist/commonjs/modules/Dropdown/DropdownItem';
import { FieldHelperProps, FieldInputProps, FieldMetaProps } from "formik/dist/types";

export interface DataFormProps<V> {
  initialValues: V;
  validationSchema?: any | (() => any);

  gridProps?: GridProps;
  width?: SemanticWIDTHS;
  fieldGroups: Array<DataFormFieldGroupProps>;

  showCancel?: boolean
  submitText?: string
  cancelText?: string

  onSubmit(values: V, formikHelpers: FormikHelpers<V>): void | Promise<any>;

  onCancel?(): void;
}

export interface DataFormFieldGroupProps {
  gridProps?: GridColumnProps;
  width?: SemanticWIDTHS;
  fields: DataFormFieldProps | DropDownFieldProps | Array<DataFormFieldProps | DropDownFieldProps | React.ReactElement> | React.ReactElement
}


export interface DataFormFieldProps {
  type: DataFormFieldType;
  name: string;
  placeholder?: string;
  label?: string;
  style?: object

  render?(field: FieldInputProps<any>, meta: FieldMetaProps<any>, helper: FieldHelperProps<any>): any

}

export interface DropDownFieldProps extends DataFormFieldProps {
  options: Array<DropdownItemProps>
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


