import React from "react";
import { Box, useMediaQuery } from "@mui/material";

import RecommendedJobsSection from "../../components/job/RecommendedJobsSection";
import AllJobsSection from "../../components/job/AllJobsSection";
import MyAccountSection from "../../components/account/MyAccountSection";

const JobsPage = () => {
  const isLaptop = useMediaQuery("(min-width: 1024px)");
  const isTablet = useMediaQuery("(max-width: 768px)");

  return (
    <Box
      sx={{ display: "flex", padding: "12px", gap: "12px", height: "inherit" }}
    >
      {isLaptop && <MyAccountSection />}
      <AllJobsSection />
      {!isTablet && <RecommendedJobsSection />}
    </Box>
  );
};

export default JobsPage;
