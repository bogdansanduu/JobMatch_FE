import React from "react";
import { Box, SxProps, Typography } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";

interface NoMessagesProps {
  containerStyle?: SxProps;
}
const NoMessages = ({ containerStyle }: NoMessagesProps) => {
  return (
    <Box textAlign="center" mt={10} sx={{ flex: 3, ...containerStyle }}>
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
