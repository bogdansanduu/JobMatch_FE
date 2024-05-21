import React from "react";
import { Avatar, Card, CardHeader } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";

import { UserType } from "../../store/slices/UserSlice";

import { GrayColors, White } from "../../utils/constants/colorPallete";

interface UsersSearchListProps {
  searchResultsUsers: UserType[];
  handleNavigate: (user: UserType) => void;
}

const UsersSearchList = ({
  searchResultsUsers,
  handleNavigate,
}: UsersSearchListProps) => {
  const handleAddUser = (user: UserType) => {
    console.log(`Selected user: ${user.firstName} ${user.lastName}`);
  };

  return (
    <>
      {searchResultsUsers.map((user) => (
        <Card
          key={user.id}
          sx={{
            marginBottom: "6px",
            backgroundColor: White.OffWhite,
            border: `1px solid ${GrayColors.Gray2}`,
          }}
        >
          <CardHeader
            avatar={
              <Avatar
                alt={`${user.firstName} ${user.lastName}`}
                src={user.profilePicture}
                sx={{ width: 30, height: 30 }}
              />
            }
            title={`${user.firstName} ${user.lastName}`}
            action={
              <IconButton
                aria-label="add-user"
                onClick={() => handleAddUser(user)}
              >
                <PersonAddAlt1Icon />
              </IconButton>
            }
            onClick={() => handleNavigate(user)}
            sx={{ padding: "4px" }}
          />
        </Card>
      ))}
    </>
  );
};

export default UsersSearchList;
