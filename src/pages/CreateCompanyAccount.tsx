import React from "react";
import { Box } from "@mui/material";
import { GrayColors, White } from "../utils/constants/colorPallete";

const CreateCompanyAccount = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",

        height: "100%",
        padding: "16px",
        borderRadius: "8px",
        backgroundColor: White.PureWhite,
        border: `1px solid ${GrayColors.Gray2}`,
      }}
    >
      Create Company Account
    </Box>
  );
};

export default CreateCompanyAccount;
