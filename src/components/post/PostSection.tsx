import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import { GrayColors, White } from "../../utils/constants/colorPallete";
import banner from "../../assets/banner.png";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getLoggedUser } from "../../store/slices/AuthSlice";
import { getAllPosts, getPosts } from "../../store/slices/PostSlice";

import PostModal from "../modal/PostModal";
import Post from "./Post";

const PostSection = () => {
  const currentUser = useAppSelector(getLoggedUser);
  const allPosts = useAppSelector(getPosts);

  const dispatch = useAppDispatch();

  const [openPostModal, setOpenPostModal] = useState(false);

  const handleOpenPostModal = () => {
    setOpenPostModal(true);
  };

  useEffect(() => {
    dispatch(getAllPosts());
  }, []);

  return (
    <>
      <Box
        sx={{
          flex: 5,
          display: "flex",
          gap: "12px",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            padding: "16px",
            borderRadius: "8px",
            backgroundColor: White.PureWhite,
            border: `1px solid ${GrayColors.Gray2}`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
          }}
        >
          {currentUser && currentUser.profilePicture && (
            <Typography
              sx={{ marginRight: "8px", alignSelf: "flex-start" }}
              variant="h6"
              color={"text.primary"}
            >
              Hello, {currentUser.firstName} {currentUser.lastName}, start
              exploring your feed!
            </Typography>
          )}
          {currentUser && currentUser.profilePicture && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                border: `1px solid ${GrayColors.Gray2}`,
                borderRadius: "8px",
              }}
            >
              <img
                src={banner}
                alt="Banner"
                style={{ borderRadius: "8px 8px 0 0" }}
              />

              <Box sx={{ padding: "16px" }}>
                <Typography
                  variant="body2"
                  color={"text.secondary"}
                  sx={{ marginBottom: "12px" }}
                >
                  Welcome to JobMatch, the ultimate platform to find your next
                  career opportunity. Explore job listings, connect with
                  employers, and grow your professional network.
                </Typography>
                <Typography
                  variant="body2"
                  color={"text.secondary"}
                  sx={{ marginBottom: "12px" }}
                >
                  Ready to share your thoughts? Start a new post and engage with
                  your community.
                </Typography>
                <Button
                  onClick={handleOpenPostModal}
                  variant={"contained"}
                  endIcon={<AddCircleOutlineIcon />}
                  sx={{ marginTop: "8px" }}
                >
                  Start a new Post
                </Button>
              </Box>
            </Box>
          )}
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          {Array.isArray(allPosts) &&
            allPosts.map((post) => <Post key={post.id} post={post} isUser />)}
        </Box>
      </Box>
      <PostModal
        openPostModal={openPostModal}
        setOpenPostModal={setOpenPostModal}
        isUser
      />
    </>
  );
};

export default PostSection;
