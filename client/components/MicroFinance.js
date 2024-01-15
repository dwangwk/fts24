import React, { useState } from 'react';
import ProgressBar from './ProgressBar'; // You can create a separate ProgressBar component

const MicroFinance = () => {
  const [loanStage, setLoanStage] = useState(1); // Initialize with stage 1
  const [files, setFiles] = useState([]); // Store uploaded files

  const handleFileUpload = (event) => {
    const uploadedFiles = event.target.files;
    setFiles(uploadedFiles);
  };

  const handleNextStage = () => {
    if (loanStage < 5) {
      setLoanStage(loanStage + 1); // Move to the next stage
    }
  };

  return (
    <div>
      <h2>Loan Stage: {loanStage}</h2>
      <ProgressBar currentStage={loanStage} totalStages={5} /> {/* Use a ProgressBar component */}
      <div>
        {/* File Upload */}
        <input type="file" multiple onChange={handleFileUpload} />
        <button onClick={handleNextStage}>Next Stage</button>
      </div>
      <div>
        {/* Display uploaded files */}
        {files.length > 0 && (
          <div>
            <h3>Uploaded Files:</h3>
            <ul>
              {Array.from(files).map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default MicroFinance;
