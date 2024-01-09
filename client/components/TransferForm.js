import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAppContext } from '../contexts/AppContext';
import styles from "../styles/Formik.module.css";

const validationSchema = Yup.object().shape({
  to: Yup.string().required('Recipient username is required'),
  amount: Yup.number().min(1, 'Amount must be greater than 0').required('Amount is required'),
  token: Yup.string().required("You need to select a token to transfer.") 
});

const TransferForm = ({transferTokens})=> {
    const {state, dispatch} = useAppContext();
    return (
        <Formik 
            initialValues={state.transferFormData}
            validationSchema={validationSchema}
            onSubmit={(values, {resetForm}) => {
                transferTokens(values);
                resetForm();
                dispatch({ type: 'RESET_FORM_DATA' });
            }}>
    
            <Form>
                <div className={styles.entrybox}>
                    <label htmlFor="to"  className={styles.label}>Recipient Username:</label>
                    <Field type="text" id="to" name="to" className={styles.option}/>
                    <ErrorMessage name="to" component="div" />    
                </div>

                <div className={styles.entrybox}>
                    <label htmlFor="amount" className={styles.label}>Amount:</label>
                    <Field type="number" id="amount" name="amount" className={styles.option} />
                    <ErrorMessage name="amount" component="div" />
                </div>
            
                <div className={styles.entrybox}>
                    <label htmlFor="token"  className={styles.label}>Token:</label>
                    <Field as="select" type="text" name="token" id="token" className={styles.option}>
                        <option value="" className={styles.option}>TCO2</option>
                        <option value="" className={styles.option}>MCO2</option>
                        <option value="" className={styles.option}>BCT</option>
                    </Field>
                    <ErrorMessage name="token" component="div" />
                </div>
                <div className={styles.buttonbox}>
                    <button type="submit" className={styles.button}>Transfer Tokens</button>
                </div>
            </Form>
        </Formik>
    )
}

export default TransferForm