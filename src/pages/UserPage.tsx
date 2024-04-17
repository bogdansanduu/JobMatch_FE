import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";

import userBanner from "../assets/user_banner.jpg";

import { getCurrentUser, getUserById } from "../store/slices/UserSlice";
import { White } from "../utils/constants/colorPallete";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getLoggedUser, setUser } from "../store/slices/AuthSlice";
import AppApi from "../server/api/AppApi";
import { LoadingContainer, SpinnerContainer } from "../router/styledComponents";
import CircularProgress from "@mui/material/CircularProgress";

interface UserPageProps {}

const UserPage = () => {
  const userApi = AppApi.getUserApi();

  const currentUser = useAppSelector(getLoggedUser);
  const user = useAppSelector(getCurrentUser);
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);

  const { userId } = useParams();
  const isFollowing = !!(
    currentUser &&
    currentUser.following.find((followingUser) => {
      return followingUser.id === user.id;
    })
  );

  useEffect(() => {
    (async () => {
      setLoading(true);

      const currentUserId = Number(userId);

      if (!currentUserId) {
        return;
      }

      await dispatch(getUserById(currentUserId));

      setLoading(false);
    })();
  }, [userId]);

  const handleAddConnection = async () => {
    if (!currentUser) {
      return;
    }

    const updateCurrentUser = await userApi.addContact(currentUser.id, user.id);
    dispatch(setUser(updateCurrentUser));

    // dispatch(addConnection({ userId: currentUser.id, contactId: user.id }));
  };

  const handleRemoveConnection = async () => {
    if (!currentUser) {
      return;
    }

    const updateCurrentUser = await userApi.removeContact(
      currentUser.id,
      user.id
    );
    dispatch(setUser(updateCurrentUser));
  };

  if (loading)
    return (
      <LoadingContainer>
        <SpinnerContainer>
          <CircularProgress size={60} />
        </SpinnerContainer>
      </LoadingContainer>
    );

  return (
    <Box
      sx={{
        margin: "8px",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
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
        state
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
      </Card>

      <Box
        sx={{
          display: "flex",
          height: "inherit",
          flexDirection: "column",
          backgroundColor: White.PureWhite,
          borderRadius: "8px",
          minHeight: "100px",
        }}
      >
        About
      </Box>
    </Box>
  );
};

export default UserPage;
