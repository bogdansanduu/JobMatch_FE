import React from "react";
import { Box, Divider, Typography } from "@mui/material";

import {
  APPLICATION_STATUS,
  getCurrentJobApplication,
} from "../../store/slices/JobApplicationSlice";
import { useAppSelector } from "../../store/hooks";

import { GrayColors, White } from "../../utils/constants/colorPallete";
import JobApplicationStatusLabel from "./JobApplicationStatusLabel";

const ApplicationStatusSection = () => {
  const currentJobApplication = useAppSelector(getCurrentJobApplication);

  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        gap: "12px",
        flexDirection: "column",
        height: "100%",
        padding: "16px",
        borderRadius: "8px",
        backgroundColor: White.PureWhite,
        border: `1px solid ${GrayColors.Gray2}`,
      }}
    >
      <Typography
        variant="subtitle1"
        color="text.primary"
        sx={{ textAlign: "center" }}
      >
        Application Review Status
      </Typography>
      <Divider>Observations</Divider>
      <Typography variant="caption" color="text.primary">
        {currentJobApplication?.observations
          ? currentJobApplication.observations
          : "No observations"}
      </Typography>
      <Divider>Status</Divider>
      <JobApplicationStatusLabel
        status={
          currentJobApplication
            ? currentJobApplication.status
            : APPLICATION_STATUS.PENDING
        }
      />
    </Box>
  );
};

export default ApplicationStatusSection;
