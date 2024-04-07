import React from "react";
import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Stack,
} from "@mui/material";

import { useAppSelector } from "../../store/hooks";
import { getUsers, UserType } from "../../store/slices/UserSlice";
import { getLoggedUser } from "../../store/slices/AuthSlice";

import { extractRoomInfo } from "./utils";
import { ChatRoomType } from "../../utils/types/ChatRoom";

interface ConversationsListProps {
  availableRooms: ChatRoomType[];
  selectedRoom: ChatRoomType | undefined;
  handleRoomSelection: (room: ChatRoomType) => void;
  handleSelectUser: (recipient: UserType) => void;
}
const ConversationsList = ({
  availableRooms,
  selectedRoom,
  handleRoomSelection,
  handleSelectUser,
}: ConversationsListProps) => {
  const allUsers = useAppSelector(getUsers);
  const currentUser = useAppSelector(getLoggedUser);

  return (
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
                <ListItemText primary={`${user.firstName} ${user.lastName}`} />
              </ListItemButton>
            </ListItem>
          ))}
      </Stack>

      <Divider textAlign={"center"} sx={{ padding: "16px 0px" }}>
        Current Chats
      </Divider>

      {availableRooms.map((room) => {
        const roomData = extractRoomInfo(room, currentUser);
        const isSelected = selectedRoom?.id === room.id;

        return (
          <ListItemButton
            key={room.id}
            selected={isSelected}
            onClick={() => handleRoomSelection(room)}
            sx={{
              paddingLeft: isSelected ? "4px" : "0",
              borderLeft: isSelected ? "4px solid green" : "none",
            }}
          >
            <ListItemAvatar>
              <Avatar alt={roomData.roomName} src={roomData.roomPicture} />
            </ListItemAvatar>
            <ListItemText primary={roomData.roomName} />
          </ListItemButton>
        );
      })}
    </List>
  );
};

export default ConversationsList;
