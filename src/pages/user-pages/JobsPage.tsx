import React from "react";
import { Box } from "@mui/material";

import RecommendedJobsSection from "../../components/job/RecommendedJobsSection";
import AllJobsSection from "../../components/job/AllJobsSection";
import MyAccountSection from "../../components/account/MyAccountSection";

const JobsPage = () => {
  return (
    <Box
      sx={{ display: "flex", padding: "12px", gap: "12px", height: "inherit" }}
    >
      <MyAccountSection />
      <AllJobsSection />
      <RecommendedJobsSection />
    </Box>
  );
};

export default JobsPage;
