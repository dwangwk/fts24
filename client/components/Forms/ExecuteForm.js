import React from 'react';
import { Formik, Field, Form, ErrorMessage, useFormikContext } from 'formik';
import * as Yup from 'yup';
import { useAppContext } from '../../contexts/AppContext';
import styles from "../../styles/Formik.module.css";
import { updateTransaction } from '../../scripts/Transactions';
import { auth, db } from '../../db/firebase';
import { ethers } from 'ethers';
import { useState, useEffect } from 'react';
import { getDoc, doc } from "firebase/firestore";
import { GetDeductible_EU, GetDeductible_SG } from '../../scripts/GetDeductible';
import { updateExecutionAmount } from '../../scripts/ExecutionData';


const validationSchema = Yup.object().shape({
  amount: Yup.number().min(0, 'Amount must be greater than 0').required('Amount is required'),
  token: Yup.string().required()
});

const abi = [
  "function transfer_remove (address token, uint256 amount) external",
  "function deposit(address token, uint256 amount) external payable",
  "function withdraw(address token, uint256 amount) external",
  "function getBalances(address token_) public view returns (uint)",
  "function withdraw_update(address token, uint256 amount) external payable"
];

const ExecuteForm = () => {
  const { state, dispatch } = useAppContext();

  const [currentSaving, setCurrentSaving] = useState(0);
  const [euSaving, seteuSaving] = useState(0);
  const [carbonSaving, setcarbonSaving] = useState(0);

  const handle_execute = async(v) => {
    console.log("executing");
    const temp = v.amount;
    const amount = ethers.utils.parseEther(`${v.amount}`);
    const token = v.token;
    const to_username = auth.currentUser.email;
    const to_wallet = await getDoc(doc(db, "users", to_username));
    const to = to_wallet.data()["walletAddress"];
    const private_key = require("../../pages/web3/keys.json")["meta-mask"];
    updateExecutionAmount(temp);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = new ethers.Wallet(private_key, provider);
    const contract = new ethers.Contract(to, abi, signer);
    const tx = await contract.withdraw_update(token, amount);
    console.log("contract established, ", tx);
    const rc = await tx.wait();
    console.log("rc: ", rc);
    const tx_details = {"user" : auth.currentUser.displayName, "rc" : rc};
    console.log("rc recieved, initiating logging.")
    updateTransaction(tx_details);
  }

  const handle_change = (event) => {
    if (event.target.name == "amount") {
      var updated = event.target.value;
      try {
        updated = parseFloat(updated);
        console.log("float version: ", updated);
        if (updated >= 0) {
          const saved = GetDeductible_SG(updated);
          const euSaved = GetDeductible_EU(updated)
          console.log(saved);
          setCurrentSaving(Math.round(saved * 100) / 100);
          seteuSaving(euSaved.toFixed(2));
          setcarbonSaving(updated.toFixed(2));
        }
      } catch (e) {console.log(e);}
    }
  }
  return (
    <div>
       <Formik
        initialValues={state.transferFormData}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          console.log("execute submit recorded.")
          handle_execute(values);
          resetForm();
          dispatch({ type: 'RESET_FORM_DATA' });
        }}
      >
        {({ ...props }) => { return(
        <Form onChange={handle_change}>
          <div className={styles.entrybox}>
            <label htmlFor="amount"  className={styles.label}>Amount:</label>
            <Field type="number" id="amount" name="amount" className={styles.option}/>
            <ErrorMessage name="amount" component="div" />
          </div>
          <div className={styles.entrybox}>
                    <label htmlFor="token"  className={styles.label}>Token:</label>
                    <Field as="select" type="text" name="token" id="token" className={styles.option}>
                        <option value="0x74799280A3Ee2C92f454dAd4fA57E18a96346a76" className={styles.option}>TCO2</option>
                        <option value="0x078a711a6d52CDe57Cbd9dd0ed70f3F960781e12" className={styles.option}>KILMA</option>
                        <option value="0x0C7AdaF776B78739F50B284Da52b8875E3056406" className={styles.option}>MCO2</option>
                    </Field>
                    <ErrorMessage name="token" component="div" />
            </div>
          <div className={styles.buttonboxbuy}>
            <button type="submit" className={styles.button}>Execute Token</button>
          </div>
        </Form>);}}
      </Formik>
      <div className={styles.savingbox}>
        <div className={styles.savinglabel}>Singapore Tax Offset: {currentSaving} SGD</div>
        <div className={styles.savinglabel}>EU Penalty Avoided: {euSaving} €</div>
        <div className={styles.savinglabel}>CO2 Offset: {carbonSaving} Tonnes</div>
      </div>
    </div>
  );
};

export default ExecuteForm;