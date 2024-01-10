import React, { useState, useEffect } from 'react';
import styles from "../styles/user.module.css";
import { ethers } from "ethers";
import Image from 'next/image';
import { auth } from "../db/firebase";
import { db } from "../db/firebase";
import { getDoc, doc } from "firebase/firestore";

const token_ids = [
    "0x078a711a6d52CDe57Cbd9dd0ed70f3F960781e12",
    "0x74799280A3Ee2C92f454dAd4fA57E18a96346a76",
    "0x0C7AdaF776B78739F50B284Da52b8875E3056406",
];

const token_map = new Map();
token_map.set("0x078a711a6d52CDe57Cbd9dd0ed70f3F960781e12", 
    {name: "KILMA", asset: "/images/kilma.png"});
token_map.set("0x74799280A3Ee2C92f454dAd4fA57E18a96346a76", 
    {name: "TCO2", asset: "/images/tco2.png"});
//token_map.set("0x1", 
//    {name: "BCT", asset: "/images/bct.png"});
token_map.set("0x0C7AdaF776B78739F50B284Da52b8875E3056406", 
   {name: "MCO2", asset: "/images/mco2.png"});

const abi = [
    "function transfer_remove (address token, uint amount) external owner_only",
    "function deposit(address token, uint amount) external payable",
    "function withdraw(address token, uint amount) external owner_only",
    "function getBalances(address token_) public view returns (uint)",
]

const UserHoldings = () => {
    const from_username = auth.currentUser.email;
    const private_key = require("../pages/web3/keys.json")["meta-mask"];
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = new ethers.Wallet(private_key, provider);
    const [loading, setLoading] = useState(false);
    const [output, setOutput] = useState([]);
    useEffect(() => {
        setLoading(true);
        setOutput([]);
        getDoc(doc(db, "users", from_username)).then((x) => {
            console.log("Pulled from firestore: ", x.data());
            return new ethers.Contract(x.data()['walletAddress'], abi, signer);
        }).then((contract) => {
            console.log("Contract established: ", contract);
            Promise.all(token_ids.map(async(x) => {
                console.log(token_map.get(x)["name"]);
                var y = await contract.getBalances(x).then(
                (b) => {console.log("contractbalance: ", b); return b;}).catch((err) => {console.log(err); 
                    return (<div>Problem loading holdings...</div>)})
                console.log("return from getbalance: ", y);
                return {symbol: token_map.get(x)["name"], displayValue : ethers.utils.formatEther(y),
                    asset : token_map.get(x)["asset"]};
            })).then((entries) => {
                    const processed = entries.map(x => (
                        <div key = {x.symbol} className={styles.holdingboxinner}>
                                <div className = {styles.entryBox}>
                                    <li className = {styles.entry}>
                                        <Image src={x.asset} 
                                            width={30} height={30} alt="image of token"></Image>
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
        })
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