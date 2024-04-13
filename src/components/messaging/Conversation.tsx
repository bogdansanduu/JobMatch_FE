import React, { useEffect, useRef, useState } from "react";
import { Box, Divider, List, ListItem, Typography } from "@mui/material";

import { extractUserNameFromMessage } from "./utils";
import NoMessages from "./NoMessages";
import InputEmojiField from "./InputEmojiField";
import { MessageType } from "../../utils/types/MessageType";
import { ChatRoomType } from "../../utils/types/ChatRoom";
import { GrayColors, White } from "../../utils/constants/colorPallete";
import { SocketEventsServer } from "../../utils/constants/socketEvents";
import AppApi from "../../server/api/AppApi";

interface ConversationProps {
  selectedRoom: ChatRoomType;
}
const Conversation = ({ selectedRoom }: ConversationProps) => {
  const socket = AppApi.getSocketApi();

  const [messages, setMessages] = useState<MessageType[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return () => {
      socket.off(SocketEventsServer.ALL_MESSAGES_FOR_ROOM);
      socket.off(SocketEventsServer.MESSAGE_ROOM);
    };
  }, []);

  useEffect(() => {
    socket.on(
      SocketEventsServer.ALL_MESSAGES_FOR_ROOM,
      (messages: MessageType[]) => {
        setMessages(messages);
      }
    );

    socket.on(SocketEventsServer.MESSAGE_ROOM, (message: MessageType) => {
      setMessages((messages) => [...messages, message]);
    });
  }, [socket]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const isListVisible = messages.length !== 0;

  return (
    <Box
      sx={{
        flex: 5,
        display: "flex",
        flexDirection: "column",
        margin: "12px",
        padding: "16px",
        borderRadius: "8px",
        backgroundColor: White.PureWhite,
        border: `1px solid ${GrayColors.Gray2}`,
      }}
    >
      <List
        style={{
          overflow: "auto",
          flex: 1,
          display: isListVisible ? "block" : "none",
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
      <NoMessages
        containerStyle={{ display: isListVisible ? "none" : "block" }}
      />
      <InputEmojiField currentRoom={selectedRoom} />
    </Box>
  );
};

export default Conversation;
