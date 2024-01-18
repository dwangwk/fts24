import React from "react";
import styles from "../../../styles/user.module.css";
import CrowdfundingEntry from "../../CrowdfundingEntry";

const sihanoukville = {token:"Sihanoukville Mangrove",
desc:"The Sihanoukville Mangrove project is a mangrove restoration project in Cambodia. It is a 5-year project that aims to restore 1,000 hectares of mangrove forests in the Sihanoukville province.", 
img:"/images/sihanoukville.webp",
targetAmount: 100000,
fundingProgress: 50000,
startDate: "2021-01-01",
endDate: "2025-12-31"}

const bukidnon = {token:"Bukidnon Reforestation",
desc:"The Bukidnon Reforestation project is a reforestation project in the Philippines. It is a 5-year project that aims to restore 1,000 hectares of forests in the Bukidnon province.",
img:"/images/bukidnon.jpeg",
targetAmount: 100000,
fundingProgress: 30000,
startDate: "2021-01-01",
endDate: "2025-12-31"
}

const namdong = {
    token:"Nahm Dong National Park",
    desc:"The Nahm Dong National Park project is a reforestation project in Laos. It is a 5-year project that aims to restore 1,000 hectares of forests in the Nahm Dong National Park.",
    img:"/images/nahmdong.webp",
    targetAmount: 100000,
    fundingProgress: 20000,
    startDate: "2021-01-01",
    endDate: "2025-12-31"
}


const Card3 = () => {
  return (
    <div>
       <div className={styles.card1main}>
            <div className={styles.fullpage}>
                <div className={styles.crowdfunding}>
                <h1 className={styles.title}>Crowdfunding Carbon Projects</h1>
                        <div className={styles.crowdfunding_inner}>
                        <CrowdfundingEntry data={sihanoukville}></CrowdfundingEntry>
                        <CrowdfundingEntry data={bukidnon}></CrowdfundingEntry>
                        <CrowdfundingEntry data={namdong}></CrowdfundingEntry>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Card3;