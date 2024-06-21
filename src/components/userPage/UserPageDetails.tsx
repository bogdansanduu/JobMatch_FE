import React, { useState } from "react";
import { Box, Collapse, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { White } from "../../utils/constants/colorPallete";

import { useAppSelector } from "../../store/hooks";
import { getCurrentUser } from "../../store/slices/UserSlice";
import { getPosts } from "../../store/slices/PostSlice";
import { getLoggedUser } from "../../store/slices/AuthSlice";

import Post from "../post/Post";
import { Roles } from "../../utils/constants/roles";

const UserPageDetails = () => {
  const currentUser = useAppSelector(getLoggedUser);
  const user = useAppSelector(getCurrentUser);
  const userPosts = useAppSelector(getPosts);

  const [expanded, setExpanded] = useState(false);

  // Determine the number of characters to show in the preview
  const previewLength = 100;
  const resumePreview = user.resume && user.resume.substring(0, previewLength);
  const showEllipsis = user.resume && user.resume.length > previewLength;
  const hasResume = !!user.resume && user.resume.length > 0;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",

          backgroundColor: White.PureWhite,
          borderRadius: "8px",
          padding: "20px",
        }}
      >
        {currentUser?.role === Roles.ADMIN ? (
          <Typography variant="h6">All User Posts:</Typography>
        ) : (
          <Typography variant="h6">Most Recent Posts:</Typography>
        )}

        {Array.isArray(userPosts) && userPosts.length > 0 ? (
          userPosts.map((post) => (
            <Post
              key={post.id}
              post={post}
              isUser
              containerSx={{
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                "&:hover": {
                  boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                },
                transition: "box-shadow 0.3s",
              }}
            />
          ))
        ) : (
          <Typography variant="body1">No posts yet</Typography>
        )}
      </Box>
    </Box>
  );
};

export default UserPageDetails;
