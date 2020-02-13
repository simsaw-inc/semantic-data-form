import { Form } from 'semantic-ui-react';
import React from 'react';
import { useField } from 'formik';
import FileUpload from './FileUpload';
import { DataFormFieldType, DataFormFieldProps, DropDownFieldProps } from './types';


export default function DataFormField(props: DataFormFieldProps | DropDownFieldProps) {
  const [field, meta, helper] = useField(props.name);
  const val = field.value;
  const err = meta.touched && meta.error;
  const label = props.label || '\u00A0';


  switch (props.type) {
    case DataFormFieldType.Text:
    case DataFormFieldType.Email:
    case DataFormFieldType.Password:
      return (
        <Form.Input
          type={props.type}
          name={props.name}
          label={label}
          placeholder={props.placeholder}
          onChange={field.onChange}
          value={val}
          error={err}
        />
      );

    case DataFormFieldType.TextArea:
      return (
        <Form.TextArea
          name={props.name} label={label} placeholder={props.placeholder}
          onChange={field.onChange}
          value={val}
          error={err}
        />
      );

    case DataFormFieldType.Radio:
      return (
        <Form.Radio
          name={props.name} label={label} placeholder={props.placeholder}
          onChange={field.onChange}
          value={val}
          error={err}
        />
      );


    case DataFormFieldType.CheckBox:
      return (
        <Form.Checkbox
          name={props.name} label={label} placeholder={props.placeholder}
          onChange={(e, { checked }) => helper.setValue(checked)}
          checked={val}
          error={!!err && {
            content: err,
            pointing: 'left',
          }}
        />
      );


    case DataFormFieldType.DropDown:
      return (
        <Form.Select
          name={props.name}
          label={label}
          onChange={(e, { value }) => helper.setValue(value)}
          defaultValue={val}
          options={(
            props.placeholder
              ? [{ value: 0, text: props.placeholder }, ...(props as DropDownFieldProps).options]
              : (props as DropDownFieldProps).options
          )}
          error={err}
        />
      );

    case DataFormFieldType.UploadMulti:
    case DataFormFieldType.Upload:
      return (
        <FileUpload
          name={props.name}
          label={label}
          onChange={helper.setValue}
          value={val}
          error={err}
        />
      );

    case DataFormFieldType.Custom:
      return (
        <Form.Field error={!!err}>
          <label>{label}</label>
          {
            typeof props.render === 'function' && props.render(field, meta, helper, props)
          }
        </Form.Field>
      );

    default:
      return null;

  }

}
