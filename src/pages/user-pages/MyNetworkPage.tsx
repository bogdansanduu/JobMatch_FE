import React from "react";
import { Box, ListItemIcon, ListItemText, MenuList } from "@mui/material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import BusinessIcon from "@mui/icons-material/Business";
import PersonIcon from "@mui/icons-material/Person";

import { GrayColors, White } from "../../utils/constants/colorPallete";

import AppApi from "../../server/api/AppApi";
import { useAppSelector } from "../../store/hooks";
import { getLoggedUser } from "../../store/slices/AuthSlice";
import MenuItem from "@mui/material/MenuItem";

const userApi = AppApi.getUserApi();

const MyNetworkPage = () => {
  const currentLoggedUser = useAppSelector(getLoggedUser);

  return (
    <Box sx={{ display: "flex" }}>
      <Box
        sx={{
          flex: 1,
          margin: "12px",
          borderRadius: "8px",
          backgroundColor: White.PureWhite,
          border: `1px solid ${GrayColors.Gray2}`,
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <MenuList>
          <MenuItem>
            <ListItemIcon>
              <PersonIcon sx={{ color: GrayColors.Gray4 }} />
            </ListItemIcon>
            <ListItemText>Following</ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <PeopleAltIcon sx={{ color: GrayColors.Gray4 }} />
            </ListItemIcon>
            <ListItemText>Followers</ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <BusinessIcon sx={{ color: GrayColors.Gray4 }} />
            </ListItemIcon>
            <ListItemText>Companies</ListItemText>
          </MenuItem>
        </MenuList>
      </Box>
      <Box
        sx={{
          flex: 3,
          margin: "12px",
          borderRadius: "8px",
          backgroundColor: White.PureWhite,
          border: `1px solid ${GrayColors.Gray2}`,
        }}
      >
        Right Side
      </Box>
    </Box>
  );
};

export default MyNetworkPage;
