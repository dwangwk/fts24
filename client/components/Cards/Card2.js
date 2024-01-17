import React from "react";
import styles from "../../styles/user.module.css";
import ExecuteForm from "../Forms/ExecuteForm";

const Card2 = () => {
  return (
    <div className={styles.executemain}>
            <h1 className={styles.title_}>Execute Tokens</h1>
            <div className={styles.executebox}>
                <ExecuteForm></ExecuteForm>
            </div>
    </div>
  );
};

export default Card2;
