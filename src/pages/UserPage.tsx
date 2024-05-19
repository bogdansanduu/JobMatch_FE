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
  Collapse,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import userBanner from "../assets/user_banner.jpg";
import { White } from "../utils/constants/colorPallete";

import {
  addConnection,
  getCurrentUser,
  getUserById,
  removeConnection,
} from "../store/slices/UserSlice";
import { getLoggedUser } from "../store/slices/AuthSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

import { LoadingContainer, SpinnerContainer } from "../router/styledComponents";

const UserPage = () => {
  const currentUser = useAppSelector(getLoggedUser);
  const user = useAppSelector(getCurrentUser);
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);

  // Determine the number of characters to show in the preview
  const previewLength = 100;
  const resumePreview = user.resume && user.resume.substring(0, previewLength);
  const showEllipsis = user.resume && user.resume.length > previewLength;
  const hasResume = !!user.resume && user.resume.length > 0;

  const { userId } = useParams();
  const isFollowing = !!(
    currentUser &&
    user.followers.find((followerUser) => {
      return followerUser.id === currentUser.id;
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

    dispatch(addConnection({ userId: currentUser.id, contactId: user.id }));
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleRemoveConnection = async () => {
    if (!currentUser) {
      return;
    }

    dispatch(removeConnection({ userId: currentUser.id, contactId: user.id }));
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
          flexDirection: "column",
          backgroundColor: White.PureWhite,
          borderRadius: "8px",
          minHeight: "100px",
          padding: "20px", // Adjust padding for aesthetic reasons
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)", // Optional shadow for depth
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h6">Resume:</Typography>
          {showEllipsis && (
            <IconButton
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
              sx={{ marginLeft: "auto" }}
            >
              {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          )}
        </Box>

        {hasResume ? (
          <>
            <Typography variant="body1" paragraph>
              {!expanded && `${resumePreview}${showEllipsis ? "..." : ""}`}
            </Typography>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <Typography paragraph>{user.resume}</Typography>
            </Collapse>
          </>
        ) : (
          <Typography variant="body1">No resume available</Typography>
        )}
      </Box>
    </Box>
  );
};

export default UserPage;
