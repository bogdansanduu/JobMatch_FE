import React from "react";
import { Box, Divider, Typography } from "@mui/material";

import { White } from "../../utils/constants/colorPallete";

import { useAppSelector } from "../../store/hooks";
import { getPosts } from "../../store/slices/PostSlice";

import Post from "../post/Post";
import { Roles } from "../../utils/constants/roles";
import { getLoggedUser } from "../../store/slices/AuthSlice";

const CompanyPageDetails = () => {
  const currentUser = useAppSelector(getLoggedUser);
  const companyPosts = useAppSelector(getPosts);

  return (
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
        <Typography variant="h6">All Company Posts:</Typography>
      ) : (
        <Typography variant="h6">Most Recent Posts:</Typography>
      )}
      <Divider />
      {Array.isArray(companyPosts) && companyPosts.length > 0 ? (
        companyPosts.map((post) => (
          <Post
            key={post.id}
            post={post}
            isCompany
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
  );
};

export default CompanyPageDetails;
