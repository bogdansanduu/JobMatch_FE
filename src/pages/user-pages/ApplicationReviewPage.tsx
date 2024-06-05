import React from "react";
import { Box } from "@mui/material";

import JobUserDetailsSection from "../../components/job/JobUserDetailsSection";
import ApplicationStatusSection from "../../components/application/ApplicationStatusSection";

const ApplicationReviewPage = () => {
  return (
    <Box sx={{ display: "flex", margin: "12px", gap: "12px" }}>
      <ApplicationStatusSection />
      <JobUserDetailsSection />
    </Box>
  );
};

export default ApplicationReviewPage;
