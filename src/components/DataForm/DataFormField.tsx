import { Form } from 'semantic-ui-react';
import React from 'react';
import { useField } from 'formik';
import FileUpload from './FileUpload';
import { DataFormFieldProps, DataFormFieldType } from './index';

export default function DataFormField<V>(props: DataFormFieldProps<V>) {
  const [field, meta, helper] = useField(props.name);
  const val = field.value;
  const hasError = meta.touched && !!meta.error;
  const err = hasError && (props.hideErrorLabel ? true : meta.error);
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
          disabled={props.disabled}
          loading={props.loading}
        />
      );

    case DataFormFieldType.TextArea:
      return (
        <Form.TextArea
          name={props.name} label={label} placeholder={props.placeholder}
          onChange={field.onChange}
          value={val}
          error={err}
          disabled={props.disabled}
        />
      );

    case DataFormFieldType.Radio:
      return (
        <Form.Radio
          name={props.name} label={label} placeholder={props.placeholder}
          onChange={field.onChange}
          value={val}
          error={err}
          disabled={props.disabled}
        />
      );


    case DataFormFieldType.CheckBox:
      return (
        <Form.Checkbox
          name={props.name} label={label} placeholder={props.placeholder}
          onChange={(e, { checked }) => helper.setValue(checked)}
          checked={val}
          error={hasError && (props.hideErrorLabel ? true : {
            content: err,
            pointing: 'left',
          })}
          disabled={props.disabled}
        />
      );


    case DataFormFieldType.DropDown:
      return (
        <Form.Select
          name={props.name}
          label={label}
          placeholder={props.placeholder}
          onChange={(e, { value }) => helper.setValue(value)}
          defaultValue={val}
          options={props.options || []}
          error={err}
          disabled={props.disabled}
          loading={props.loading}
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
            typeof props.render === 'function' && props.render({
              hasError: meta.touched && !!meta.error,
              error: meta.error,
              value: field.value,
              props: props,
              setValue: helper.setValue
            }, props.formProps)
          }
        </Form.Field>
      );

    default:
      return null;

  }

}
