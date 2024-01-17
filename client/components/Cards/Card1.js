import React from "react";
import styles from "../../styles/user.module.css";
import UserHoldings from "../UserHoldings";
import UserDataButton from "../UserDataButton";

const Card1 = ({ displayName, email }) => {
  return (
    <div>
       <div>
            <div className={styles.infobox}>
                <h1 className={styles.title}>My Profile</h1>
                <p><b>Username :</b> {displayName}</p>
                <p><b>Email :</b> {email}</p>
                <UserDataButton></UserDataButton>
            </div>
            <div className={styles.holdingbox}>
                <div className={styles.titlebox}>
                    <h1 className={styles.title_}>My Holdings</h1>
                </div>
                <div>
                    <UserHoldings></UserHoldings>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Card1;
