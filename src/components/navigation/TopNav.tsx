import React, { useState } from "react";
import { useNavigate } from "react-router";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import HomeIcon from "@mui/icons-material/Home";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import WorkIcon from "@mui/icons-material/Work";
import ForumIcon from "@mui/icons-material/Forum";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { AppBar } from "@mui/material";
import Button from "@mui/material/Button";

import { useAppDispatch } from "../../store/hooks";

import logo from "../../assets/linkedLogo.png";
import { GrayColors, White } from "../../utils/constants/colorPallete";
import { AppRoutes } from "../../utils/constants/routes";

import { BodyText4 } from "../typography/BodyTexts";
import { logout } from "../../store/slices/AuthSlice";
import SearchPopover from "../popover/SearchPopover";

const pages = [
  {
    title: "Home Page",
    icon: <HomeIcon sx={{ height: "22px", width: "22px" }} />,
    route: AppRoutes.Home,
  },
  {
    title: "My Network",
    icon: <PeopleAltIcon sx={{ height: "22px", width: "22px" }} />,
    route: AppRoutes.MyNetwork,
  },
  {
    title: "Jobs",
    icon: <WorkIcon sx={{ height: "22px", width: "22px" }} />,
    route: AppRoutes.Jobs,
  },
  {
    title: "Messages",
    icon: <ForumIcon sx={{ height: "22px", width: "22px" }} />,
    route: AppRoutes.Messaging,
  },
  {
    title: "Notifications",
    icon: <NotificationsIcon sx={{ height: "22px", width: "22px" }} />,
    route: AppRoutes.Notifications,
  },
];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const TopNav = () => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleClick = (route: string) => {
    navigate(route);
  };

  const handleSignOut = () => {
    localStorage.clear();
    dispatch(logout());
    navigate(AppRoutes.Login);
  };

  // const debouncedHandleSearch = debounce(
  //   async (event: React.ChangeEvent<HTMLInputElement>) => {
  //     const searchTerm = event.target.value;
  //     const users = await userApi.searchByNameAndEmail(searchTerm);
  //
  //     console.log(users);
  //   },
  //   500
  // );

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: White.PureWhite, height: "5vh" }}
      elevation={0}
    >
      <Toolbar
        disableGutters
        sx={{ alignItems: "center", height: "inherit" }}
        variant="dense"
      >
        <Box sx={{ padding: "4px" }}>
          <img
            src={logo}
            alt={"LinkedIn"}
            style={{
              height: 32,
              width: 32,
              borderRadius: "4px",
            }}
          />
        </Box>
        <SearchPopover />
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: "flex" }}>
          {pages.map(({ title, icon, route }) => (
            <IconButton
              key={title}
              sx={{
                display: "flex",
                flexDirection: "column",
                color: GrayColors.Gray6,
                padding: "4px",
                "&:hover": {
                  color: GrayColors.Gray9,
                },
              }}
              onClick={() => handleClick(route)}
              disableRipple
            >
              {icon}
              <BodyText4>{title}</BodyText4>
            </IconButton>
          ))}
        </Box>
        {/*TODO REMOVE AND ADD IT IN THE USER MENU*/}
        <Button
          size={"small"}
          variant="contained"
          sx={{ height: "25px" }}
          onClick={handleSignOut}
        >
          Sign Out
        </Button>
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ padding: 0 }}>
            <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
          </IconButton>
        </Tooltip>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {settings.map((setting) => (
            <MenuItem key={setting} onClick={handleCloseUserMenu}>
              {setting}
            </MenuItem>
          ))}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default TopNav;
