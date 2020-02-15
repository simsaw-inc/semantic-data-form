import { GridColumnProps, DropdownItemProps } from 'semantic-ui-react';
import { SemanticWIDTHS } from 'semantic-ui-react/dist/commonjs/generic';
import { FormikHelpers } from 'formik';

export { default } from './DataForm'

export interface DataFormProps<V> {
  /** Form initial values */
  initialValues: V;
  /** Validation schema for form */
  validationSchema?: any | (() => any);
  /** Collection of field groups */
  fieldGroups: Array<DataFormFieldGroupProps>;
  /** Form custom class name */
  className?: string;
  /** To show Cancel action button  */
  showCancel?: boolean
  /** To set custom text to Submit action button */
  submitText?: string
  /** To set custom text to Cancel action button */
  cancelText?: string

  /** CB for Submit action button click */
  onSubmit(values: V, formikHelpers: FormikHelpers<V>): void | Promise<any>;

  /** CB for Cancel action button click */
  onCancel?(): void;
}


export interface DataFormFieldProps {
  /** type of component to render */
  type: DataFormFieldType;
  /** name must be unique to avoid conflicts */
  name: string;
  /** placeholder text for inputs */
  placeholder?: string;
  /** label for input */
  label?: string;
  /** custom style object */
  style?: object;
  /** set field as disabled */
  disabled?: boolean;
  /** show loader  */
  loading?: boolean;
  /** to hide error label */
  hideErrorLabel?: boolean;

  /** Dropdown options */
  options?: Array<DropdownItemProps>

  render?(data: DataFormFieldRenderProps): any
}

export interface DataFormFieldRenderProps {
  /** Value of the field */
  value: any;

  /** Tells if input has any validation error */
  hasError: boolean;

  /** Error message of the field */
  error?: string;

  /** All props that was passed on */
  props: DataFormFieldProps

  setValue(value: any): void;
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
  fields: DataFormFieldProps | React.ReactElement | Array<DataFormFieldProps | React.ReactElement>
}

