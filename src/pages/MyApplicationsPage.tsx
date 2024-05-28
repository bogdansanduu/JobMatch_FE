import React from "react";
import { Box } from "@mui/material";

import MyAccountSection from "../components/account/MyAccountSection";
import RecommendedJobsSection from "../components/job/RecommendedJobsSection";
import MyApplicationsSection from "../components/application/MyApplicationsSection";

const MyApplicationsPage = () => {
  return (
    <Box sx={{ display: "flex", padding: "12px", gap: "12px" }}>
      <MyAccountSection />
      <MyApplicationsSection />
      <RecommendedJobsSection />
    </Box>
  );
};

export default MyApplicationsPage;
