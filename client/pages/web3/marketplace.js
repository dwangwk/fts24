import { ThirdwebProvider } from "@thirdweb-dev/react"
import { AppProvider } from '../../contexts/AppContext';
import Navbar from "../../components/navigation/Navbar";
import MarketplaceNav from "../../components/navigation/MarketplaceNav";
import styles from "../../styles/user.module.css";
import Card1 from "../../components/Cards/Marketplace/Card1";
import Card2 from "../../components/Cards/Marketplace/Card2";
import Card3 from "../../components/Cards/Marketplace/Card3";
import { getAuth } from "firebase/auth";
import { useState } from "react";


const activeChain = 'ethereum';
const clientid = require("./keys.json")["client-id"];

const MarketPlace = () => {
    const user = getAuth().currentUser;
    const [activeCard, setActiveCard] = useState("card1"); // Default active card

    return (
        <ThirdwebProvider activeChain={activeChain} clientId={clientid}>
            <AppProvider>
                <Navbar></Navbar>
                <div className={styles.fullpage}>
                    <div className={styles.navbar}>
                        <MarketplaceNav setActiveCard={setActiveCard} />
                    </div>
                    <div className={styles.content}>
                        {activeCard === "card1" && <Card1/>}
                        {activeCard === "card2" && <Card2/>}
                        {activeCard === "card3" && <Card3/>}
                    </div>
                </div>
            </AppProvider>
        </ThirdwebProvider>
    )
}

export default MarketPlace;