import React from "react";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import { Divider, Typography } from "@mui/material";
import ListItemIcon from "@mui/material/ListItemIcon";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { AppRoutes } from "../../utils/constants/routes";
import { getLoggedUser, logout } from "../../store/slices/AuthSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useNavigate } from "react-router";

interface UserSettingsProps {
  setAnchorElUser: (event: HTMLElement | null) => void;
}

const UserSettings = ({ setAnchorElUser }: UserSettingsProps) => {
  const currentUser = useAppSelector(getLoggedUser);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const alreadyHasCompanyAccount = !!currentUser?.company;

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleCreateJobAccount = () => {
    setAnchorElUser(null);

    navigate(AppRoutes.CreateCompanyAccount);
  };

  const handleOpenProfile = () => {
    setAnchorElUser(null);

    navigate(AppRoutes.MyProfile);
  };

  const handleSignOut = () => {
    localStorage.clear();
    dispatch(logout());

    navigate(AppRoutes.Login);
  };

  return (
    <>
      <MenuItem onClick={handleOpenProfile}>
        <Avatar src={currentUser?.profilePicture} />
        <Typography variant="body2" color={"text.secondary"}>
          {`${currentUser?.firstName} ${currentUser?.lastName}`}
        </Typography>
      </MenuItem>
      <Divider sx={{ my: 0.5 }} />
      {!alreadyHasCompanyAccount && (
        <MenuItem onClick={handleCreateJobAccount}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          <Typography variant="body2" color={"text.secondary"}>
            Create Company Account
          </Typography>
        </MenuItem>
      )}
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
    </>
  );
};

export default UserSettings;
