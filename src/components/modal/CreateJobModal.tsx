import React, { useEffect, useState } from "react";
import { AppModal } from "./AppModal";
import { Box, Step, StepLabel, Stepper, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import { FIELD_NAMES_JOB } from "../register/types";

import { LOCATION_NAMES } from "../../pages/user-pages/CreateCompanyAccount";
import JobBasicInfoStep from "../job/JobBasicInfoStep";
import useFormInput from "../../utils/hooks/useFormInput";
import ResponsibilitiesStep from "../job/ResponsibilitiesStep";
import MinimumQualificationsStep from "../job/MinimumQualificationsStep";
import PreferredQualificationsStep from "../job/PreferredQualificationsStep";
import SubmitJobListingStep from "../job/SubmitJobListingStep";

const steps = [
  "Basic Info",
  "Responsibilities",
  "Minimum Qualifications",
  "Preferred Qualifications",
  "Submit",
];

const initialState: Record<FIELD_NAMES_JOB | LOCATION_NAMES, string> = {
  title: "",
  description: "",
  category: "",
  country: "",
  city: "",
  state: "",
  responsibilities: "",
  minimumQualifications: "",
  preferredQualifications: "",
};
const initialDirtyState: Record<FIELD_NAMES_JOB | LOCATION_NAMES, boolean> = {
  title: false,
  description: false,
  category: false,
  country: false,
  state: false,
  city: false,
  responsibilities: false,
  minimumQualifications: false,
  preferredQualifications: false,
};

interface CreateJobModalProps {
  openJobModal: boolean;
  setOpenJobModal: (value: boolean) => void;
}

const CreateJobModal = ({
  openJobModal,
  setOpenJobModal,
}: CreateJobModalProps) => {
  const handleCloseJobModal = () => {
    setOpenJobModal(false);
  };

  const [activeStep, setActiveStep] = useState(0);

  const { formData, handleChange, setFormData, dirty, handleBlur, setDirty } =
    useFormInput<
      Record<FIELD_NAMES_JOB | LOCATION_NAMES, string>,
      Record<FIELD_NAMES_JOB | LOCATION_NAMES, boolean>
    >(initialState, initialDirtyState);
  const [latLng, setLatLng] = useState<{ lat: number; lng: number }>({
    lat: 0,
    lng: 0,
  });

  const [location, setLocation] = useState<Record<LOCATION_NAMES, number>>({
    country: 0,
    state: 0,
    city: 0,
  });

  useEffect(() => {
    if (openJobModal) {
      setActiveStep(0);
    }

    setFormData(initialState);
    setDirty(initialDirtyState);
    setLocation({
      country: 0,
      state: 0,
      city: 0,
    });
    setLatLng({
      lat: 0,
      lng: 0,
    });
  }, [openJobModal]);

  useEffect(() => {
    if (activeStep >= steps.length) {
      setOpenJobModal(false);
    }
  }, [activeStep]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  return (
    <AppModal open={openJobModal} noPadding customWidth={"600px"}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          padding: "24px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            style={{ marginRight: "8px" }}
            variant="h5"
            color={"text.primary"}
          >
            Create a new job listing
          </Typography>
          <IconButton sx={{ marginLeft: "auto" }} onClick={handleCloseJobModal}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Box
          sx={{
            width: "100%",
            display: "flex",
            gap: "15px",
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
            <JobBasicInfoStep
              jobData={formData}
              setJobData={setFormData}
              handleChange={handleChange}
              location={location}
              setLocation={setLocation}
              setLatLng={setLatLng}
              dirty={dirty}
              setDirty={setDirty}
              handleBlur={handleBlur}
              handleNext={handleNext}
            />
          )}
          {activeStep === 1 && (
            <ResponsibilitiesStep
              jobData={formData}
              handleChange={handleChange}
              dirty={dirty}
              handleBlur={handleBlur}
              handleNext={handleNext}
            />
          )}
          {activeStep === 2 && (
            <MinimumQualificationsStep
              jobData={formData}
              handleChange={handleChange}
              dirty={dirty}
              handleBlur={handleBlur}
              handleNext={handleNext}
            />
          )}
          {activeStep === 3 && (
            <PreferredQualificationsStep
              jobData={formData}
              handleChange={handleChange}
              dirty={dirty}
              handleBlur={handleBlur}
              handleNext={handleNext}
            />
          )}
          {activeStep === 4 && (
            <SubmitJobListingStep
              jobData={formData}
              latLng={latLng}
              handleNext={handleNext}
            />
          )}
        </Box>
      </Box>
    </AppModal>
  );
};

export default CreateJobModal;
