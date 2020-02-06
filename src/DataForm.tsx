import React, { useState } from 'react';
import { Button, Grid, GridProps, Message } from 'semantic-ui-react'
import { Form as FormikForm, Formik, FormikHelpers, FormikProps } from 'formik';
import clsNames from './helpers/clsNames';
import { DataFormProps } from './types';
import DataFormFieldGroup from './DataFormFieldGroup';


const defaultGridProps: GridProps = {
  columns: 'equal', stackable: true, padded: false
};

export default function DataForm<V>(props: DataFormProps<V>) {
  const [submitting, setSubmitting] = useState(false);
  const [submitErr, setSubmitErr] = useState();
  const hasError = !!submitErr;
  const errMsg = submitErr?.replace('GraphQL error:', '').trim();

  const showCancel = typeof props.onCancel === 'function';

  const formSubmit = async (values: V, formikHelpers: FormikHelpers<V>) => {
    setSubmitting(true);
    try {
      await props.onSubmit(values, formikHelpers);
    } catch (ex) {
      setSubmitting(false);
      setSubmitErr(ex.message || ex)
    }

  };

  const width = props.width || 16;
  return (
    <React.Fragment>
      <Formik
        autoComplete="off"
        initialValues={props.initialValues}
        validationSchema={props.validationSchema}
        onSubmit={formSubmit}
      >
        {(fProps: FormikProps<V>) => (
          <FormikForm onSubmit={fProps.handleSubmit} className={clsNames('ui form', hasError && 'error')}>
            <Grid {...Object.assign(defaultGridProps, props.gridProps)} >

              {
                props.fieldGroups.map((o, idx) => (
                  <Grid.Row key={idx}>
                    <Grid.Column width={width} {...o.gridProps}>
                      <DataFormFieldGroup  {...o} />
                    </Grid.Column>
                  </Grid.Row>
                ))}

              <Grid.Row>
                <Grid.Column width={width}>
                  <Button content="Submit" primary type="submit" loading={submitting}/>
                  {showCancel && <Button content="Cancel" onClick={props.onCancel} disabled={submitting}/>}
                </Grid.Column>
              </Grid.Row>

              <Grid.Row>
                <Grid.Column width={width}>
                  {hasError && <Message error header='Error' content={errMsg}/>}
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </FormikForm>
        )}

      </Formik>
    </React.Fragment>
  );
}





