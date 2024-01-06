import styles from "../styles/Home.module.css";
import Login from "../components/authentication/login";
import Signup from "../components/authentication/signup";
import React, { useState } from 'react';

const Home = () => {
  const [loggingIn, setLoggingIn] = useState(true);
  const switchSignup = () => {setLoggingIn(true);};
  const switchLogin = () => {setLoggingIn(false);};
  return (<main className={styles.main}>
      {loggingIn ? (
        <div>
          <Login/>
          <button onClick={(e) => {switchLogin()}} className={styles.button}>Do not have an account? Sign up instead!</button>
        </div>) : (
          <div>
            <Signup/>
            <button onClick={(e) => {switchSignup()}} className={styles.button}>Already have an account? Login instead!</button>
          </div>)}
    </main>
    );
}

export default Home;