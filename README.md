# semantic-data-form
Easy way to render json based forms suing [SemanticUI](https://react.semantic-ui.com) and [Formik](https://jaredpalmer.com/formik/)

## Form data structure 
   Wrapped with Formik form and Symantic Form Fields having following props:
    
- className: set custom class names to form tag.    
- validationSchema: will be [yup](https://github.com/jquense/yup) object for simple and clean validations
- initialValues: Fromik needs default values to all props it needs to bind, even if there is no initial value is there to bind define a empty structure and set it.
- onSubmit: fn that will be called on Submit button click
- onCancel: fn that wtill be called on Cancel button click
- showCancel: to show Cancel Button, make sure you set onCancel with it. Default is false
- submitText: set custom Submit button text. Default is "Submit"
- cancelText: set custom Cancel button text. Default is "Cancel"
- fieldGroups: of array of Grid.Column wrapped in single Symantic Grird.Row having Fields inside Symantic Form.Group
    - fields: it can be single DataFormField or Array<DataFormField>, DataFormField looks like as
        - type: type of field that we want to render, e.g. text, email, dropdown etc.
        - name: name of field, will be used by Formik to bind data with. 
        - placeholder: will be used for types: text | email | textArea
        - label: label text for field
        - style: custom style object
        - options: in case of dropDown use it to pass on options
        - disabled: to show disabled input
        - loading: to show loading, works for text and drop down only
        - hideErrorLabel: to stop showing error label 
        - render: in default supported types does not meet the requirement, set type = Custom and define render fn,
           fn will be passed on Formik useField hook data as individual param  
             
    

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


### Update History
- Clear submit form Success/Error message after a interval. Also added a optional cb to get onSubmitError
- Custom field render param will have extra prop, formProps: FormikProps 
