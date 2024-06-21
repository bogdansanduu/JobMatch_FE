import React from "react";
import { Box, useMediaQuery } from "@mui/material";

import PostSection from "../../components/post/PostSection";
import RecommendedJobsSection from "../../components/job/RecommendedJobsSection";
import MyAccountSection from "../../components/account/MyAccountSection";

const HomePage = () => {
  const isLaptop = useMediaQuery("(min-width: 1024px)");
  const isMobile = useMediaQuery("(max-width: 600px)");

  return (
    <Box sx={{ display: "flex", padding: "12px", gap: "12px" }}>
      {isLaptop && <MyAccountSection />}
      <PostSection />
      {!isMobile && <RecommendedJobsSection />}
    </Box>
  );
};

export default HomePage;
