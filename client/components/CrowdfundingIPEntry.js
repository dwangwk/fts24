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
    const targetAmount = 5; // New data for target funding amount
    const stageAt = data.stageAt; // New data for funding progress
    const endDate = data.endDate; // New data for campaign end date
    const progressPercentage = (stageAt / targetAmount) * 100; // New data for progress percentage

    const milestones = [
        {
          title: "Project Initiation and Planning",
          milestone: "Completion of the project initiation and planning phase.",
          description: "This phase includes project feasibility studies, site assessment, and the development of a detailed project plan, including carbon reduction targets and strategies.",
          fundsUse: "Initial funds to cover project planning costs, feasibility studies, and project design."
        },
        {
          title: "Equipment and Infrastructure Setup",
          milestone: "Procurement and installation of essential equipment and infrastructure.",
          description: "This stage involves acquiring and installing the necessary technology and infrastructure required for carbon reduction, such as renewable energy systems, energy-efficient equipment, or carbon capture technologies.",
          fundsUse: "Disbursement for purchasing and installing equipment."
        },
        {
          title: "Project Implementation",
          milestone: "Successful implementation of the carbon reduction measures.",
          description: "The project begins the process of reducing carbon emissions, which may include switching to clean energy sources, optimizing energy efficiency, or implementing carbon sequestration practices.",
          fundsUse: "Funds allocated for the actual implementation of carbon reduction measures."
        },
        {
          title: "Data Monitoring and Validation",
          milestone: "Regular data collection, monitoring, and validation of carbon reductions.",
          description: "Continuous monitoring of the project's performance, data collection, and third-party validation to ensure that the project is achieving the anticipated carbon reduction targets.",
          fundsUse: "Disbursement for monitoring, data collection, and validation services."
        },
        {
          title: "Achievement of Carbon Reduction Targets",
          milestone: "Achievement of predetermined carbon reduction targets.",
          description: "The project demonstrates successful reduction in carbon emissions as per the project plan and targets.",
          fundsUse: "Final disbursement upon meeting or exceeding the agreed-upon carbon reduction goals. This milestone confirms the project's success."
        }
      ];

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
                <div className={styles.text}>Estimated Completion Date: {endDate}</div>
                <div className={styles.text}>Stage: {stageAt} {milestones[stageAt]["title"]}</div>
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