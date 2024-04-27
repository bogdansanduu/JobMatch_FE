import React from "react";
import { Box } from "@mui/material";

import { GrayColors, White } from "../utils/constants/colorPallete";

import PostSection from "../components/post/PostSection";

const HomePage = () => {
  return (
    <Box sx={{ display: "flex", margin: "12px", gap: "12px" }}>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",

          height: "100%",
          padding: "16px",
          borderRadius: "8px",
          backgroundColor: White.PureWhite,
          border: `1px solid ${GrayColors.Gray2}`,
        }}
      >
        My Account
      </Box>
      <PostSection />

      <Box
        sx={{
          flex: 2,

          height: "100%",
          padding: "16px",
          borderRadius: "8px",
          backgroundColor: White.PureWhite,
          border: `1px solid ${GrayColors.Gray2}`,
        }}
      >
        Recommendations
      </Box>
    </Box>
  );
};

export default HomePage;
