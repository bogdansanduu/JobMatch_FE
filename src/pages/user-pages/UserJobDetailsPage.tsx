import React from "react";
import { Box, useMediaQuery } from "@mui/material";

import RecommendedJobsSection from "../../components/job/RecommendedJobsSection";
import JobUserDetailsSection from "../../components/job/JobUserDetailsSection";

const UserJobDetailsPage = () => {
  const isLaptop = useMediaQuery("(min-width: 1024px)");

  return (
    <Box sx={{ display: "flex", margin: "12px", gap: "12px" }}>
      {isLaptop && <RecommendedJobsSection containerSx={{ flex: 1 }} />}
      <JobUserDetailsSection />
    </Box>
  );
};

export default UserJobDetailsPage;
