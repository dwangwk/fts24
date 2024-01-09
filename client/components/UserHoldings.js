import React, { useState, useEffect } from 'react';
import styles from "../styles/user.module.css";
import { ethers } from "ethers";
import Image from 'next/image';
import { auth } from "../db/firebase";
import { db } from "../db/firebase";
import { getDoc, doc } from "firebase/firestore";

const token_ids = [
    "0xCbE42d4CB0cbF089249D902B4A8b5daD264a731e", // KILMA
    "0x9D23F8EF5e50b8E336e34b7d78e05f48a70A9E4a" // TCO2
];

const token_map = new Map();
token_map.set("0xCbE42d4CB0cbF089249D902B4A8b5daD264a731e", 
    {name: "Wrapped KILMA", asset: "/images/kilma.png"});
token_map.set("0x9D23F8EF5e50b8E336e34b7d78e05f48a70A9E4a", 
    {name: "Wrapped TCO2", asset: "/images/tco2.png"});

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
                var y = await contract.getBalances(x).then(
                (x) => {return x;}).catch((err) => {console.log(err); 
                    return (<div>Problem loading holdings...</div>)})
                return {symbol: token_map.get(x)["name"], displayValue : ethers.utils.formatEther(y),
                    asset : token_map.get(x)["asset"]};
            })).then((entries) => {
                    const processed = entries.map(x => (
                        <div key = {x.symbol}>
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