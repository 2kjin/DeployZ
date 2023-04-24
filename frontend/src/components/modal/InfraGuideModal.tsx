import styled from "styled-components";
import { theme } from "@/styles/theme"
import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const steps = [
  {
    label: '1. EC2 인스턴스 생성 및 설정',
    description: `AWS에서 적절한 AMI와 인스턴스 유형을 선택하여 EC2 인스턴스를 생성하고, 보안 그룹 및 SSH 키를 설정합니다.`,
  },
  {
    label: 'Create an ad group',
    description:
      'An ad group contains one or more ads which target a shared set of keywords.',
  },
  {
    label: 'Create an ad',
    description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
  },
];

export default function InfraGuideModal() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  return (
    <>
    <ModalContainer>
        {/* <div className="left-container">

        </div>
        <div className="mid-container">
          
        </div>
        <div className="right-container">
          
        </div> */}
        <Box sx={{ maxWidth: 400 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                index === 2 ? (
                  <Typography variant="caption">Last step</Typography>
                ) : null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>
              <Typography>{step.description}</Typography>
              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === steps.length - 1 ? 'Finish' : 'Continue'}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
    </Box>
    </ModalContainer>
    </>
  )
}

const ModalContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70vw;
  height: 85vh;
  border: none;
  box-shadow: 0 2px 4px, 0px 1px 2px inset;
  border-radius: 4vh;
  padding : auto;
  display: flex;
  align-items: center;
  justify-content : center;
  background : ${theme.colors.container};
  color : ${theme.colors.primary};
  overflow : auto;
  .left-container {
    height: 100%;
    width: 49.5%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .mid-container {
    height: 100%;
    width: 1%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-left : thick solid ${theme.colors.primary};

  }
  .right-container {
    height: 100%;
    width: 49.5%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`