import React, { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getAllUsers, UserType } from "../store/slices/UserSlice";
import { getLoggedUser } from "../store/slices/AuthSlice";

import {
  SocketEventsClient,
  SocketEventsServer,
} from "../utils/constants/socketEvents";

import { ChatRoomType } from "../utils/types/ChatRoom";
import { MessageType } from "../utils/types/MessageType";
import AppApi from "../server/api/AppApi";
import NoConversationSelected from "../components/messaging/NoConversationSelected";
import Conversation from "../components/messaging/Conversation";
import ConversationsList from "../components/messaging/ConversationsList";

const MessagingPage = () => {
  const socket = AppApi.getSocketApi();

  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(getLoggedUser);

  const [messages, setMessages] = useState<MessageType[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<ChatRoomType | undefined>(
    undefined
  );
  const [availableRooms, setAvailableRooms] = useState<ChatRoomType[]>([]);
  const [joinedChat, setJoinedChat] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    socket.connect();

    dispatch(getAllUsers());

    return () => {
      socket.off(SocketEventsServer.ALL_ROOMS_FOR_USER);
      socket.off(SocketEventsServer.CREATED_ONE_ON_ONE_ROOM);

      socket.off(SocketEventsServer.ALL_MESSAGES_FOR_ROOM);
      socket.off(SocketEventsServer.MESSAGE_ROOM);

      socket.off(SocketEventsServer.JOINED_ROOM);

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

        if (room.host.id === currentUser?.id) {
          setSelectedRoom(room);
          setJoinedChat(true);
        }
      }
    );

    socket.on(SocketEventsServer.JOINED_ROOM, (room: ChatRoomType) => {
      // console.log(room);
    });
  }, [socket]);

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
      <ConversationsList
        selectedRoom={selectedRoom}
        availableRooms={availableRooms}
        handleRoomSelection={handleRoomSelection}
        handleSelectUser={handleSelectUser}
      />
      {joinedChat && selectedRoom ? (
        <Conversation messages={messages} selectedRoom={selectedRoom} />
      ) : (
        <NoConversationSelected />
      )}
    </Box>
  );
};

export default MessagingPage;
