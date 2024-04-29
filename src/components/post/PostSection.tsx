import React, { useEffect, useState } from "react";
import { Avatar, Box, Divider, Typography } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

import { GrayColors, White } from "../../utils/constants/colorPallete";

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
          {Array.isArray(allPosts) &&
            allPosts.map((post) => <Post key={post.id} post={post} />)}
        </Box>
      </Box>
      <PostModal
        openPostModal={openPostModal}
        setOpenPostModal={setOpenPostModal}
      />
    </>
  );
};

export default PostSection;
