import React from 'react';
import styles from "../styles/MarketplaceEntry.module.css"
import Image from 'next/image';
import BuyTokenForm from "./BuyTokenForm";

const MarketplaceEntry = ({data}) => {
    const token = data.token;
    const desc = data.desc;
    const imageloc = data.img;
    return (
        <div className={styles.main}>
            <div>
                <Image src={imageloc} height={50} width={50} alt={"image of token"}></Image>
            </div>
            <div className={styles.textbox}>
                <h4>{token}</h4>
                <div className={styles.text}>{desc}</div>
            </div>
            <BuyTokenForm token_name={token}></BuyTokenForm>
        </div>
    );
}

export default MarketplaceEntry;