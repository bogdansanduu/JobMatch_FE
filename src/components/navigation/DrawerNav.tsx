import React from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router";

import { adminPages, pagesCompany, pagesUser } from "./constants";
import { GrayColors } from "../../utils/constants/colorPallete";
import { Roles } from "../../utils/constants/roles";

import { useAppSelector } from "../../store/hooks";
import { getLoggedCompany, getLoggedUser } from "../../store/slices/AuthSlice";

interface DrawerProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DrawerNav = ({ open, setOpen }: DrawerProps) => {
  const currentUser = useAppSelector(getLoggedUser);
  const currentCompany = useAppSelector(getLoggedCompany);

  const navigate = useNavigate();

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setOpen(open);
    };

  const handleClick = (route: string) => {
    setOpen(false);
    navigate(route);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {currentUser &&
          (currentUser.role === Roles.USER ||
            currentUser.role === Roles.COMPANY_OWNER) &&
          pagesUser.map(({ title, icon, route }) => (
            <ListItem key={title} disablePadding>
              <ListItemButton
                onClick={() => handleClick(route)}
                disableRipple
                sx={{
                  color: GrayColors.Gray6,
                  padding: "4px",
                  "&:hover": {
                    color: GrayColors.Gray9,
                  },
                }}
              >
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={title} />
              </ListItemButton>
            </ListItem>
          ))}
        {currentUser &&
          currentUser.role === Roles.ADMIN &&
          adminPages.map(({ title, icon, route }) => (
            <ListItem key={title} disablePadding>
              <ListItemButton
                onClick={() => handleClick(route)}
                disableRipple
                sx={{
                  color: GrayColors.Gray6,
                  padding: "4px",
                  "&:hover": {
                    color: GrayColors.Gray9,
                  },
                }}
              >
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={title} />
              </ListItemButton>
            </ListItem>
          ))}
        {currentCompany &&
          pagesCompany.map(({ title, icon, route }) => (
            <ListItem key={title} disablePadding>
              <ListItemButton
                onClick={() => handleClick(route)}
                disableRipple
                sx={{
                  color: GrayColors.Gray6,
                  padding: "4px",
                  "&:hover": {
                    color: GrayColors.Gray9,
                  },
                }}
              >
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={title} />
              </ListItemButton>
            </ListItem>
          ))}
      </List>
    </Box>
  );

  return (
    <Drawer open={open} onClose={toggleDrawer(false)}>
      {DrawerList}
    </Drawer>
  );
};

export default DrawerNav;
