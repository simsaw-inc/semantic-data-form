import React from 'react';
import * as yup from 'yup';
import {useHistory} from 'react-router-dom';
import DataForm, {DataFormFieldType} from 'semantic-data-form';
import {Path} from '../routes'
import {sleepFor} from '../helpers/sleep'


export default function Quote() {
    const history = useHistory();
    return (
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
                pickupCode: yup.string().required(),
                pickupOn: yup.string().required(),
                dropCode: yup.string().required(),
                dropOn: yup.string().required(),
                vehicleId: yup.number().required(),
                email: yup.string().email().required(),
                isAgree: yup.boolean().required(),
            })}
            onSubmit={async (values, {setSubmitting}) => {
                await sleepFor(2);
                setSubmitting(false);
            }}
            onCancel={() => {
                history.push(Path.Home);
            }}
            fieldGroups={[
                {
                    fields: {label: 'Pickup PostCode', name: 'pickupCode', type: DataFormFieldType.Text}
                },
                {
                    fields: {label: 'Pickup Date', name: 'pickupCode', type: DataFormFieldType.Text}
                },
                {
                    fields: {label: 'Drop PostCode', name: 'dropCode', type: DataFormFieldType.Text}
                },
                {
                    fields: {label: 'Drop Date', name: 'dropOn', type: DataFormFieldType.Text}
                },
                {
                    fields: {label: 'Vehicle', name: 'vehicleId', type: DataFormFieldType.DropDown}
                },
                {
                    fields: {label: 'Email', name: 'email', type: DataFormFieldType.Email}
                },
                {
                    fields: {label: 'Special Instructions', name: 'note', type: DataFormFieldType.TextArea}
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
    )
};
