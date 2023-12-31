import { ConnectWallet } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import MintForm from "../components/MintForm";
import { useAppContext } from '../contexts/AppContext';

export default function Home() {
  const { state } = useAppContext();

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.connect}>
            <ConnectWallet
              dropdownPosition={{
                side: "bottom",
                align: "center",
              }}
            />
          </div>
        </div>

        {state.walletConnected && (
          <div className={styles.content}>
            <h1>Welcome!</h1>
            <p>Your wallet address: {state.walletAddress}</p>

            <MintForm />
          </div>
        )}

        {
          state.walletConnected && (<div className={styles.content}>
            <p>Your wallet address: {state.walletAddress}</p>
            <TransferForm />
          </div>
          )
        }

      </div>
    </main>
  );
}
