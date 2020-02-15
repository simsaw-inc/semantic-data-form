import React from 'react';
import * as yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import { FieldHelperProps, FieldInputProps, FieldMetaProps } from 'formik';
import Calendar from 'react-calendar';
import DataForm, { DataFormFieldType } from '../components/DataForm';
import { Path } from '../routes'
import { sleepFor } from '../helpers/sleep'
import { Form, Popup } from "semantic-ui-react";


export default function Quote() {
  const history = useHistory();
  return (
    <>
      <Link to="/">Go To Home</Link>
      <br/>
      <br/>

      <DataForm
        initialValues={{
          pickupCode: '',
          pickupOn: '',
          dropCode: '',
          dropOn: '',
          vehicleId: '',
          email: '',
          note: '',
          isAgree: false,
        }}
        validationSchema={yup.object().shape({
          pickupCode: yup.string().required('Required'),
          pickupOn: yup.string().required('Required'),
          dropCode: yup.string().required('Required'),
          dropOn: yup.string().required('Required'),
          vehicleId: yup.number().required('Required'),
          email: yup.string().email('Wrong email').required('Required'),
          isAgree: yup.boolean().oneOf([true], 'Required'),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          console.log('Posted data:');
          console.log(values);

          await sleepFor(1);
          setSubmitting(false);
        }}
        onCancel={() => {
          history.push(Path.Home);
        }}
        fieldGroups={[
          {
            fields: [
              { label: 'Pickup PostCode', name: 'pickupCode', type: DataFormFieldType.Text },
              { label: 'Pickup Date', name: 'pickupOn', type: DataFormFieldType.Custom, render: DatePicker }
            ]
          },
          {
            fields: [
              { label: 'Drop PostCode', name: 'dropCode', type: DataFormFieldType.Text },
              { label: 'Drop Date', name: 'dropOn', type: DataFormFieldType.Custom, render: DatePicker }
            ]
          },
          {
            fields: {
              label: 'Vehicle',
              name: 'vehicleId',
              type: DataFormFieldType.DropDown,
              options: [
                { value: 1, text: 'vehicle A' },
                { value: 2, text: 'vehicle B' },
                { value: 3, text: 'vehicle C' },
              ]
            }
          },
          {
            fields: { label: 'Email', name: 'email', type: DataFormFieldType.Email }
          },
          {
            fields: { label: 'Special Instructions', name: 'note', type: DataFormFieldType.TextArea }
          },
          {
            fields: {
              label: 'I agree to you terms and conditions',
              name: 'isAgree',
              type: DataFormFieldType.CheckBox
            }
          },
        ]}
      />

    </>
  )
};

function DatePicker(field: FieldInputProps<any>, meta: FieldMetaProps<any>, helper: FieldHelperProps<any>): any {
  // date format for en-GB = dd/mm/yyyy
  const splits = field?.value.split('/');
  const dt = (field.value && new Date(splits[2], Number(splits[1]) - 1, splits[0])) || null;
  return (
    <Popup
      on='focus'
      trigger={<Form.Input value={field.value} error={meta.touched && meta.error} />}
      content={(
        <Calendar
          minDate={new Date()}
          value={dt}
          onChange={(dt) => {
            const dtStr = (dt as Date).toLocaleDateString('en-GB');
            helper.setValue(dtStr);
          }}
        />
      )}
    />
  )
}
