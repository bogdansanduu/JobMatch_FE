import React from "react";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";

import { White } from "../../utils/constants/colorPallete";
import userBanner from "../../assets/user_banner.jpg";

import {
  addConnection,
  getCurrentUser,
  removeConnection,
} from "../../store/slices/UserSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  getLoggedUser,
  refreshCurrentUserData,
} from "../../store/slices/AuthSlice";
import { Roles } from "../../utils/constants/roles";

const UserPageHeader = () => {
  const currentUser = useAppSelector(getLoggedUser);
  const user = useAppSelector(getCurrentUser);
  const dispatch = useAppDispatch();

  const isFollowing = !!(
    currentUser &&
    user.followers.find((followerUser) => {
      return followerUser.id === currentUser.id;
    })
  );

  const handleAddConnection = async () => {
    if (!currentUser) {
      return;
    }

    await dispatch(
      addConnection({ userId: currentUser.id, contactId: user.id })
    );
    await dispatch(refreshCurrentUserData());
  };

  const handleRemoveConnection = async () => {
    if (!currentUser) {
      return;
    }

    await dispatch(
      removeConnection({ userId: currentUser.id, contactId: user.id })
    );
    await dispatch(refreshCurrentUserData());
  };

  return (
    <Card
      sx={{
        display: "flex",
        height: "inherit",
        flexDirection: "column",
        backgroundColor: White.PureWhite,
        borderRadius: "8px",
        minHeight: "100px",
      }}
    >
      <CardMedia
        component={"img"}
        alt={"user banner"}
        height={"150"}
        image={userBanner}
      />
      <CardHeader
        title={`${user.firstName} ${user.lastName}`}
        subheader={"POSITION"}
        avatar={<Avatar src={user.profilePicture} />}
      />
      <CardContent>
        <Typography variant={"body2"} color={"text.secondary"} gutterBottom>
          {`${user.country}, ${user.city}, ${user.state}`}
        </Typography>
        <Typography variant={"body2"} color={"text.info"} gutterBottom>
          {`${user.followers.length} connections`}
        </Typography>
      </CardContent>
      {currentUser?.role !== Roles.ADMIN && (
        <CardActions sx={{ marginLeft: "auto" }}>
          {isFollowing ? (
            <Button
              variant={"outlined"}
              size="small"
              color="error"
              onClick={handleRemoveConnection}
            >
              Unfollow
            </Button>
          ) : (
            <Button
              variant={"contained"}
              size="small"
              onClick={handleAddConnection}
            >
              Add Connection
            </Button>
          )}

          <Button variant={"contained"} size="small">
            Message
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

export default UserPageHeader;
