import React, { useState } from 'react';
import { Button, Message } from 'semantic-ui-react'
import { Form as FormikForm, Formik, FormikHelpers, FormikProps } from 'formik';
import clsNames from '../../helpers/clsNames';
import { DataFormProps } from './index';
import DataFormFieldGroup from './DataFormFieldGroup';
import { setTimeout } from "timers";


export default function DataForm<V>(props: DataFormProps<V>) {
  const [submitting, setSubmitting] = useState(false);
  const [isError, setIsError] = useState(false);
  const [msg, setMsg] = useState('');
  const [to, setTo] = useState();

  // set new timeout
  const message = (isError: boolean = false, txt: string = '') => {
    if (!msg && !txt) return; // msg is already empty

    setIsError(isError);
    setMsg(txt);
  };

  const formSubmit = async (values: V, formikHelpers: FormikHelpers<V>) => {
    if (submitting) return;
    if (to) clearTimeout(to);

    setSubmitting(true);
    message();
    try {
      const res = await props.onSubmit(values, formikHelpers);
      if (!!res) {
        message(false, res);
      }
    } catch (ex) {
      if (props.onSubmitError && typeof props.onSubmitError === 'function') {
        props.onSubmitError(ex);
        return;
      }

      message(true, ex.message || ex)
    } finally {
      setSubmitting(false);
      const sec = props.messageInterval || 5; //default 5 seconds
      setTo(setTimeout(message, 1000 * (sec < 0 ? 5 : sec)))
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
            className={clsNames('ui form', isError && 'error', props.className)}
            autoComplete="off"
          >
            <>
              {
                props.fieldGroups.map((o, idx) => (
                  <DataFormFieldGroup key={idx}  {...o} formProps={fProps}/>
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

              {msg && (
                <Message
                  negative={isError}
                  positive={!isError}
                  header={isError ? 'Error' : 'Success'}
                  content={msg}
                />
              )}
            </>

          </FormikForm>
        )}

      </Formik>
    </React.Fragment>
  );
}





