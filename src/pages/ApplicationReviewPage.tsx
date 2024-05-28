import React from "react";
import { Box } from "@mui/material";

import JobUserDetailsSection from "../components/job/JobUserDetailsSection";

const ApplicationReviewPage = () => {
  return (
    <Box sx={{ display: "flex", margin: "12px", gap: "12px" }}>
      <div>Progress</div>
      <JobUserDetailsSection />
    </Box>
  );
};

export default ApplicationReviewPage;
