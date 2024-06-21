import React, { useEffect, useState } from "react";
import { Box, useMediaQuery } from "@mui/material";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { UserType } from "../../store/slices/UserSlice";
import {
  getLoggedCompany,
  getLoggedUser,
  refreshCurrentUserData,
  refreshToken,
  refreshTokenCompany,
} from "../../store/slices/AuthSlice";

import {
  SocketEventsClient,
  SocketEventsServer,
} from "../../utils/constants/socketEvents";

import { ChatRoomType } from "../../utils/types/ChatRoom";
import AppApi from "../../server/api/AppApi";
import NoConversationSelected from "../../components/messaging/NoConversationSelected";
import Conversation from "../../components/messaging/Conversation";
import ConversationsList from "../../components/messaging/ConversationsList";

const MessagingPage = () => {
  const socket = AppApi.getSocketApi();
  const dispatch = useAppDispatch();

  const currentUser = useAppSelector(getLoggedUser);
  const currentCompany = useAppSelector(getLoggedCompany);

  const [selectedRoom, setSelectedRoom] = useState<ChatRoomType | undefined>(
    undefined
  );
  const [availableRooms, setAvailableRooms] = useState<ChatRoomType[]>([]);
  const [joinedChat, setJoinedChat] = useState(false);

  const isTablet = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    dispatch(refreshCurrentUserData());
    socket.connect();

    return () => {
      socket.off(SocketEventsServer.ALL_ROOMS_FOR_USER);
      socket.off(SocketEventsServer.CREATED_ONE_ON_ONE_ROOM);

      socket.off(SocketEventsServer.JOINED_ROOM);

      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    socket.emit(SocketEventsClient.GET_ALL_ROOMS_FOR_USER, {
      userId: currentUser?.id,
    });

    socket.on("connect_error", async (error) => {
      //TODO TEMPORARY FIX
      currentUser && (await dispatch(refreshToken()));
      currentCompany && (await dispatch(refreshTokenCompany()));
      window.location.reload();
    });

    socket.on(
      SocketEventsServer.ALL_ROOMS_FOR_USER,
      (rooms: ChatRoomType[]) => {
        setAvailableRooms(rooms || []);
      }
    );

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

  const handleSelectUser = (recipient: UserType) => {
    socket.emit(SocketEventsClient.CREATE_ONE_ON_ONE_ROOM, {
      hostId: currentUser?.id,
      recipientId: recipient.id,
    });
  };

  const handleRoomSelection = (room: ChatRoomType) => {
    if (selectedRoom) {
      socket.emit(SocketEventsClient.LEAVE_ROOM, {
        roomId: selectedRoom.id,
      });
    }

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
    <Box
      sx={{
        display: "flex",
        height: "inherit",
        flexDirection: isTablet ? "column" : "row",
      }}
    >
      <ConversationsList
        selectedRoom={selectedRoom}
        availableRooms={availableRooms}
        handleRoomSelection={handleRoomSelection}
        handleSelectUser={handleSelectUser}
      />
      {joinedChat && selectedRoom ? (
        <Conversation selectedRoom={selectedRoom} />
      ) : (
        <NoConversationSelected />
      )}
    </Box>
  );
};

export default MessagingPage;
