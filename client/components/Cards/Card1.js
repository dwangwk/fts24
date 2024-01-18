import React, { useEffect, useState } from "react";
import styles from "../../styles/user.module.css";
import UserHoldings from "../UserHoldings";
import UserDataForm from "../Forms/UserDataForm";
import { pullExecutionAmount } from "../../scripts/ExecutionData";

const Card1 = ({ displayName, email }) => {
    const [executed, setExecuted] = useState(0);
    useEffect(() => {
        console.log("running effect");
        const ret = pullExecutionAmount().then(
            (x) => {
                console.log("ret: ", x);
                setExecuted(x);
            }
        );
    })
    return (
        <div>
        <div className={styles.card1main}>
                <div className={styles.infobox}>
                    <h1 className={styles.title}>My Profile</h1>
                    <p><b>Username :</b> {displayName}</p>
                    <p><b>Email :</b> {email}</p>
                    <p><b>Credits Executed:</b>{executed}</p>
                    <UserDataForm></UserDataForm>
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
