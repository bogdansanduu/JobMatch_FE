import React, { useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { useAppSelector } from "../../store/hooks";
import { getUsers } from "../../store/slices/UserSlice";

import UserRow from "./usersTableComponents/UserRow";
import BanUserModal from "../modal/BanUserModal";
import BannedUserRow from "./usersTableComponents/BannedUserRow";
import UnbanUserModal from "../modal/UnbanUserModal";

interface UserTableProps {
  bannedUsers: boolean;
}

const UsersTable = ({ bannedUsers }: UserTableProps) => {
  const allUsers = useAppSelector(getUsers);

  const [openBanModal, setOpenBanModal] = useState(false);
  const [openUnbanModal, setOpenUnbanModal] = useState(false);

  return (
    <>
      <TableContainer component={Paper} sx={{ flex: 3 }}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Role</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!bannedUsers &&
              allUsers.map((user) => (
                <UserRow
                  user={user}
                  key={user.id}
                  setOpenBanModal={setOpenBanModal}
                />
              ))}
            {bannedUsers &&
              allUsers.map((user) => (
                <BannedUserRow
                  user={user}
                  key={user.id}
                  setOpenUnbanModal={setOpenUnbanModal}
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <BanUserModal open={openBanModal} setOpen={setOpenBanModal} />
      <UnbanUserModal open={openUnbanModal} setOpen={setOpenUnbanModal} />
    </>
  );
};

export default UsersTable;
