// Create a components/MintForm.js file
import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAppContext } from '../contexts/AppContext';
import styles from "../styles/Formik.module.css";
import BuyTokensCrossChain from "../scripts/BuyTokensCrossChain";
import BuyTokensNative from "../scripts/BuyTokensNative";


const validationSchema = Yup.object().shape({
  amount: Yup.number().min(0, 'Amount must be greater than 0').required('Amount is required'),
});

const BuyTokenForm = ({ token_name }) => {
  const { state, dispatch } = useAppContext();
  const selector = (d) => {
    console.log("token_name", token_name);
    if (token_name == "TCO2") {console.log("submit: ", d);
      BuyTokensCrossChain({token : token_name, data: d});} else {console.log("submit: ", d); BuyTokensNative({token: token_name, data: d});}
  }
  return (
      <Formik
        initialValues={state.mintFormData}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          selector(values);
          resetForm();
          dispatch({ type: 'RESET_FORM_DATA' });
        }}
      >
        <Form>
          <div className={styles.entrybox}>
            <label htmlFor="amount"  className={styles.label}>Amount:</label>
            <Field type="number" id="amount" name="amount" className={styles.option}/>
            <ErrorMessage name="amount" component="div" />
          </div>
          <div className={styles.buttonboxbuy}>
            <button type="submit" className={styles.button}>Buy Tokens</button>
          </div>
        </Form>
      </Formik>
  );
};

export default BuyTokenForm;
