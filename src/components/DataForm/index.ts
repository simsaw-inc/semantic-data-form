import { DropdownItemProps } from 'semantic-ui-react';
import { FormikHelpers, FormikProps } from 'formik';

export { default } from './DataForm'

export interface DataFormProps<V> {
  /** Form initial values */
  initialValues: V;
  /** Validation schema for form */
  validationSchema?: any | (() => any);
  /** Collection of field groups */
  fieldGroups: Array<DataFormFieldGroupProps<V>>;
  /** Form custom class name */
  className?: string;
  /** To show Cancel action button  */
  showCancel?: boolean
  /** To set custom text to Submit action button */
  submitText?: string
  /** To set custom text to Cancel action button */
  cancelText?: string

  /** seconds to show Success/Error message, default is 5 seconds */
  messageInterval?: number

  /** CB for Submit action button click, onSubmit can return a success message to display */
  onSubmit(values: V, formikHelpers: FormikHelpers<V>): void | string | Promise<void | string>;

  /** If passed on form will not self render error msg */
  onSubmitError?(err: any): void;

  /** CB for Cancel action button click */
  onCancel?(): void;
}


export interface DataFormFieldProps<V> {
  /** Form props, internally user, don't set it your self */
  formProps?: FormikProps<V>

  /** type of component to render */
  type: DataFormFieldType;
  /** name must be unique to avoid conflicts */
  name: string;
  /** placeholder text for inputs */
  placeholder?: string;
  /** label for input */
  label?: string | JSX.Element;
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

  render?(data: DataFormFieldRenderProps<V>, formProps?: FormikProps<V>): any
}

export interface DataFormFieldRenderProps<V> {
  /** Value of the field */
  value: any;

  /** Tells if input has any validation error */
  hasError: boolean;

  /** Error message of the field */
  error?: string;

  /** All props that was passed on */
  props: DataFormFieldProps<V>
  formProps?: FormikProps<V>

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

export interface DataFormFieldGroupProps<V> {
  formProps?: FormikProps<V>
  fields: DataFormFieldProps<V> | React.ReactElement | Array<DataFormFieldProps<V> | React.ReactElement>
}

