import React from "react";
import { Box, Typography } from "@mui/material";
import UpcomingIcon from "@mui/icons-material/Upcoming";

import { GrayColors, White } from "../../utils/constants/colorPallete";

const NoConversationSelected = () => {
  return (
    <Box
      textAlign="center"
      sx={{
        flex: 5,
        margin: "12px",
        borderRadius: "8px",
        backgroundColor: White.PureWhite,
        border: `1px solid ${GrayColors.Gray2}`,
      }}
    >
      <UpcomingIcon
        sx={{
          marginTop: "10px",
          height: "55px",
          width: "55px",
          color: GrayColors.Gray8,
        }}
      />

      <Typography variant="h5" gutterBottom>
        No conversation selected
      </Typography>
      <Typography variant="body1" color="textSecondary" gutterBottom>
        Start a conversation by selecting a user / conversation
      </Typography>
    </Box>
  );
};

export default NoConversationSelected;
