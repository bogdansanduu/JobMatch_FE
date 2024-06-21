import React, { useState } from "react";
import { useNavigate } from "react-router";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import { AppBar, Typography, useMediaQuery } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import { useAppDispatch, useAppSelector } from "../../store/hooks";

import logo from "../../assets/jobMatchLogo.png";
import { GrayColors, White } from "../../utils/constants/colorPallete";
import { AppRoutes } from "../../utils/constants/routes";
import { adminPages, pagesCompany, pagesUser } from "./constants";

import { BodyText4 } from "../typography/BodyTexts";
import { getLoggedCompany, getLoggedUser } from "../../store/slices/AuthSlice";
import SearchPopover from "../popover/SearchPopover";
import UserSettings from "./UserSettings";
import CompanySettings from "./CompanySettings";
import { Roles } from "../../utils/constants/roles";
import DrawerNav from "./DrawerNav";

const TopNav = () => {
  const currentUser = useAppSelector(getLoggedUser);
  const currentCompany = useAppSelector(getLoggedCompany);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [openDrawer, setOpenDrawer] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorElUser);

  const isLaptop = useMediaQuery("(min-width: 1024px)");
  const isTablet = useMediaQuery("(max-width: 768px)");

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleLogoClick = () => {
    if (currentUser) {
      if (currentUser.role === Roles.ADMIN) {
        navigate(AppRoutes.HomeAdmin);
        return;
      }

      navigate(AppRoutes.Home);
      return;
    }
    if (currentCompany) {
      navigate(AppRoutes.HomeCompany);
      return;
    }
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
        <Box
          sx={{
            padding: "8px",
            display: "flex",
            gap: "12px",
            alignItems: "center",
            borderRadius: "8px",
            maxWidth: "fit-content",
          }}
        >
          {isTablet && (
            <IconButton
              sx={{
                color: GrayColors.Gray6,
                padding: "4px",
                "&:hover": {
                  color: GrayColors.Gray9,
                },
              }}
              onClick={() => setOpenDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          )}
          <img
            src={logo}
            alt="JobMatch"
            style={{
              height: "80px",
              width: "80px",
              borderRadius: "8px",
              objectFit: "cover",
              cursor: "pointer",
            }}
            onClick={handleLogoClick}
          />
          {isLaptop && (
            <Typography
              variant="h5"
              color="textPrimary"
              sx={{ fontWeight: "bold" }}
            >
              JobMatch
            </Typography>
          )}
        </Box>
        {currentUser &&
          (currentUser.role === Roles.USER ||
            currentUser.role === Roles.COMPANY_OWNER) && <SearchPopover />}
        <Box sx={{ flexGrow: 1 }} />
        {!isTablet && (
          <Box sx={{ display: "flex" }}>
            {currentUser &&
              (currentUser.role === Roles.USER ||
                currentUser.role === Roles.COMPANY_OWNER) &&
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
            {currentUser &&
              currentUser.role === Roles.ADMIN &&
              adminPages.map(({ title, icon, route }) => (
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
        )}
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
              src={
                currentUser?.profilePicture || currentCompany?.profilePicture
              }
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
      <DrawerNav open={openDrawer} setOpen={setOpenDrawer} />
    </AppBar>
  );
};

export default TopNav;
