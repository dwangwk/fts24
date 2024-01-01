import Link from "next/link";
import styles from "../styles/Home.module.css";

const Home = () => {
  return (
        <main className={styles.main}>
          <div className={styles.container}>
            <div className={styles.header}>
              <div className={styles.connect}>
              </div>
            </div>
            <div className={styles.content}>
              <Link href="/web3/mint">
                <p>Mint Carbon Credits</p>
              </Link>
            </div>
            <div>
              <Link href="/web3/transfer">
                <p>Transfer Carbon Credits</p>
              </Link>
            </div>
          </div>
        </main>);
}

export default Home;