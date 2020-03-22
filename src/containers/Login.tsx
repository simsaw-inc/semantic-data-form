import React from 'react';
import * as yup from 'yup';

import DataForm, { DataFormFieldType } from '../components/DataForm';
import { sleepFor } from '../helpers/sleep';
import { Link } from 'react-router-dom';


const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Required'),
  password: yup.string().min(5, 'Must be more than 5 char').required('Required'),
});

export default function Login() {
  // login mutation
  return (
    <>
      <Link to="/">Go To Home</Link>
      <br/>
      <h1>Login</h1>
      <p>some content for Login page</p>

      <DataForm
        validationSchema={schema}
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={async (values: any) => {
          console.log('posted data', values);

          await sleepFor(1); // simulate save operation
          // throw new Error("Some error message");

          return 'Done'
        }}

        fieldGroups={[
          {
            fields: { label: 'Email', name: 'email', type: DataFormFieldType.Email }
          },
          {
            fields: { label: 'Password', name: 'password', type: DataFormFieldType.Password }
          }
        ]}

        submitText='Login'
      />
    </>
  )
};
