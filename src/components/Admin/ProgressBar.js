import React from "react";
import styled from "styled-components";

const ProgressContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  position: relative;
`;

const ProgressLine = styled.div`
  position: absolute;
  top: 20px;
  left: 0;
  right: 0;
  height: 2px;
  background: #e5e7eb;
  z-index: 1;
`;

const ProgressFill = styled.div`
  position: absolute;
  top: 20px;
  left: 0;
  height: 2px;
  background: rgb(184, 22, 22);
  z-index: 2;
  transition: width 0.3s ease;
  width: ${props => props.$progress}%;
`;

const StepContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  z-index: 3;
  position: relative;
`;

const StepCircle = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.875rem;
  transition: all 0.3s ease;
  background: ${props => props.$active ? "rgb(184, 22, 22)" : "#fff"};
  color: ${props => props.$active ? "#fff" : "#6b7280"};
  border: 2px solid ${props => props.$active ? "rgb(184, 22, 22)" : "#d1d5db"};
`;

const StepLabel = styled.span`
  font-size: 0.875rem;
  font-weight: ${props => props.$active ? "600" : "500"};
  color: ${props => props.$active ? "rgb(184, 22, 22)" : "#6b7280"};
  text-align: center;
  white-space: nowrap;
`;

const ProgressBar = ({ steps, currentStep }) => {
  const progressPercentage = ((currentStep + 1) / steps.length) * 100;

  return (
    <ProgressContainer>
      <ProgressLine />
      <ProgressFill $progress={progressPercentage} />
      {steps.map((step, index) => (
        <StepContainer key={index} style={{ flex: 1 }}>
          <StepCircle $active={index <= currentStep}>
            {index + 1}
          </StepCircle>
          <StepLabel $active={index <= currentStep}>
            {step.label}
          </StepLabel>
        </StepContainer>
      ))}
    </ProgressContainer>
  );
};

export default ProgressBar;

