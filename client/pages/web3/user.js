import { ThirdwebProvider } from "@thirdweb-dev/react"
import { AppProvider } from '../../contexts/AppContext';
import Navbar from "../../components/navigation/Navbar";
import styles from "../../styles/user.module.css";
import UserHoldings from "../../components/UserHoldings";
import { getAuth } from "firebase/auth";
import MicroFinance from "../../components/MicroFinance";
import ExecuteForm from '../../components/Forms/ExecuteForm';
import Card1 from "../../components/Cards/Card1"; // Import your card components
import Card2 from "../../components/Cards/Card2";
import Card3 from "../../components/Cards/Card3";
import UserProfileNav from "../../components/navigation/UserProfileNav";
import { useState } from "react";

const activeChain = 'ethereum';
const clientid = require("./keys.json")["client-id"];

const UserProfile = () => {
    const user = getAuth().currentUser;
    const [activeCard, setActiveCard] = useState("card1"); // Default active card

    return (
        <ThirdwebProvider activeChain={activeChain} clientId={clientid}>
            <AppProvider>
                <Navbar></Navbar>
                <div className={styles.fullpage}>
                <div className={styles.navbar}>
                    <UserProfileNav setActiveCard={setActiveCard} />
                </div>
                <div className={styles.content}>
                    {activeCard === "card1" && <Card1 displayName={user.displayName} email={user.email} />}
                    {activeCard === "card2" && <Card2 />}
                    {activeCard === "card3" && <Card3 />}
                </div>
                   
                </div>
                    
            </AppProvider>
        </ThirdwebProvider>
    )
}

export default UserProfile;