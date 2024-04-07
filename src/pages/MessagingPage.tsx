import React, { useEffect, useRef, useState } from "react";
import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getAllUsers, getUsers, UserType } from "../store/slices/UserSlice";
import { getLoggedUser } from "../store/slices/AuthSlice";

import { ChatRoomType } from "../utils/types/ChatRoom";
import {
  extractRoomName,
  extractUserNameFromMessage,
} from "../components/messaging/utils";
import { MessageType } from "../utils/types/MessageType";
import InputEmojiField from "../components/messaging/InputEmojiField";
import AppApi from "../server/api/AppApi";
import {
  SocketEventsClient,
  SocketEventsServer,
} from "../utils/constants/socketEvents";
import { BodyText2 } from "../components/typography/BodyTexts";

const MessagingPage = () => {
  const socket = AppApi.getSocketApi();

  const dispatch = useAppDispatch();
  const allUsers = useAppSelector(getUsers);
  const currentUser = useAppSelector(getLoggedUser);

  const [messages, setMessages] = useState<MessageType[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<ChatRoomType | null>(null);
  const [availableRooms, setAvailableRooms] = useState<ChatRoomType[]>([]);
  const [joinedChat, setJoinedChat] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    socket.connect();

    return () => {
      socket.off(SocketEventsServer.ALL_ROOMS_FOR_USER);
      socket.off(SocketEventsServer.CREATED_ONE_ON_ONE_ROOM);

      socket.off(SocketEventsServer.ALL_MESSAGES_FOR_ROOM);
      socket.off(SocketEventsServer.MESSAGE_ROOM);

      socket.disconnect();
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    socket.emit(SocketEventsClient.GET_ALL_ROOMS_FOR_USER, {
      userId: currentUser?.id,
    });

    socket.on(
      SocketEventsServer.ALL_ROOMS_FOR_USER,
      (rooms: ChatRoomType[]) => {
        setAvailableRooms(rooms);
      }
    );

    socket.on(
      SocketEventsServer.ALL_MESSAGES_FOR_ROOM,
      (messages: MessageType[]) => {
        setMessages(messages);
      }
    );

    socket.on(SocketEventsServer.MESSAGE_ROOM, (message: MessageType) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on(
      SocketEventsServer.CREATED_ONE_ON_ONE_ROOM,
      (room: ChatRoomType) => {
        setAvailableRooms((oldRooms) => {
          return oldRooms.findIndex((oldRoom) => oldRoom.id === room.id) !== -1
            ? oldRooms
            : [...oldRooms, room];
        });

        setSelectedRoom(room);
        setJoinedChat(true);
      }
    );
  }, [socket]);

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSelectUser = (recipient: UserType) => {
    socket.emit(SocketEventsClient.CREATE_ONE_ON_ONE_ROOM, {
      hostId: currentUser?.id,
      recipientId: recipient.id,
    });
  };

  const handleRoomSelection = (room: ChatRoomType) => {
    socket.emit(SocketEventsClient.JOIN_ROOM, {
      roomId: room.id,
      userId: currentUser?.id,
    });
    socket.emit(SocketEventsClient.GET_ALL_MESSAGES_FOR_ROOM, {
      roomId: room.id,
    });

    setSelectedRoom(room);
    setJoinedChat(true);
  };

  return (
    <Box sx={{ display: "flex", height: "inherit" }}>
      <List sx={{ flex: 1, maxWidth: "300px" }}>
        <Stack direction="row" sx={{ overflowX: "auto", width: "inherit" }}>
          {Array.isArray(allUsers) &&
            allUsers.map((user) => (
              <ListItem key={user.id}>
                <ListItemButton onClick={() => handleSelectUser(user)}>
                  <ListItemAvatar>
                    <Avatar
                      alt={`${user.firstName} ${user.lastName}`}
                      src={user.profilePicture}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${user.firstName} ${user.lastName}`}
                  />
                </ListItemButton>
              </ListItem>
            ))}
        </Stack>

        <Divider textAlign={"center"} sx={{ padding: "16px 0px" }}>
          Current Chats
        </Divider>

        {availableRooms.map((room) => (
          <ListItemButton
            key={room.id}
            selected={selectedRoom?.id === room.id}
            onClick={() => handleRoomSelection(room)}
          >
            {extractRoomName(room, currentUser)}
          </ListItemButton>
        ))}
      </List>
      {joinedChat && selectedRoom ? (
        <div
          style={{
            flex: 5,
            display: "flex",
            flexDirection: "column",
            height: "inherit",
          }}
        >
          <BodyText2
            fontWeight={"500"}
            style={{ display: "flex", justifyContent: "center" }}
          >
            {extractRoomName(selectedRoom, currentUser)}
          </BodyText2>
          <Divider />
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
          <InputEmojiField currentRoom={selectedRoom} />
        </div>
      ) : (
        <div style={{ flex: 3 }}>Start a conversation</div>
      )}
    </Box>
  );
};

export default MessagingPage;
