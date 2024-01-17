import React from 'react';
import styles from "../styles/Formik.module.css";
import PullData from '../scripts/PullData';

const UserDataButton = () => {
    return (
    <div className={styles.buttonbox}>
        <button type="pulldata" onClick={PullData} className={styles.button}>Pull My Transaction Data</button>
      </div>
      );
}

export default UserDataButton;