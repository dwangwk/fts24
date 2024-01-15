import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAppContext } from '../contexts/AppContext';
import styles from "../styles/Formik.module.css";

const validationSchema = Yup.object().shape({
  recipientAddress: Yup.string().required('Recipient address is required'),
  amount: Yup.number().min(0, 'Amount must be greater than 0').required('Amount is required'),
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
                      <option value="GOLD STANDARD" className={styles.option}>GOLD STANDARD</option>
                      <option value="VERIFIED CARBON STANDARD" className={styles.option}>VERIFIED CARBON STANDARD</option>
                      <option value="AMERICAN CARBON STANDARD" className={styles.option}>AMERICAN CARBON STANDARD</option>
                </Field>
              <ErrorMessage name="token" component="div" />
          </div>
          <div className={styles.entrybox}>
            <label htmlFor="pdf" className={styles.label}>
              Attach PDF:
            </label>
            <input
              type="file"
              id="pdf"
              name="pdf"
              accept=".pdf"
              onChange={(event) => setFieldValue('pdf', event.currentTarget.files[0])}
              className={styles.option}
            />
            <ErrorMessage name="pdf" component="div" />
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
