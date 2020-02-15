import React, { useState } from 'react';
import { Button, Grid, GridProps, Message } from 'semantic-ui-react'
import { Form as FormikForm, Formik, FormikHelpers, FormikProps } from 'formik';
import clsNames from '../../helpers/clsNames';

import DataFormFieldGroup, { DataFormFieldGroupProps } from './DataFormFieldGroup';
import { SemanticWIDTHS } from "semantic-ui-react/dist/commonjs/generic";

export interface DataFormProps<V> {
  initialValues: V;
  validationSchema?: any | (() => any);
  fieldGroups: Array<DataFormFieldGroupProps>;

  className?: string;
  gridProps?: GridProps;
  width?: SemanticWIDTHS;

  showCancel?: boolean
  submitText?: string
  cancelText?: string

  onSubmit(values: V, formikHelpers: FormikHelpers<V>): void | Promise<any>;

  onCancel?(): void;
}

const defaultGridProps: GridProps = {
  columns: 'equal', stackable: true, padded: false
};

export default function DataForm<V>(props: DataFormProps<V>) {
  const [submitting, setSubmitting] = useState(false);
  const [submitErr, setSubmitErr] = useState();
  const hasError = !!submitErr;
  const errMsg = submitErr?.replace('GraphQL error:', '').trim();

  const formSubmit = async (values: V, formikHelpers: FormikHelpers<V>) => {
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

  const width = props.width || 16;
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
            <Grid {...Object.assign(defaultGridProps, props.gridProps)} >
              <Grid.Row>
                {
                  props.fieldGroups.map((o, idx) => (

                    <Grid.Column key={idx} width={width} {...o.gridProps}>
                      <DataFormFieldGroup  {...o} />
                    </Grid.Column>
                  ))
                }
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={width}>
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





