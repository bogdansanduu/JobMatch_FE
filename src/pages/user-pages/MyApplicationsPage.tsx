import React from "react";
import { Box, useMediaQuery } from "@mui/material";

import MyAccountSection from "../../components/account/MyAccountSection";
import RecommendedJobsSection from "../../components/job/RecommendedJobsSection";
import MyApplicationsSection from "../../components/application/MyApplicationsSection";

const MyApplicationsPage = () => {
  const isLaptop = useMediaQuery("(min-width: 1024px)");
  const isTablet = useMediaQuery("(max-width: 768px)");

  return (
    <Box sx={{ display: "flex", padding: "12px", gap: "12px" }}>
      {isLaptop && <MyAccountSection />}
      <MyApplicationsSection />
      {!isTablet && <RecommendedJobsSection />}
    </Box>
  );
};

export default MyApplicationsPage;
