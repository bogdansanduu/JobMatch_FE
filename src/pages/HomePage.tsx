import React, { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { Avatar, Box, Button, Divider, Typography } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DOMPurify from "dompurify";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import AddCommentOutlinedIcon from "@mui/icons-material/AddCommentOutlined";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  getAllPosts,
  getPosts,
  likePost,
  PostType,
  unlikePost,
} from "../store/slices/PostSlice";
import { getLoggedUser } from "../store/slices/AuthSlice";

import { GrayColors, White } from "../utils/constants/colorPallete";

import PostModal from "../components/modal/PostModal";

const HomePage = () => {
  const currentUser = useAppSelector(getLoggedUser);
  const allPosts = useAppSelector(getPosts);

  const dispatch = useAppDispatch();

  const [openPostModal, setOpenPostModal] = useState(false);

  useEffect(() => {
    dispatch(getAllPosts());
  }, []);

  const createMarkup = (htmlContent: string) => {
    return { __html: DOMPurify.sanitize(htmlContent) };
  };

  const handleOpenPostModal = () => {
    setOpenPostModal(true);
  };

  const handleLikePost = (post: PostType) => {
    if (!currentUser) {
      return;
    }

    dispatch(likePost({ postId: post.id, userId: currentUser.id }));
  };

  const handleUnlikePost = (post: PostType) => {
    if (!currentUser) {
      return;
    }

    dispatch(unlikePost({ postId: post.id, userId: currentUser.id }));
  };

  return (
    <>
      <Box sx={{ display: "flex", margin: "12px", gap: "12px" }}>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",

            height: "100%",
            padding: "16px",
            borderRadius: "8px",
            backgroundColor: White.PureWhite,
            border: `1px solid ${GrayColors.Gray2}`,
          }}
        >
          My Account
        </Box>
        <Box
          sx={{
            flex: 4,
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
              <Box sx={{ display: "flex", gap: "8px", alignItems: "center" }}>
                <Avatar
                  alt={`${currentUser.firstName} ${currentUser.lastName}`}
                  src={currentUser.profilePicture}
                  sx={{ width: 30, height: 30 }}
                />
                <Typography
                  style={{ marginRight: "8px" }}
                  variant="subtitle2"
                  color={"text.primary"}
                >
                  Hello, {currentUser.firstName} {currentUser.lastName}, start
                  exploring your feed!
                </Typography>
              </Box>
            )}
            <Divider flexItem />

            <Box sx={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <Typography variant="body2" color={"text.secondary"}>
                Start a new Post
              </Typography>
              <Tooltip title="Add new post">
                <IconButton onClick={handleOpenPostModal} color="primary">
                  <AddCircleOutlineIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            {allPosts.map((post) => {
              const alreadyLiked = !!post.likes.find(
                (like) => like.author.id === currentUser?.id
              );

              const likesCount = post.likes.length;
              const commentsCount = post.comments.length;

              return (
                <Box
                  key={post.id}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",

                    padding: "16px",
                    borderRadius: "8px",
                    backgroundColor: White.PureWhite,
                    border: `1px solid ${GrayColors.Gray2}`,
                  }}
                >
                  <Typography variant="h5" component="h2">
                    {post.title}
                  </Typography>
                  <div dangerouslySetInnerHTML={createMarkup(post.content)} />
                  <Divider />
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                    }}
                  >
                    <Box
                      sx={{ display: "flex", gap: "4px", marginRight: "auto" }}
                    >
                      <Typography variant="body2" color={"text.secondary"}>
                        Likes: {likesCount}
                      </Typography>
                      <Typography variant="body2" color={"text.secondary"}>
                        Comments: {commentsCount}
                      </Typography>
                    </Box>
                    {alreadyLiked ? (
                      <Button
                        startIcon={<ThumbUpIcon />}
                        onClick={() => handleUnlikePost(post)}
                      >
                        Dislike
                      </Button>
                    ) : (
                      <Button
                        startIcon={<ThumbUpOutlinedIcon />}
                        onClick={() => handleLikePost(post)}
                      >
                        Like
                      </Button>
                    )}
                    <Button startIcon={<AddCommentOutlinedIcon />}>
                      Comment
                    </Button>
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>
        <Box
          sx={{
            flex: 2,

            height: "100%",
            padding: "16px",
            borderRadius: "8px",
            backgroundColor: White.PureWhite,
            border: `1px solid ${GrayColors.Gray2}`,
          }}
        >
          Recommendations
        </Box>
      </Box>
      <PostModal
        openPostModal={openPostModal}
        setOpenPostModal={setOpenPostModal}
      />
    </>
  );
};

export default HomePage;
