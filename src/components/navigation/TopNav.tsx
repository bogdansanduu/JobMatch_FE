import React, { useState } from "react";
import { useNavigate } from "react-router";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import HomeIcon from "@mui/icons-material/Home";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import WorkIcon from "@mui/icons-material/Work";
import ForumIcon from "@mui/icons-material/Forum";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import { AppBar } from "@mui/material";
import BadgeIcon from "@mui/icons-material/Badge";

import { useAppDispatch, useAppSelector } from "../../store/hooks";

import logo from "../../assets/linkedLogo.png";
import { GrayColors, White } from "../../utils/constants/colorPallete";
import { AppRoutes } from "../../utils/constants/routes";

import { BodyText4 } from "../typography/BodyTexts";
import { getLoggedCompany, getLoggedUser } from "../../store/slices/AuthSlice";
import SearchPopover from "../popover/SearchPopover";
import UserSettings from "./UserSettings";
import CompanySettings from "./CompanySettings";

const pagesUser = [
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
    title: "My Applications",
    icon: <WorkHistoryIcon sx={{ height: "22px", width: "22px" }} />,
    route: AppRoutes.MyApplications,
  },
  {
    title: "Messages",
    icon: <ForumIcon sx={{ height: "22px", width: "22px" }} />,
    route: AppRoutes.Messaging,
  },
];

const pagesCompany = [
  {
    title: "Home Page",
    icon: <HomeIcon sx={{ height: "22px", width: "22px" }} />,
    route: AppRoutes.HomeCompany,
  },
  {
    title: "Job Postings",
    icon: <WorkIcon sx={{ height: "22px", width: "22px" }} />,
    route: AppRoutes.JobPostings,
  },
  {
    title: "Employees",
    icon: <BadgeIcon sx={{ height: "22px", width: "22px" }} />,
    route: AppRoutes.Employees,
  },
  {
    title: "Messages",
    icon: <ForumIcon sx={{ height: "22px", width: "22px" }} />,
    route: AppRoutes.Employees,
  },
];

const TopNav = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const currentUser = useAppSelector(getLoggedUser);
  const currentCompany = useAppSelector(getLoggedCompany);

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorElUser);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleClick = (route: string) => {
    navigate(route);
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
        <SearchPopover />
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: "flex" }}>
          {currentUser &&
            pagesUser.map(({ title, icon, route }) => (
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
          {currentCompany &&
            pagesCompany.map(({ title, icon, route }) => (
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
          {currentUser && <UserSettings setAnchorElUser={setAnchorElUser} />}
          {currentCompany && (
            <CompanySettings setAnchorElUser={setAnchorElUser} />
          )}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default TopNav;
