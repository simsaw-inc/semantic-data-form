import React, { useState } from 'react';
import { Button, Message } from 'semantic-ui-react'
import { Form as FormikForm, Formik, FormikHelpers, FormikProps } from 'formik';
import clsNames from '../../helpers/clsNames';
import { DataFormProps } from './index';
import DataFormFieldGroup from './DataFormFieldGroup';


export default function DataForm<V>(props: DataFormProps<V>) {
  const [submitting, setSubmitting] = useState(false);
  const [submitErr, setSubmitErr] = useState();
  const hasError = !!submitErr;
  const errMsg = submitErr?.replace('GraphQL error:', '').trim();

  const formSubmit = async (values: V, formikHelpers: FormikHelpers<V>) => {
    if (submitting) return;

    setSubmitting(true);
    try {
      await props.onSubmit(values, formikHelpers);
    } catch (ex) {
      setSubmitErr(ex.message || ex)
    } finally {
      setSubmitting(false);
    }
  };

  const callCancel = () => {
    if (!props.showCancel || !props.onCancel || typeof props.onCancel !== 'function') return;

    props.onCancel();
  };

  return (
    <React.Fragment>
      <Formik
        initialValues={props.initialValues}
        validationSchema={props.validationSchema}
        onSubmit={formSubmit}
      >
        {(fProps: FormikProps<V>) => (
          <FormikForm
            onSubmit={fProps.handleSubmit}
            className={clsNames('ui form', hasError && 'error', props.className)}
            autoComplete="off"
          >
            <>
              {
                props.fieldGroups.map((o, idx) => (

                  <DataFormFieldGroup key={idx}  {...o} />
                ))
              }
              <Button
                primary
                type="submit"
                content={(props.submitText || 'Submit')}
                loading={submitting}
              />
              {props.showCancel && (
                <Button
                  content={(props.cancelText || 'Cancel')}
                  onClick={callCancel}
                  disabled={submitting}
                />
              )}

              {hasError && <Message error header='Error' content={errMsg}/>}
            </>

          </FormikForm>
        )}

      </Formik>
    </React.Fragment>
  );
}





