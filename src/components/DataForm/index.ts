import { GridColumnProps, GridProps, DropdownItemProps } from 'semantic-ui-react';
import { SemanticWIDTHS } from 'semantic-ui-react/dist/commonjs/generic';
import { FormikHelpers, FieldHelperProps, FieldInputProps, FieldMetaProps } from "formik";

export { default } from './DataForm'

export interface DataFormProps<V> {
  initialValues: V;
  validationSchema?: any | (() => any);
  fieldGroups: Array<DataFormFieldGroupProps>;

  className?: string;
  gridProps?: GridProps;
  width?: SemanticWIDTHS;

  showCancel?: boolean
  submitText?: string
  cancelText?: string

  onSubmit(values: V, formikHelpers: FormikHelpers<V>): void | Promise<any>;

  onCancel?(): void;
}


export interface DataFormFieldProps {
  type: DataFormFieldType;
  name: string;
  placeholder?: string;
  label?: string;
  style?: object;
  disabled?: boolean;
  loading?: boolean;
  hideErrorLabel?: boolean;

  render?(
    field: FieldInputProps<any>,
    meta: FieldMetaProps<any>,
    helper: FieldHelperProps<any>,
    props: DataFormFieldProps | DropDownFieldProps
  ): any
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


export interface DataFormFieldGroupProps {
  gridProps?: GridColumnProps;
  width?: SemanticWIDTHS;
  fields: (DataFormFieldProps | DropDownFieldProps | React.ReactElement)
    | Array<DataFormFieldProps | DropDownFieldProps | React.ReactElement>
}

