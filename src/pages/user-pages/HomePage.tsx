import React from "react";
import { Box } from "@mui/material";

import PostSection from "../../components/post/PostSection";
import RecommendedJobsSection from "../../components/job/RecommendedJobsSection";
import MyAccountSection from "../../components/account/MyAccountSection";

const HomePage = () => {
  return (
    <Box sx={{ display: "flex", padding: "12px", gap: "12px" }}>
      <MyAccountSection />
      <PostSection />
      <RecommendedJobsSection />
    </Box>
  );
};

export default HomePage;
