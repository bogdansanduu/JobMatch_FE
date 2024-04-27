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
import Logout from "@mui/icons-material/Logout";
import Settings from "@mui/icons-material/Settings";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ListItemIcon from "@mui/material/ListItemIcon";
import PersonAdd from "@mui/icons-material/PersonAdd";
import { AppBar, Divider, Typography } from "@mui/material";

import { useAppDispatch, useAppSelector } from "../../store/hooks";

import logo from "../../assets/linkedLogo.png";
import { GrayColors, White } from "../../utils/constants/colorPallete";
import { AppRoutes } from "../../utils/constants/routes";

import { BodyText4 } from "../typography/BodyTexts";
import { getLoggedUser, logout } from "../../store/slices/AuthSlice";
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

const TopNav = () => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorElUser);

  const currentUser = useAppSelector(getLoggedUser);

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

  const handleCreateJobAccount = () => {
    setAnchorElUser(null);

    navigate(AppRoutes.CreateCompanyAccount);
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
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleOpenUserMenu}
            size="small"
            sx={{ ml: 2, mr: 1 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar
              sx={{ width: 35, height: 35 }}
              src={currentUser?.profilePicture}
            />
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorElUser}
          id="account-menu"
          open={open}
          onClose={handleCloseUserMenu}
          onClick={handleCloseUserMenu}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: White.PureWhite,
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem onClick={handleCloseUserMenu}>
            <Avatar src={currentUser?.profilePicture} />
            <Typography variant="body2" color={"text.secondary"}>
              {`${currentUser?.firstName} ${currentUser?.lastName}`}
            </Typography>
          </MenuItem>
          <Divider sx={{ my: 0.5 }} />
          <MenuItem onClick={handleCreateJobAccount}>
            <ListItemIcon>
              <PersonAdd fontSize="small" />
            </ListItemIcon>
            <Typography variant="body2" color={"text.secondary"}>
              Create Company Account
            </Typography>
          </MenuItem>
          <MenuItem onClick={handleCloseUserMenu}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            <Typography variant="body2" color={"text.secondary"}>
              Settings
            </Typography>
          </MenuItem>
          <MenuItem onClick={handleSignOut}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            <Typography variant="body2" color={"text.secondary"}>
              Sign Out
            </Typography>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default TopNav;
