import { ConnectWallet } from "@thirdweb-dev/react";
import styles from "../../styles/Forms.module.css";
import TransferForm from "../../components/TransferForm";
import { ThirdwebProvider } from '@thirdweb-dev/react';
import { AppProvider } from '../../contexts/AppContext';
import Navbar from "../../components/navigation/Navbar";
import transferToken from "../../scripts/transferTokens";

const activeChain = 'ethereum';
const clientid = require("./keys.json")["client-id"];

const Mint = () => {
  return (
    <ThirdwebProvider activeChain={activeChain} clientId={clientid}>
    <AppProvider>
			<Navbar></Navbar>
        <main className={styles.main}>
          <div className={styles.container}>
                <div className={styles.title}>
                  Transfer Tokens
                </div>
              <div className={styles.container_lower}>
              <TransferForm transferTokens={(tFormData) => {
                 console.log('Transferring tokens with:', tFormData);
                 //transferToken(tFormData).catch((err) => console.log(err));
              }} />
              </div>
            </div>
        </main>
			</AppProvider>
      </ThirdwebProvider>);
}

export default Mint;