import React from 'react';
import styles from "../styles/MarketplaceEntry.module.css"
import Image from 'next/image';
import BuyTokenForm from "./Forms/BuyTokenForm";
import axios from 'axios';
import { useState, useEffect } from 'react';
import PriceChart from './PriceChart';

const CrowdfundingEntry = ({data}) => {
    const [priceData, setPriceData] = useState([]);
    const [price, setPrice] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = data.token;
    const desc = data.desc;
    const imageloc = data.img;
    const targetAmount = data.targetAmount; // New data for target funding amount
    const fundingProgress = data.fundingProgress; // New data for funding progress
    const endDate = data.endDate; // New data for campaign end date
    const progressPercentage = (fundingProgress / targetAmount) * 100; // New data for progress percentage


    return (
        <div className={styles.main3}>
            <div>
                <Image src={imageloc} height={240} width={400} alt={"image of token"} />
            </div>
            <div className={styles.textbox2}>
                <h4>{token}</h4>
                <div className={styles.text}>{desc}</div>
            </div>
            <div className={styles.textbox}>
                <div className={styles.text}>Campaign End Date: {endDate}</div>
                <div className={styles.text}>Funding Progress: ${fundingProgress}</div>
                <div className={styles.text}>Target Amount: ${targetAmount}</div>
            </div>
            <div className={styles.progressBar}>
                <div
                className={styles.progressFill}
                style={{ width: `${progressPercentage}%` }}
                ></div>
                <h2>  </h2>
            </div>
            <h2>  </h2>
            <div className={styles.buyTokenForm}>
                <BuyTokenForm token_name={token} />
                <h2> </h2>
                <div className='main' style={{ marginLeft: '20px' }}>
                    <div className={styles.text}>Total Amount (USD): ${targetAmount}</div>
                    <h2> </h2>

                    <h2> </h2>
                </div>
            </div>
        </div>
    );
    
}

export default CrowdfundingEntry;