import { ThirdwebProvider } from "@thirdweb-dev/react"
import { AppProvider } from '../../contexts/AppContext';
import styles from "../../styles/user.module.css";
import React from 'react';
import { Card } from 'react-bootstrap'; // Import Card component from your UI library
import Navbar from "../../components/navigation/Navbar";
import LoanApplicationForm from "../../components/LoanApplicationForm";

const activeChain = 'ethereum';
const clientid = require("./keys.json")["client-id"];

const Loan = () => {
  return (
    <ThirdwebProvider activeChain={activeChain} clientId={clientid}>
      <AppProvider>
        <Navbar />
        <div className={styles.fullpage}>
        <div className={styles.holdingbox}>
            <div className={styles.box}>
            <Card.Img
              src="/images/loan_page.png"
              alt="logo"
              style={{ width: '100%', height: 'auto' }} // Stretch the image to fit the screen
            />
            <h2> Microfinance Loan Form</h2>
            <LoanApplicationForm />
            </div>
        </div>
        
        </div>
      </AppProvider>
    </ThirdwebProvider>
  );
}

export default Loan;

