// Create a components/MintForm.js file
import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAppContext } from '../contexts/AppContext';
import { useSigner } from '@thirdweb-dev/react';
import styles from "../styles/Formik.module.css";

const validationSchema = Yup.object().shape({
  recipientAddress: Yup.string().required('Recipient address is required'),
  amount: Yup.number().min(1, 'Amount must be greater than 0').required('Amount is required'),
});

const MintForm = ({ onMint }) => {
  const { state, dispatch } = useAppContext();
  const signer = useSigner();
    if (!signer) {return(<div>No wallet connected</div>);}
  return (
      <Formik
        initialValues={state.mintFormData}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          onMint({values, signer});
          resetForm();
          dispatch({ type: 'RESET_FORM_DATA' });
        }}
      >
        <Form>
          <div className={styles.entrybox}>
            <label htmlFor="recipientAddress"  className={styles.label}>Recipient Address:</label>
            <Field type="text" id="recipientAddress" name="recipientAddress" className={styles.option}/>
            <ErrorMessage name="recipientAddress" component="div" />
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

export default MintForm;
