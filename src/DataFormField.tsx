import { Form } from 'semantic-ui-react';
import React from 'react';
import { useField } from 'formik';
import FileUpload from './FileUpload';
import { DataFormFieldType, DataFormFieldProps } from './types';


export default function DataFormField(props: DataFormFieldProps) {
  const [field, meta, helper] = useField(props);
  const val = field.value;
  const err = meta.touched && meta.error;
  const label = props.label || '\u00A0';

  console.log('*', val);


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
          onChange={field.onChange}
          value={val}
          error={err}
        />
      );


    case DataFormFieldType.DropDown:
      return (
        <Form.Select
          name={props.name} label={label} placeholder={props.placeholder}
          options={[]}
          onChange={field.onChange}
          value={val}
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
        <div style={props.style} className="field">
          {props.label && <label >{props.label}</label>}
          {
            typeof props.render === 'function' && props.render(val)
          }
        </div>
      );

    default:
      return null;

  }

}
