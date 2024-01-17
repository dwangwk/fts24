import React from "react";
import styles from "../../styles/UserProfileNav.module.css";
import { auth } from "../../db/firebase"

const UserProfileNav = ({ setActiveCard }) => {
  const handleCardClick = (cardName) => {
    setActiveCard(cardName);
  };
  const user = auth.currentUser.displayName;

  return (
    <div className={styles.nav}>
      <h3 className={styles.msg}>Welcome {user}!</h3>
      <ul>
        <div onClick={() => handleCardClick("card1")} className={styles.local_li}>Holdings</div>
        <div onClick={() => handleCardClick("card2")} className={styles.local_li}>Execute Tokens</div>
        <div onClick={() => handleCardClick("card3")} className={styles.local_li}>Carbon Projects</div>
      </ul>
    </div>
  );
};

export default UserProfileNav;