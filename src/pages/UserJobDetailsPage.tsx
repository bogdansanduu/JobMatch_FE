import React from "react";
import { Box } from "@mui/material";

import RecommendedJobsSection from "../components/job/RecommendedJobsSection";
import JobUserDetailsSection from "../components/job/JobUserDetailsSection";

const UserJobDetailsPage = () => {
  return (
    <Box sx={{ display: "flex", margin: "12px", gap: "12px" }}>
      <RecommendedJobsSection />
      <JobUserDetailsSection />
    </Box>
  );
};

export default UserJobDetailsPage;
