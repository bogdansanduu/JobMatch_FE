import React from "react";
import { Box } from "@mui/material";

import { GrayColors, White } from "../utils/constants/colorPallete";

import RecommendedJobsSection from "../components/job/RecommendedJobsSection";
import AllJobsSection from "../components/job/AllJobsSection";

const JobsPage = () => {
  return (
    <Box
      sx={{ display: "flex", padding: "12px", gap: "12px", height: "inherit" }}
    >
      <Box
        sx={{
          flex: 2,

          height: "fit-content",
          padding: "16px",
          borderRadius: "8px",
          backgroundColor: White.PureWhite,
          border: `1px solid ${GrayColors.Gray2}`,
        }}
      >
        My Account
      </Box>
      <AllJobsSection />
      <RecommendedJobsSection />
    </Box>
  );
};

export default JobsPage;
