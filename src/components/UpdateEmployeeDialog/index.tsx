import React, { useReducer, useState } from 'react'
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Form, Field } from 'react-final-form';
import { classNames } from 'primereact/utils';
import { InputText } from 'primereact/inputtext';
import { RadioButton } from 'primereact/radiobutton';
import { Calendar } from 'primereact/calendar';
import { InputNumber } from 'primereact/inputnumber';
import validator from 'validator';
import { useAppDispatch } from '../../../hooks';
import { updateUser } from '@/actions/userActions';

export interface IProps {
    onShow: boolean;
    onHide: () => void;
    setUpdated: React.Dispatch<React.SetStateAction<boolean>>;
    setUserUpdateDialog: React.Dispatch<React.SetStateAction<boolean>>;
    user?: IFormData;
}
export interface FieldProps {
    input: any,
    number: number,
    meta: Object,
}

export type IFormData = {
    _id: string,
    name: string,
    firstname: string;
    lastname: string;
    email: string;
    salary: number;
    status: string;
    birthDate: string;
}
export interface IError {
    firstname?: string;
    lastname?: string;
    email?: string;
    salary?: string;
    status?: string;
    birthDate?: string;
}

const UpdateEmployeeDialog = ({ onShow, onHide, setUpdated, setUserUpdateDialog, user }: IProps) => {

    const [isLoading, setIsloading] = useState<boolean>(false);
    const [formData, setFormData] = useState<IFormData>();
    const dispatch = useAppDispatch();



    const isFormFieldValid = (meta: any) => !!(meta.touched && meta.error);
    const getFormErrorMessage = (meta: any) => {
        return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
    };

    const validate = (data: IFormData) => {
        const { firstname, lastname, email, salary, status, birthDate } = data;
        let errors: IError = {};

        if (!firstname) {
            errors.firstname = 'First Name is required.';
        }

        if (!lastname) {
            errors.lastname = 'Last Name is required.';
        }
        if (!email) {
            errors.email = 'Email is required.';
        } else if (email && !validator.isEmail(email)) {
            errors.email = 'Please provide a valid email address.'
        }

        if (!salary) {
            errors.salary = 'Salary must be provided.';
        }
        if (!status) {
            errors.status = 'Status must be provided.';
        }
        if (!birthDate) {
            errors.birthDate = 'Birth Date must be provided.';
        }
        return errors;
    }

    const onSubmit = (data: IFormData) => {
        setIsloading(true);
        setFormData(data)
        dispatch(updateUser(user!._id, data))
        setIsloading(false);
        setUserUpdateDialog(false);
    }

    return (
        <Dialog visible={onShow} style={{ width: '450px' }} header="Employee Details" modal className="p-fluid" onHide={onHide}>

            <div className="py-5">
                <Form onSubmit={onSubmit} initialValues={{ firstname: user?.firstname, lastname: user?.lastname, email: user?.email, salary: user?.salary, status: user?.status, birthDate: new Date(user!.birthDate) }} validate={validate} render={({ handleSubmit }) => (
                    <form onSubmit={handleSubmit} className="p-fluid">
                        <Field name="firstname" render={({ input, meta }: FieldProps) => (
                            <div className="mb-5">
                                <span className="p-float-label p-input-icon-right">
                                    <i className="pi pi-user" />
                                    <InputText id="firstname" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                    <label htmlFor="firstname" className={classNames({ 'p-error': isFormFieldValid(meta) })}>First Name*</label>
                                </span>
                                {getFormErrorMessage(meta)}
                            </div>
                        )} />
                        <Field name="lastname" render={({ input, meta }: FieldProps) => (
                            <div className="mb-5">
                                <span className="p-float-label p-input-icon-right">
                                    <i className="pi pi-user" />
                                    <InputText id="lastname" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                    <label htmlFor="lastname" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Last Name*</label>
                                </span>
                                {getFormErrorMessage(meta)}
                            </div>
                        )} />

                        <Field name="email" render={({ input, meta }: FieldProps) => (
                            <div className="mb-5">
                                <span className="p-float-label p-input-icon-right">
                                    <i className="pi pi-envelope" />
                                    <InputText id="email" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                    <label htmlFor="email" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Email*</label>
                                </span>
                                {getFormErrorMessage(meta)}
                            </div>
                        )} />
                        <Field name="salary" render={({ input, meta }: FieldProps) => (
                            <div className="mb-5">
                                <span className="p-float-label p-input-icon-right">
                                    <i className="pi pi-user" />
                                    <InputNumber id="salary" ref={input.ref} onBlur={input.onBlur} onValueChange={(e) => input.onChange(e)} value={input.value} mode="decimal" className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                    <label htmlFor="salary" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Salary*</label>
                                </span>
                                {getFormErrorMessage(meta)}
                            </div>

                        )} />
                        <div className="radio-group">
                            <h5 className="mb-5">status</h5>
                            <div className="mb-8">
                                <div className="flex gap-4 items-center">
                                    <Field name="status" type="radio" value="active" render={({ input, meta }: FieldProps) => (
                                        <div className="field-radiobutton">
                                            <RadioButton className="mr-2" type="radop" {...input} name={input.name} value="active" checked={input.checked} onChange={input.onChange} />
                                            <label htmlFor="active" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Active</label>

                                        </div>

                                    )} />
                                    <Field name="status" type="radio" value="inactive" render={({ input, meta }: FieldProps) => (
                                        <div className="field-radiobutton">
                                            <RadioButton className="mr-2" type="radop" {...input} name={input.name} value="inactive" checked={input.checked} onChange={input.onChange} />
                                            <label htmlFor="inactive" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Inactive</label>
                                        </div>
                                    )} />
                                </div>
                            </div>
                        </div>
                        <Field name="birthDate" render={({ input, meta }: FieldProps) => (
                            <div>
                                <span className="p-float-label">
                                    <Calendar id="birthDate" {...input} dateFormat="dd/mm/yy" showIcon />
                                    <label htmlFor="date">Birth Date</label>
                                </span>
                                {getFormErrorMessage(meta)}
                            </div>
                        )} />
                        <div className="flex justify-end mt-6">
                            <div className="flex gap-2 w-60">
                                <Button label="Cancel" type="button" icon="pi pi-times" className="p-button-secondary p-button-sm" onClick={onHide} />
                                <Button label="Update" icon="pi pi-check" className="p-button-success p-button-sm" loading={isLoading} />
                            </div>
                        </div>
                    </form>
                )} />
            </div>
        </Dialog>
    )
}

export default UpdateEmployeeDialog
