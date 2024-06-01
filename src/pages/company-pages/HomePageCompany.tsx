import React from "react";
import { Box } from "@mui/material";

import { GrayColors, White } from "../../utils/constants/colorPallete";

import PostSectionCompany from "../../components/post/PostSectionCompany";

const HomePageCompany = () => {
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

      <PostSectionCompany />
    </Box>
  );
};

export default HomePageCompany;
