import React, { useState, useEffect } from 'react';
import { useWallet } from "@thirdweb-dev/react";
import styles from "../styles/user.module.css";

// Token IDs only work for Sepolia Testnet.
const token_ids = [, // Current Network
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
        async function generateEntryComponents(tokens) {
            const helper = (x) => wallet.getBalance(x).then(
                (x) => {return x;}).catch((err) => {console.log(err);});
            let ret = [];
            for (let i = 0; i < tokens.length; i++) {
                ret.push(helper(tokens[i]));
            }
            return Promise.all(ret);
        };
        generateEntryComponents(token_ids).then((entries) => {
                const processed = entries.map(x => (
                    <div key = {x.symbol}>
                            <div className = {styles.entryBox}>
                            <li className = {styles.entry}>
                                {x.name}
                            </li>
                            <li className = {styles.entry}>
                                {x.symbol}
                            </li>
                            <li className = {styles.entry}>
                                {x.displayValue}
                            </li>
                        </div>
                    </div>
                    ));
                setOutput(processed);
                setLoading(false);
            }).catch((err) => {setLoading(false); console.log(err);});
    }, []);
    
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