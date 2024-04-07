import React from "react";
import { Box, Typography } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";

const NoMessages = () => {
  return (
    <Box textAlign="center" mt={10} sx={{ flex: 3 }}>
      <ChatIcon
        sx={{
          height: "55px",
          width: "55px",
          color: "rgba(0, 0, 0, 0.54)",
        }}
      />

      <Typography variant="h5" gutterBottom>
        No messages yet
      </Typography>
      <Typography variant="body1" color="textSecondary" gutterBottom>
        Start the conversation by typing a message
      </Typography>
    </Box>
  );
};

export default NoMessages;
