import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Step, StepLabel, Stepper } from "@mui/material";
import Link from "@mui/material/Link";

import Copyright from "../components/auth/Copyright";
import { FIELD_NAMES, LOCATION_NAMES } from "../components/register/types";
import BasicInfoStep from "../components/register/BasicInfoStep";
import { AppRoutes } from "../utils/constants/routes";
import SubmitStep from "../components/register/SubmitStep";
import EducationStep from "../components/register/EducationStep";
import WorkHistoryStep from "../components/register/WorkHistoryStep";
import { GrayColors, White } from "../utils/constants/colorPallete";
import ResumeStep from "../components/register/ResumeStep";

const steps = ["Basic Info", "Resume", "Education", "Work History", "Submit"];

const RegisterPage = () => {
  const [activeStep, setActiveStep] = useState(0);

  const [user, setUser] = useState<
    Record<FIELD_NAMES | LOCATION_NAMES, string>
  >({
    firstName: "",
    lastName: "",
    email: "",
    resume: "",
    country: "",
    state: "",
    city: "",
    password: "",
    retypedPassword: "",
  });
  const [location, setLocation] = useState<Record<LOCATION_NAMES, number>>({
    country: 0,
    state: 0,
    city: 0,
  });

  const [dirty, setDirty] = useState<
    Record<FIELD_NAMES | LOCATION_NAMES, boolean>
  >({
    firstName: false,
    lastName: false,
    email: false,
    resume: false,
    country: false,
    state: false,
    city: false,
    password: false,
    retypedPassword: false,
  });

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  return (
    <Container component={"main"} sx={{ display: "flex" }}>
      <CssBaseline />
      <Box
        sx={{
          width: "100%",
          marginTop: 8,
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: "8px",
          backgroundColor: White.PureWhite,
          border: `1px solid ${GrayColors.Gray2}`,
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>

        <Box
          sx={{
            width: "100%",
            display: "flex",
            gap: "30px",
            alignItems: "center",
          }}
        >
          <Stepper
            activeStep={activeStep}
            orientation={"vertical"}
            sx={{ flex: 1 }}
          >
            {steps.map((step, index) => {
              return (
                <Step key={index}>
                  <StepLabel>{step}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === 0 && (
            <BasicInfoStep
              user={user}
              location={location}
              dirty={dirty}
              setUser={setUser}
              setLocation={setLocation}
              setDirty={setDirty}
              handleNext={handleNext}
            />
          )}
          {activeStep === 1 && (
            <ResumeStep
              user={user}
              dirty={dirty}
              setUser={setUser}
              setDirty={setDirty}
              handleNext={handleNext}
            />
          )}
          {activeStep === 2 && <EducationStep handleNext={handleNext} />}
          {activeStep === 3 && <WorkHistoryStep handleNext={handleNext} />}
          {activeStep === 4 && <SubmitStep user={user} />}
          <div style={{ flex: 1 }} />
        </Box>

        <Box
          sx={{
            mt: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <Link href={AppRoutes.Login} variant="body2">
            Already have an account? Log in
          </Link>
          <Copyright />
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterPage;
