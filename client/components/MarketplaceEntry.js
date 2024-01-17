import React from 'react';
import styles from "../styles/MarketplaceEntry.module.css"
import Image from 'next/image';
import BuyTokenForm from "./Forms/BuyTokenForm";
import axios from 'axios';
import { useState, useEffect } from 'react';
import PriceChart from './PriceChart';

const MarketplaceEntry = ({data}) => {
    const [priceData, setPriceData] = useState([]);
    const [price, setPrice] = useState(0); // [price, setPrice
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = data.token;
    const desc = data.desc;
    const imageloc = data.img;

    let token_actual_name;

    switch (token) {
        case 'TCO2':
            token_actual_name = 'toucan-protocol-base-carbon-tonne';
            break;
        case 'MCO2':
            token_actual_name = 'moss-carbon-credit';
            break;
        case 'ECO':
            token_actual_name = 'toucan-protocol-base-carbon-tonne';
            break;
        case 'KILMA':
            token_actual_name = 'klima-dao';
            break;
        default:
            token_actual_name = 'toucan-protocol-base-carbon-tonne';
    }

    useEffect(() => {
        // Fetch price data from CoinGecko API
        const fetchData = async () => {
            try {
                setLoading(true);
                const apiKey = 'CG-c2cUZPHxj1dupLohyK62mUuG'; // Replace 'YOUR_API_KEY' with your actual API key
                const response = await axios.get(
                    `https://api.coingecko.com/api/v3/coins/${token_actual_name}/market_chart`,
                    {
                        params: {
                            vs_currency: 'usd',
                            days: 91,
                        }
                    }
                );
                setPriceData(response.data["prices"]);
                const p = response.data["prices"][response.data["prices"].length - 1][1].toFixed(2);
                console.log(p);
                setPrice(p);
            } catch (error) {
                console.error('Error fetching price data:', error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [token]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className={styles.main}>
            <div>
                <Image src={imageloc} height={50} width={50} alt={"image of token"} />
            </div>
            <div className={styles.textbox}>
                <h4>{token}</h4>
                <div className={styles.text}>{desc}</div>
                {priceData && (
                    <div>
                        <PriceChart priceData={priceData} />
                    </div>
                )}
            </div>
            <div className={styles.buyTokenForm}>
                <BuyTokenForm token_name={token} />
                <h2> </h2>
                <div className='main' style={{ marginLeft: '20px' }}>
                    <div className={styles.text}>Current Price (USD): ${price}</div>
                    <h2> </h2>
                    <div className={styles.text}>ECO needed for conversion: 0 (For now)</div>
                </div>
            </div>
        </div>
    );
    
}

export default MarketplaceEntry;