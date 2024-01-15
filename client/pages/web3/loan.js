import { ThirdwebProvider } from "@thirdweb-dev/react"
import { AppProvider } from '../../contexts/AppContext';
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
        <Card>
          <div style={{ maxHeight: '300px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 20px' }}>
            <Card.Img
              src="/images/MICROFINANCE.png"
              alt="logo"
              style={{ width: '100%', height: 'auto' }} // Stretch the image to fit the screen
            />
          </div>
          <Card.Body>
            <Card.Title>Microfinance</Card.Title>
            <Card.Text>
              Microfinance is a type of banking service that is provided to unemployed or low-income individuals or groups who otherwise would have no other access to financial services.
            </Card.Text>
          </Card.Body>
        </Card>

        {/* Render the LoanApplicationForm component */}
        <LoanApplicationForm />
      </AppProvider>
    </ThirdwebProvider>
  );
}

export default Loan;

