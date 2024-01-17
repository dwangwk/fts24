import React, { useState } from "react";
import styles from "../styles/MarketplaceEntry.module.css"
import Image from 'next/image';
import { Card } from 'react-bootstrap'; // Import Card component from your UI library

const MicroFinance = () => {
    const [currentStage, setCurrentStage] = useState(1);
    const [imageSrc, setImageSrc] = useState("/images/microfinance11.png"); // Initial image source
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
      

    const handleNextStage = () => {
      if (currentStage < 5) {
        setCurrentStage(currentStage + 1);
  
        // Update the image source based on the current stage
        const nextImage = `/images/microfinance1${currentStage + 1}.png`;
        setImageSrc(nextImage);
      }
    };
  
    const handlePrevStage = () => {
      if (currentStage > 1) {
        setCurrentStage(currentStage - 1);
  
        // Update the image source based on the current stage
        const prevImage = `/images/microfinance1${currentStage - 1}.png`;
        setImageSrc(prevImage);
      }
    };

    const handleFileSubmit = (milestoneIndex, file) => {
        // Simulate the file submission process
        // For real-world use, you'd send the file to a server for processing and approval
        setTimeout(() => {
          const updatedMilestones = [...milestones];
          updatedMilestones[milestoneIndex].fileSubmitted = true;
          // In a real scenario, you would set reviewApproved based on actual approval status.
          // For this example, we'll assume that it's not approved yet.
          updatedMilestones[milestoneIndex].reviewApproved = false;
          updatedMilestones[milestoneIndex].file = file;
          milestones[milestoneIndex] = updatedMilestones;
    
          // Update the state
          setCurrentStage(currentStage); // Force a re-render
        }, 2000); // Simulate a 2-second submission process
      };

      const renderFileUploadForm = (milestoneIndex) => {
        const milestone = milestones[milestoneIndex];
    
        if (!milestone.fileSubmitted) {
          return (
            <div>
              <input
                type="file"
                onChange={(e) => handleFileSubmit(milestoneIndex, e.target.files[0])}
                accept=".pdf, .doc, .docx, .jpg, .png"
              />
              <button>Submit File</button>
            </div>
          );
        } else if (!milestone.reviewApproved) {
          return <p>File submitted and under review...</p>;
        } else {
          return <p>File has been approved for this milestone.</p>;
        }
      };
  
    const progressPercentage = ((currentStage - 1) / 4) * 100; // Assuming there are 5 stages 
    const currentMilestone = milestones[currentStage - 1]; // Get the description for the current stage
 

  return (
    <div className={styles.main2}>
      <h1>Carbon Project Progress</h1>
      <Card.Img
              src={imageSrc}
              alt="picture"
              style={{ width: '100%', height: 'auto' }} // Stretch the image to fit the screen
            />
            <h2></h2>
            <div className={styles.progressBar}>
                <div
                className={styles.progressFill}
                style={{ width: `${progressPercentage}%` }}
                ></div>
                
            </div>
            <h2></h2>
    <div className={styles.buttonContainer}>
        <button onClick={handlePrevStage}>Previous Stage</button>
        <button onClick={handleNextStage}>Next Stage</button>
      </div>
      <div>
        <h2>Stage {currentStage} {currentMilestone["title"]}</h2>
        <p><h3>Milestone: </h3>{currentMilestone["milestone"]}</p>
        <p><h3>Description: </h3>{currentMilestone["description"]}</p>
        <p><h3>Funds Use: </h3>{currentMilestone["fundsUse"]}</p>
        <h2>Submit for review:</h2>
        {renderFileUploadForm(currentStage - 1)}
      </div>
    </div>
  );
}

export default MicroFinance;
