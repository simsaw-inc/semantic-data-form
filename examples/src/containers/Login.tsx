import React from 'react';
import * as yup from 'yup';

import DataForm, {DataFormFieldType} from 'semantic-data-form';
import {sleepFor} from '../helpers/sleep';


const schema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Required'),
    password: yup.string().min(5, 'Must be more than 5 char').required('Required'),
});

export default function Login() {
    // login mutation
    return (
        <>
            <h1>Login</h1>
            <p>some content for Login page</p>

            <DataForm
                validationSchema={schema}
                initialValues={{
                    email: '',
                    password: '',
                }}
                onSubmit={async (values: any, {setSubmitting}) => {
                    await sleepFor(3); // simulate save operation
                    setSubmitting(false);
                }}

                width={8}
                fieldGroups={[
                    {
                        fields: {label: 'Email', name: 'email', type: DataFormFieldType.Email}
                    },
                    {
                        fields: {label: 'Password', name: 'password', type: DataFormFieldType.Password}
                    }
                ]}
            />
        </>
    )
};
