# semantic-data-form
Easy way to render json based forms suing [SemanticUI](https://react.semantic-ui.com) and [Formik](https://jaredpalmer.com/formik/)

## Use Case

    import React from 'react';
    import * as yup from 'yup';
    
    import DataForm, { DataFormFieldType } from 'semantic-data-form';
    import { Link } from 'react-router-dom';
    
    
    const schema = yup.object().shape({
      email: yup.string().email('Invalid email').required('Required'),
      password: yup.string().min(5, 'Must be more than 5 char').required('Required'),
    });
    
    export default function MyComponent() {
      return (
        <>
          <DataForm
            validationSchema={schema}
            initialValues={{
              email: '',
              password: '',
            }}
            onSubmit={async (values: any) => {
              await new Promise((resolve) => {
                        setTimeout(resolve, 1000 * 1)
                      }); // simulate save operation
            }}
    
            width={8}
            fieldGroups={[
              {
                fields: { label: 'Email', name: 'email', type: DataFormFieldType.Email }
              },
              {
                fields: { label: 'Password', name: 'password', type: DataFormFieldType.Password }
              }
            ]}
          />
        </>
      )
    };


### Examples
 check [src/containers/ComplexForm](https://github.com/simsaw-inc/semantic-data-form/tree/master/src/containers/ComplexForm.tsx) for a more complex example
