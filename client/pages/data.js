import { pullTransaction } from "../scripts/Transactions";
import { Link, BrowserRouter } from "react-router-dom";
import Navbar from "../components/navigation/Navbar";
import React, { useEffect, useState } from 'react';
import styles from "../styles/TransactionLog.module.css";
import styles_ from "../styles/TransactionMain.module.css";

const Data = () => {

    const [loading, setLoading] = useState(true);
    const [output, setOutput] = useState([]);

    useEffect(() => {
        setLoading(true);
        setOutput([]);
        pullTransaction().then((txs) => {
            console.log("txs: ", txs);
            var ret = txs.map((x) => {
                return (<div id={x.hash} className={styles.main}>
                    <Link to={x.link} target='_blank' className={styles.title}>Transaction Hash: {x.hash}</Link>
                    <div className={styles.infobox}>
                    <p className={styles.text}>Party Involved: {x.party}</p><p className={styles.time}> Time: {x.timestamp}</p>
                    </div>
                </div>)});
            setLoading(false);
            setOutput(ret);
        });
    }, []);
    return (
        <BrowserRouter>
            <div>
                <Navbar></Navbar>
                <div>
                    <h1 className={styles_.title}>Global Transactions</h1>
                    <p className={styles_.text}>
                        Click on any transaction hash to get more details about the transaction on Etherscan.
                    </p>
                    {loading == true ? (<div>Loading...</div>) : (
                    <div className={styles_.transactionbox}>
                        {output}
                    </div>)} 
                </div>
            </div>
        </BrowserRouter>
    );
}

export default Data