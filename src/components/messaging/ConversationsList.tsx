import React, { useState } from "react";
import {
  Avatar,
  Box,
  Divider,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Stack,
  TextField,
  useMediaQuery,
} from "@mui/material";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";

import { useAppSelector } from "../../store/hooks";
import { UserType } from "../../store/slices/UserSlice";
import { getLoggedUser } from "../../store/slices/AuthSlice";

import { extractRoomInfo } from "./utils";
import { ChatRoomType } from "../../utils/types/ChatRoom";
import { Blue, GrayColors, White } from "../../utils/constants/colorPallete";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

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

  const [searchTerm, setSearchTerm] = useState<string>("");

  const isTablet = useMediaQuery("(max-width: 768px)");

  const followingAndFollowers = currentUser && [
    ...currentUser.following,
    ...currentUser.followers,
  ];

  const uniqueConnections = followingAndFollowers
    ? followingAndFollowers.filter(
        (obj, index) =>
          followingAndFollowers.findIndex((item) => item.id === obj.id) ===
          index
      )
    : [];
  const uniqueNotBanConnections = uniqueConnections.filter((user) => {
    //get all users that are not banned and use the search term to filter
    return (
      !user.isBanned &&
      (user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  return (
    <Box
      sx={{
        flex: 1,
        minWidth: "300px",
        maxWidth: isTablet ? "unset" : "300px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        margin: "12px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          padding: "8px",

          backgroundColor: White.PureWhite,
          borderRadius: "8px",
          border: `1px solid ${GrayColors.Gray2}`,
        }}
      >
        <TextField
          variant="standard"
          margin="normal"
          placeholder="Search"
          sx={{
            backgroundColor: Blue.VoyagerBlue,
            borderRadius: "6px",
            marginTop: 0,
            marginBottom: 0,
            marginLeft: "4px",
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" sx={{ paddingLeft: "4px" }}>
                <SearchIcon />
              </InputAdornment>
            ),
            disableUnderline: true,
            endAdornment: (
              <InputAdornment position="end">
                <IconButton disableRipple onClick={() => setSearchTerm("")}>
                  <CloseIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Divider />
        <Stack
          direction="row"
          sx={{
            overflowX: "auto",
            width: "inherit",
          }}
        >
          {uniqueNotBanConnections.length > 0 ? (
            uniqueNotBanConnections.map((user) => (
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
            ))
          ) : (
            <ListItem>
              <ListItemText
                primary={"No connections found"}
                color={"text.secondary"}
              />
            </ListItem>
          )}
        </Stack>
      </Box>

      {!isTablet && (
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
      )}
    </Box>
  );
};

export default ConversationsList;
