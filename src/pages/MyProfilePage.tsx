import React, { useState } from "react";
import { useAppSelector } from "../store/hooks";
import { getLoggedUser } from "../store/slices/AuthSlice";
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
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import IconButton from "@mui/material/IconButton";

import { White } from "../utils/constants/colorPallete";
import userBanner from "../assets/user_banner.jpg";

const MyProfilePage = () => {
  const currentUser = useAppSelector(getLoggedUser);

  const [expanded, setExpanded] = useState(false);
  // Determine the number of characters to show in the preview
  const previewLength = 100;
  const resumePreview = currentUser?.resume?.substring(0, previewLength);
  const showEllipsis =
    currentUser?.resume && currentUser?.resume.length > previewLength;
  const hasResume = !!currentUser?.resume && currentUser?.resume.length > 0;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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

          boxShadow: "none",
        }}
        variant={"outlined"}
      >
        <CardMedia
          component={"img"}
          alt={"user banner"}
          height={"150"}
          image={userBanner}
        />
        <CardHeader
          title={`${currentUser?.firstName} ${currentUser?.lastName}`}
          subheader={"POSITION"}
          avatar={<Avatar src={currentUser?.profilePicture} />}
        />
        <CardContent>
          <Typography variant={"body2"} color={"text.secondary"} gutterBottom>
            {`${currentUser?.country}, ${currentUser?.city}, ${currentUser?.state}`}
          </Typography>
          <Typography variant={"body2"} color={"text.info"} gutterBottom>
            {`${currentUser?.followers.length} connections`}
          </Typography>
          <Typography>{currentUser?.email}</Typography>
        </CardContent>
        <CardActions sx={{ marginLeft: "auto" }}>
          <Button variant={"contained"} size="small">
            Edit Profile
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
            {!expanded && (
              <Typography variant="body1" paragraph>
                {`${resumePreview}${showEllipsis ? "..." : ""}`}
              </Typography>
            )}
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <Typography paragraph>{currentUser?.resume}</Typography>
            </Collapse>
          </>
        ) : (
          <Typography variant="body1">No resume available</Typography>
        )}
      </Box>
    </Box>
  );
};

export default MyProfilePage;
