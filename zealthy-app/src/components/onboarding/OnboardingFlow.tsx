import React, { useState, useEffect } from "react";
import { Box, Button, Paper, Stepper, Step, StepLabel } from "@mui/material";
import { ComponentType, UserData } from "../../types";
import AccountForm from "../forms/AccountForm";
import ComponentRenderer from "../forms/ComponentRenderer";
import { api } from "../../api";

interface OnboardingFlowProps {
  config: {
    page2Components: ComponentType[];
    page3Components: ComponentType[];
  };
}

const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ config }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState<UserData>({
    email: "",
    password: ""
  });

  useEffect(() => {
    const checkProgress = async () => {
      const storedEmail = localStorage.getItem("email");

      if (storedEmail) {
        try {
          const userData = await api.getUser(storedEmail);
          if (userData) {
            setActiveStep(userData.onboarding_step || 0);
            setFormData({
              email: userData.email,
              password: userData.password,
              about: userData?.about,
              address: userData?.address,
              birthdate: userData?.birthdate
            });
          }
        } catch (err) {
          console.error("Failed to fetch user data:", err);
          localStorage.removeItem("email");
        }
      }
    };

    checkProgress();
  }, []);

  const steps = ["Account Setup", "Personal Information", "Additional Details"];

  const handleSubmit = async () => {
    if (activeStep === 0) {
      try {
        await api.createUser({ ...formData, onboarding_step: activeStep + 1 });
        localStorage.setItem("email", formData.email);
      } catch (error) {
        console.error("Failed to submit form:", error);
      }
    } else {
      try {
        await api.updateUser(formData.email, {
          ...formData,
          onboarding_step: activeStep + 1
        });
      } catch (error) {
        console.error("Failed to submit form:", error);
      }
    }
    setActiveStep(prev => prev + 1);
    setFormData({ ...formData, onboarding_step: activeStep + 1 });
  };

  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return (
          <AccountForm
            data={formData}
            onChange={data => setFormData({ ...formData, ...data })}
          />
        );
      case 1:
        return (
          <ComponentRenderer
            components={config.page2Components}
            data={formData}
            onChange={data => setFormData({ ...formData, ...data })}
          />
        );
      case 2:
        return (
          <ComponentRenderer
            components={config.page3Components}
            data={formData}
            onChange={data => setFormData({ ...formData, ...data })}
          />
        );
      default:
        return <div>Registration Complete!</div>;
    }
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 600, mx: "auto", mt: 4 }}>
      <Stepper activeStep={activeStep}>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box sx={{ mt: 4 }}>
        {renderStep()}

        <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
          {activeStep > 0 && (
            <Button onClick={() => setActiveStep(prev => prev - 1)}>
              Back
            </Button>
          )}
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={activeStep === 3}
          >
            {activeStep === 2 ? "Submit" : "Next"}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default OnboardingFlow;
