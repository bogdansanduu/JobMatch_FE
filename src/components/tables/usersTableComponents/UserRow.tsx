import React from "react";
import { Avatar, TableCell, TableRow, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { setCurrentUser, UserType } from "../../../store/slices/UserSlice";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useAppDispatch } from "../../../store/hooks";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../../utils/constants/routes";

interface UserRowProps {
  user: UserType;
  setOpenBanModal: (value: boolean) => void;
}
const UserRow = ({ user, setOpenBanModal }: UserRowProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleBanClick = async () => {
    await dispatch(setCurrentUser(user));

    setOpenBanModal(true);
  };

  const handleClickUser = async () => {
    await dispatch(setCurrentUser(user));
    navigate(`${AppRoutes.AdminUserProfile}/${user.id}`);
  };

  return (
    <TableRow>
      <TableCell
        sx={{
          display: "flex",
          gap: "8px",
          alignItems: "center",
          cursor: "pointer",
        }}
        onClick={handleClickUser}
      >
        <Avatar
          src={user.profilePicture}
          alt={user.firstName}
          sx={{
            width: 35,
            height: 35,
          }}
        />
        <Typography variant="body2">
          {`${user.firstName} ${user.lastName}`}
        </Typography>
      </TableCell>
      <TableCell align="center">
        <Typography variant="body2">{user.email}</Typography>
      </TableCell>
      <TableCell align="center">
        <Typography variant="body2">{user.role}</Typography>
      </TableCell>
      <TableCell align="right">
        <IconButton size="small" onClick={handleBanClick}>
          <LockOutlinedIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default UserRow;
