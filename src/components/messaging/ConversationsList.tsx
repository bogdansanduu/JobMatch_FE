import React, { useEffect } from "react";
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Stack,
} from "@mui/material";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";

import { useAppSelector } from "../../store/hooks";
import { UserType } from "../../store/slices/UserSlice";
import { getLoggedUser } from "../../store/slices/AuthSlice";

import { extractRoomInfo } from "./utils";
import { ChatRoomType } from "../../utils/types/ChatRoom";
import { GrayColors, White } from "../../utils/constants/colorPallete";

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
  const currentUser = useAppSelector(getLoggedUser);

  const followingAndFollowers = currentUser && [
    ...currentUser.following,
    ...currentUser.followers,
  ];
  const uniqueConnections = Array.from(new Set(followingAndFollowers));

  return (
    <Box
      sx={{
        flex: 1,
        maxWidth: "300px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        margin: "12px",
      }}
    >
      <Stack
        direction="row"
        sx={{
          overflowX: "auto",
          width: "inherit",
          borderRadius: "8px",
          backgroundColor: White.PureWhite,
          border: `1px solid ${GrayColors.Gray2}`,
        }}
      >
        {uniqueConnections.map((user) => (
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

      <List
        sx={{
          borderRadius: "8px",
          backgroundColor: White.PureWhite,
          border: `1px solid ${GrayColors.Gray2}`,
        }}
      >
        <ListItem>
          <QuestionAnswerOutlinedIcon sx={{ color: GrayColors.Gray8 }} />
          <ListItemText sx={{ textAlign: "center" }}>
            Current Chats
          </ListItemText>
        </ListItem>
        {availableRooms.map((room) => {
          const roomData = extractRoomInfo(room, currentUser);
          const isSelected = selectedRoom?.id === room.id;

          return (
            <ListItemButton
              key={room.id}
              selected={isSelected}
              onClick={() => handleRoomSelection(room)}
              sx={{
                paddingLeft: "4px",
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
    </Box>
  );
};

export default ConversationsList;
