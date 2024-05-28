import React from "react";
import MenuItem from "@mui/material/MenuItem";
import { Divider, Typography } from "@mui/material";
import ListItemIcon from "@mui/material/ListItemIcon";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { useNavigate } from "react-router";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getLoggedCompany, logout } from "../../store/slices/AuthSlice";
import { revertAll } from "../../store/actions";

import { AppRoutes } from "../../utils/constants/routes";

interface CompanySettingsProps {
  setAnchorElUser: (event: HTMLElement | null) => void;
}

const CompanySettings = ({ setAnchorElUser }: CompanySettingsProps) => {
  const company = useAppSelector(getLoggedCompany);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSignOut = async () => {
    localStorage.clear();
    await dispatch(logout());
    await dispatch(revertAll());

    navigate(AppRoutes.LoginCompany);
  };

  return (
    <>
      <MenuItem onClick={handleCloseUserMenu}>
        {/*<Avatar src={currentUser?.profilePicture} />*/}
        <Typography variant="body2" color={"text.secondary"}>
          {`${company?.name}`}
        </Typography>
      </MenuItem>
      <Divider sx={{ my: 0.5 }} />
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

export default CompanySettings;
