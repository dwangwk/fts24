import { ConnectWallet } from "@thirdweb-dev/react";
import styles from "../../styles/Forms.module.css";
import TransferForm from "../../components/TransferForm";
import { ThirdwebProvider } from '@thirdweb-dev/react';
import { AppProvider } from '../../contexts/AppContext';

const activeChain = 'ethereum';
const clientid = require("./keys.json")["client-id"];

const Mint = () => {
  return (
    <ThirdwebProvider activeChain={activeChain} clientId={clientid}>
    <AppProvider>
        <main className={styles.main}>
          <div className={styles.container}>
            <div className={styles.container_upper}>
                <div className={styles.title}>
                  Transfer Tokens
                </div>
                <div className={styles.wallet_box}>
                <ConnectWallet
                        dropdownPosition={{
                          side: "bottom",
                          align: "center",
                        }} className={styles.wallet}
                        theme="light"
                      />
                </div>
              </div>
              <div className={styles.container_lower}>
              <TransferForm transferTokens={(tFormData) => 
                    console.log('Transferring tokens with:', tFormData)} />
              </div>
            </div>
        </main>
			</AppProvider>
      </ThirdwebProvider>);
}

export default Mint;