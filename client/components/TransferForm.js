import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAddress } from "@thirdweb-dev/react";
import { useAppContext } from '../contexts/AppContext';

const validationSchema = Yup.object().shape({
  recipientAddress: Yup.string().required('Recipient address is required'),
  amount: Yup.number().min(1, 'Amount must be greater than 0').required('Amount is required'),
  src_token: Yup.string().required("Source Token required."),
  destchain: Yup.string().required("Destination chain required.") 
});

const TransferForm = ({transferTokens})=> {
    const {state, dispatch} = useAppContext();
    const connectedAddress = useAddress();
    if (!connectedAddress) {return(<div>No wallet connected</div>);}
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

                <div>
                    <label htmlFor="amount">Source Token:</label>
                    <Field type="text" id="src_token" name="src_token" />
                    <ErrorMessage name="src_token" component="div" />
                </div>
            
                <div>
                    <label htmlFor="amount">Destination Network:</label>
                    <Field as="select" type="text" name="destchain" id="destchain">
                        <option value="16015286601757825753">Ethereum Sepolia</option>
                        <option value="13264668187771770619">BNB Chain</option>
                        <option value="5790810961207155433">Base Goerli</option>
                    </Field>
                    <ErrorMessage name="destchain" component="div" />
                </div>
                <button type="submit">Transfer Tokens</button>
            </Form>
        </Formik>
    )
}

export default TransferForm