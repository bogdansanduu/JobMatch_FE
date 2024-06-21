import React from "react";
import { Avatar, TableCell, TableRow, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";

import { setCurrentUser, UserType } from "../../../store/slices/UserSlice";
import { useAppDispatch } from "../../../store/hooks";
interface BannedUserRowProps {
  user: UserType;
  setOpenUnbanModal: (value: boolean) => void;
}

const BannedUserRow = ({ user, setOpenUnbanModal }: BannedUserRowProps) => {
  const dispatch = useAppDispatch();

  const handleUnbanClick = async () => {
    await dispatch(setCurrentUser(user));

    setOpenUnbanModal(true);
  };

  return (
    <TableRow
      sx={{
        backgroundColor: "rgba(128,128,128,0.05)",
      }}
    >
      <TableCell
        sx={{
          display: "flex",
          gap: "8px",
          alignItems: "center",
        }}
      >
        <Avatar
          src={user.profilePicture}
          alt={user.firstName}
          sx={{
            width: 35,
            height: 35,
            filter: "grayscale(100%)",
          }}
        />
        <Typography variant="body2" sx={{ color: "gray" }}>
          {`${user.firstName} ${user.lastName}`}
        </Typography>
      </TableCell>
      <TableCell align="center">
        <Typography variant="body2" sx={{ color: "gray" }}>
          {user.email}
        </Typography>
      </TableCell>
      <TableCell align="center">
        <Typography variant="body2" sx={{ color: "gray" }}>
          {user.role}
        </Typography>
      </TableCell>
      <TableCell align="right">
        <IconButton size="small" onClick={handleUnbanClick}>
          <LockOpenOutlinedIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default BannedUserRow;
