import React, { useState, useEffect } from 'react';
import { useWallet } from "@thirdweb-dev/react";
import styles from "../styles/user.module.css";

// Token IDs only work for Sepolia Testnet.
const token_ids = [
    "0x779877A7B0D9E8603169DdbD7836e478b4624789", // LINK
    "0x36160274B0ED3673E67F2CA5923560a7a0c523aa" // USDT
];


const UserHoldings = () => {
    const wallet = useWallet();
    if (!wallet) {return(<div>No wallet connected</div>);}
    const [loading, setLoading] = useState(false);
    const [output, setOutput] = useState([]);
    useEffect(() => {
        setLoading(true);
        setOutput([]);
    
        const getBalancePromises = token_ids.map(async (token) => {
            try {
                const balance = await wallet.getBalance(token);
                return balance;
            } catch (err) {
                console.log(err);
                return { error: "Problem loading holdings..." };
            }
        });
    
        Promise.all(getBalancePromises)
            .then((entries) => {
                const processed = entries.map((x, index) => (
                    <div key={index}>
                        <div className={styles.entryBox}>
                            <li className={styles.entry}>
                                {x.name}
                            </li>
                            <li className={styles.entry}>
                                {x.symbol}
                            </li>
                            <li className={styles.entry}>
                                {x.displayValue}
                            </li>
                        </div>
                    </div>
                ));
                setOutput(processed);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
                console.log(err);
            });
    }, [wallet]); // Added wallet to the dependency array
    
    return (
        <div>
            <div>
                {loading == true ? (<div>Loading...</div>) : (
                <div>
                    {output}
                </div>)} 
            </div>
        </div>
    );
}

export default UserHoldings;