import Link from "next/link";
import styles from "../styles/Home.module.css";

const Home = () => {
  return (
        <main className={styles.main}>
            <div className={styles.logobox}>

            </div>
            <div className={styles.loginbox}>
              <Link href="/web3/mint" style={{textDecoration: 'none', color : '#325f50'}}>
                <p className={styles.text}>Login</p>
              </Link>
            </div>
        </main>);
}

export default Home;