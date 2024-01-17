import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAppContext } from '../../contexts/AppContext';
import styles from "../../styles/Formik.module.css";

const validationSchema = Yup.object().shape({
  cert: Yup.string().required('Cert is required'),
  amount: Yup.number().min(0, 'Amount must be greater than 0').required('Amount is required'),
});

const ConvertForm = ({ onTransfer }) => {
  const { state, dispatch } = useAppContext();
  return (
      <Formik
        initialValues={state.transferFormData}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          console.log("submit convert.");
          onTransfer(values);
          resetForm();
          dispatch({ type: 'RESET_FORM_DATA' });
        }}
      >
        <Form>
          <div className={styles.entrybox}>
              <label htmlFor="cert"  className={styles.label}>Certificate:</label>
                <Field as="select" type="text" name="cert" id="cert" className={styles.option}>
                      <option value="GOLD STANDARD" className={styles.option}>GOLD STANDARD</option>
                      <option value="VERIFIED CARBON STANDARD" className={styles.option}>VERIFIED CARBON STANDARD</option>
                      <option value="AMERICAN CARBON STANDARD" className={styles.option}>AMERICAN CARBON STANDARD</option>
                </Field>
              <ErrorMessage name="cert" component="div" />
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
              onChange={(event) => console.log(event)}
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
            <button type="submit" className={styles.button}>Convert Tokens</button>
          </div>
        </Form>
      </Formik> 
  );
};

export default ConvertForm;
