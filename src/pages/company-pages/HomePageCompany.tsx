import React from "react";
import { Box, useMediaQuery } from "@mui/material";

import PostSectionCompany from "../../components/post/PostSectionCompany";
import MyAccountSectionCompany from "../../components/account/MyAccountSectionCompany";

const HomePageCompany = () => {
  const isMobile = useMediaQuery("(max-width: 600px)");

  return (
    <Box sx={{ display: "flex", margin: "12px", gap: "12px" }}>
      {!isMobile && <MyAccountSectionCompany />}
      <PostSectionCompany />
    </Box>
  );
};

export default HomePageCompany;
