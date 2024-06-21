import React, { useEffect, useState } from "react";
import {
  Box,
  ListItemIcon,
  ListItemText,
  MenuList,
  Typography,
} from "@mui/material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PersonIcon from "@mui/icons-material/Person";
import MenuItem from "@mui/material/MenuItem";

import { GrayColors, White } from "../../utils/constants/colorPallete";

import { useAppSelector } from "../../store/hooks";
import { getLoggedUser } from "../../store/slices/AuthSlice";

import UserCard from "../../components/user/UserCard";
import { UserType } from "../../store/slices/UserSlice";

const MyNetworkPage = () => {
  const currentLoggedUser = useAppSelector(getLoggedUser);

  const [currentTab, setCurrentTab] = useState(0);
  const [users, setUsers] = useState<UserType[]>([]);

  useEffect(() => {
    if (!currentLoggedUser) {
      return;
    }

    switch (currentTab) {
      case 0:
        setUsers(currentLoggedUser.following);
        return;
      case 1:
        setUsers(currentLoggedUser.followers);
        return;
      default:
        setUsers(currentLoggedUser.following);
    }
  }, [currentTab]);

  return (
    <Box
      sx={{ display: "flex", padding: "12px", gap: "12px", height: "inherit" }}
    >
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",

          height: "fit-content",
          borderRadius: "8px",
          backgroundColor: White.PureWhite,
          border: `1px solid ${GrayColors.Gray2}`,
        }}
      >
        <MenuList>
          <MenuItem
            onClick={() => setCurrentTab(0)}
            selected={currentTab === 0}
          >
            <ListItemIcon>
              <PersonIcon sx={{ color: GrayColors.Gray4 }} />
            </ListItemIcon>
            <ListItemText>Following</ListItemText>
          </MenuItem>
          <MenuItem
            onClick={() => setCurrentTab(1)}
            selected={currentTab === 1}
          >
            <ListItemIcon>
              <PeopleAltIcon sx={{ color: GrayColors.Gray4 }} />
            </ListItemIcon>
            <ListItemText>Followers</ListItemText>
          </MenuItem>
        </MenuList>
      </Box>
      <Box
        sx={{
          flex: 5,
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          overflow: "auto",

          height: "fit-content",
          padding: "16px",
          borderRadius: "8px",
          backgroundColor: White.PureWhite,
          border: `1px solid ${GrayColors.Gray2}`,
        }}
      >
        {Array.isArray(users) && users.length > 0 ? (
          users.map((user) => <UserCard user={user} key={user.id} />)
        ) : (
          <Typography variant="body1" color={"text.secondary"}>
            No users to display
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default MyNetworkPage;
