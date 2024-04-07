import React, { useRef } from "react";
import { Divider, List, ListItem, Typography } from "@mui/material";

import { extractUserNameFromMessage } from "./utils";
import NoMessages from "./NoMessages";
import InputEmojiField from "./InputEmojiField";
import { MessageType } from "../../utils/types/MessageType";
import { ChatRoomType } from "../../utils/types/ChatRoom";

interface ConversationProps {
  messages: MessageType[];
  selectedRoom: ChatRoomType;
}
const Conversation = ({ messages, selectedRoom }: ConversationProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  return (
    <div
      style={{
        flex: 5,
        display: "flex",
        flexDirection: "column",
        height: "inherit",
      }}
    >
      <Divider />
      <List
        style={{
          padding: "16px",
          overflow: "auto",
          flex: 1,
        }}
      >
        {messages.length !== 0 ? (
          <List
            style={{
              padding: "16px",
              overflow: "auto",
              flex: 1,
            }}
          >
            {messages.map((message) => (
              <div key={message.id}>
                <ListItem style={{ marginBottom: "8px" }}>
                  <Typography
                    style={{ marginRight: "8px" }}
                    variant="body2"
                    color="textSecondary"
                  >
                    {extractUserNameFromMessage(message)}:
                  </Typography>
                  {message.text}
                </ListItem>
                <ListItem sx={{ alignItems: "center", gap: "8px" }}>
                  <Typography variant="caption" color="textSecondary">
                    {new Date(message.createdAt).toLocaleTimeString()}
                  </Typography>
                </ListItem>
                <Divider style={{ marginTop: "8px", marginBottom: "8px" }} />
              </div>
            ))}
            <div ref={messagesEndRef} />
          </List>
        ) : (
          <NoMessages />
        )}
        <div ref={messagesEndRef} />
      </List>
      <InputEmojiField currentRoom={selectedRoom} />
    </div>
  );
};

export default Conversation;
