import * as React from "react";
import { useNavigate } from "react-router";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import WorkIcon from "@mui/icons-material/Work";
import ForumIcon from "@mui/icons-material/Forum";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { AppBar, InputAdornment, TextField } from "@mui/material";
import Button from "@mui/material/Button";

import { useAppDispatch } from "../../store/hooks";

import logo from "../../assets/linkedLogo.png";
import { Blue, GrayColors, White } from "../../utils/constants/colorPallete";
import { AppRoutes } from "../../utils/constants/routes";

import { BodyText4 } from "../typography/BodyTexts";
import { logout } from "../../store/slices/AuthSlice";

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

const SidebarNav = () => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

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
          }}
        />
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

export default SidebarNav;
