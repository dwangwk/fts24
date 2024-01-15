import React from 'react';

const ProgressBar = ({ currentStage, totalStages }) => {
  const progressPercentage = (currentStage / totalStages) * 100;

  return (
    <div>
      <div className="progress-bar-container">
        <div
          className="progress-bar"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      <div className="progress-label">{`Stage ${currentStage} of ${totalStages}`}</div>
    </div>
  );
};

export default ProgressBar;
