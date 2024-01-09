import styles from "../styles/Home.module.css";
import Login from "../components/authentication/login";
import Signup from "../components/authentication/signup";
import React, { useState } from 'react';
import Image from "next/image";

const Home = () => {
  const [loggingIn, setLoggingIn] = useState(true);
  const switchSignup = () => {setLoggingIn(true);};
  const switchLogin = () => {setLoggingIn(false);};
  return (
      <main className={styles.main}>
        <div className={styles.logincontainer}>
          <div className={styles.imagecontainer}>
            <Image src="/images/logo.png" height={300} width={300} alt="logo"></Image>
          </div>
          <div>
            <h1 className={styles.title}>ecobridge</h1>
            <p className={styles.sub}>the one-stop tokenized carbon credit exchange</p> 
            {loggingIn ? (
              <div>
                <Login/>
                <button onClick={(e) => {switchLogin()}} className={styles.button}>Do not have an account? Sign up instead!</button>
              </div>) : (
                <div>
                  <Signup/>
                  <button onClick={(e) => {switchSignup()}} className={styles.button}>Already have an account? Login instead!</button>
                </div>)}
          </div>
        </div>
        <div className={styles.supportcontainer}>
            <p className={styles.subtext}>Supports</p>
            <div className={styles.tokenbox}>
              <li className={styles.opt}>
                <Image src="/images/kilma.png" width={30} height={30} alt="image of token"></Image>
              </li>
              <li className={styles.opt}>
                <Image src="/images/tco2.png" width={30} height={30} alt="image of token"></Image>
              </li>
              <li className={styles.opt}>
                <Image src="/images/mco2.png" width={30} height={30} alt="image of token"></Image>
              </li>
              <li className={styles.opt}>
                <Image src="/images/bct.png" width={30} height={30} alt="image of token"></Image>
              </li>
            </div>
        </div>
      </main>
    );
}

export default Home;