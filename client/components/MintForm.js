// Create a components/MintForm.js file
import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from "../styles/Home.module.css";
import { useAppContext } from '../contexts/AppContext';
import { useSigner } from '@thirdweb-dev/react';

const validationSchema = Yup.object().shape({
  recipientAddress: Yup.string().required('Recipient address is required'),
  amount: Yup.number().min(1, 'Amount must be greater than 0').required('Amount is required'),
});

const MintForm = ({ onMint }) => {
  const { state, dispatch } = useAppContext();
  const signer = useSigner();
    if (!signer) {return(<div>No wallet connected</div>);}
  return (
    <div>
      <div className={styles.content}>
            <h1>Mint Credits</h1>
      </div>
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
          <div>
            <label htmlFor="recipientAddress">Recipient Address:</label>
            <Field type="text" id="recipientAddress" name="recipientAddress" />
            <ErrorMessage name="recipientAddress" component="div" />
          </div>

          <div>
            <label htmlFor="amount">Amount:</label>
            <Field type="number" id="amount" name="amount" />
            <ErrorMessage name="amount" component="div" />
          </div>

          <button type="submit">Mint Tokens</button>
        </Form>
      </Formik>
    </div>
  );
};

export default MintForm;
