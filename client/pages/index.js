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
            <h1 className={styles.title}>EcoBridge</h1>
            <p className={styles.sub}>The one-stop carbon credit exchange</p> 
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
            <p className={styles.subtext}>We support</p>
        </div>
      </main>
    );
}

export default Home;