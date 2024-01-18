import React from "react";
import styles from "../../../styles/user.module.css";
import CrowdfundingIPEntry from "../../CrowdfundingIPEntry";

const mekong = {token:"Mekong Delta Mangrove",
desc: "The Mekong Delta Mangrove project is a reforestation project in Cambodia. It is a 5-year project that aims to restore 1,000 hectares of mangrove forests in the Sihanoukville province.",
img:"/images/mekong.jpg",
stageAt: 3,
startDate: "2021-01-01",
endDate: "2025-12-31"}

const rayong = {
    token:"Rayong Mangrove Reforestation",
    desc: "The Rayong Mangrove Reforestation project is a reforestation project in Thailand. It is a 5-year project that aims to restore 1,000 hectares of mangrove forests in the Rayong province.",
    img:"/images/rayong.jpeg",
    stageAt: 4,
    startDate: "2021-01-01",
    endDate: "2024-12-31"
}


const Card2 = () => {
  return (
    <div>
       <div className={styles.card1main}>
            <div className={styles.fullpage}>
                <div className={styles.crowdfunding}>
                <h1 className={styles.title}>Crowdfunding Carbon Projects</h1>
                        <div className={styles.crowdfunding_inner}>
                        <CrowdfundingIPEntry data={mekong}></CrowdfundingIPEntry>
                        <CrowdfundingIPEntry data={rayong}></CrowdfundingIPEntry>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Card2;