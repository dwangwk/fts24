import React from "react";
import Link from "next/link";
import styles from "../../styles/Navbar.module.css";

const Navbar = () => {
  return (
      <nav className={styles.bar}>
              <li className={styles.entry}>
                <Link href="/web3/user" style={{textDecoration: 'none', color : 'white'}}>
                  <p className={styles.link}>My Profile</p>
                </Link>
              </li>
              <li className={styles.entry}>
                  <Link href="/web3/transfer" style={{textDecoration: 'none', color : 'white'}}>
                    <p className={styles.link}>Transfer Credits</p>
                  </Link>
              </li>
              <li className={styles.entry}>
                  <Link href="/web3/convert" style={{textDecoration: 'none', color : 'white'}}>
                    <p className={styles.link}>Convert Credits</p>
                  </Link>
              </li>
              <li className={styles.entry}>
                  <Link href="/data" style={{textDecoration: 'none', color : 'white'}}>
                    <p className={styles.link}>Global Transactions</p>
                  </Link>
              </li>
        </nav>
  );
};

export default Navbar;