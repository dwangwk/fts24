import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAppContext } from '../contexts/AppContext';
import styles from "../styles/Formik.module.css";

const validationSchema = Yup.object().shape({
  recipientAddress: Yup.string().required('Recipient address is required'),
  amount: Yup.number().min(1, 'Amount must be greater than 0').required('Amount is required'),
});

const ConvertForm = ({ onTransfer }) => {
  const { state, dispatch } = useAppContext();
  return (
      <Formik
        initialValues={state.mintFormData}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          onTransfer({values});
          resetForm();
          dispatch({ type: 'RESET_FORM_DATA' });
        }}
      >
        <Form>
          <div className={styles.entrybox}>
              <label htmlFor="token"  className={styles.label}>Token:</label>
                <Field as="select" type="text" name="token" id="token" className={styles.option}>
                      <option value="KILMA" className={styles.option}>MCO2</option>
                      <option value="MCO2" className={styles.option}>KILMA</option>
                </Field>
              <ErrorMessage name="token" component="div" />
          </div>

          <div className={styles.entrybox}>
            <label htmlFor="amount"  className={styles.label}>Amount:</label>
            <Field type="number" id="amount" name="amount" className={styles.option}/>
            <ErrorMessage name="amount" component="div" />
          </div>
          <div className={styles.buttonbox}>
            <button type="submit" className={styles.button}>Mint Tokens</button>
          </div>
        </Form>
      </Formik>
  );
};

export default ConvertForm;