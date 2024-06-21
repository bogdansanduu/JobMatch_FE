import React, { useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  getLoggedUser,
  refreshCurrentUserData,
} from "../../store/slices/AuthSlice";

import { White } from "../../utils/constants/colorPallete";
import userBanner from "../../assets/user_banner.jpg";
const MyAccountSection = () => {
  const currentUser = useAppSelector(getLoggedUser);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(refreshCurrentUserData());
  }, []);

  return (
    <Box
      sx={{
        flex: 1.5,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "0px 16px 16px 16px",
          backgroundColor: White.PureWhite,
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <CardMedia
          component={"img"}
          alt={"user banner"}
          height={"60"}
          image={userBanner}
          sx={{
            position: "absolute",
          }}
        />
        <Avatar
          src={currentUser?.profilePicture}
          alt={currentUser?.firstName}
          sx={{
            width: 60,
            height: 60,
            marginBottom: "16px",
            marginTop: "30px",
          }}
        />
        <Typography variant="h6">{`${currentUser?.firstName} ${currentUser?.lastName}`}</Typography>
        <Typography variant="subtitle2" color="text.secondary">
          {currentUser?.currentPosition || "No position"}
        </Typography>
        <CardContent
          sx={{
            width: "100%",
            textAlign: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "8px",
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Following
            </Typography>
            <Typography variant="body2" color="primary">
              {currentUser?.following.length || 0}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "8px",
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Followers
            </Typography>
            <Typography variant="body2" color="primary">
              {currentUser?.followers.length || 0}
            </Typography>
          </Box>
        </CardContent>
        <CardActions
          sx={{
            width: "100%",
            justifyContent: "center",
          }}
        >
          <Button variant="contained" size="small">
            Edit Profile
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default MyAccountSection;
