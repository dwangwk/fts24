import { ConnectWallet } from "@thirdweb-dev/react";
import MintForm from '../../components/MintForm';
import styles from "../../styles/Forms.module.css";
import MintTokens from "../../scripts/MintTokens"
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
                  Mint Tokens
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
                <MintForm onMint={(data) => MintTokens(data)} />
              </div>
            </div>
        </main>
			</AppProvider>
      </ThirdwebProvider>);
}

export default Mint;