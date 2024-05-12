import React, { useEffect, useState } from "react";
import { Avatar, Box, Divider, Typography } from "@mui/material";
import { GrayColors, White } from "../../utils/constants/colorPallete";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Post from "./Post";
import PostModal from "../modal/PostModal";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getLoggedCompany } from "../../store/slices/AuthSlice";
import { getAllPosts, getPosts } from "../../store/slices/PostSlice";

const PostSectionCompany = () => {
  const currentCompany = useAppSelector(getLoggedCompany);
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
          {currentCompany && currentCompany.profilePicture && (
            <Box sx={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <Avatar
                alt={`${currentCompany.name}`}
                src={currentCompany.profilePicture}
                sx={{ width: 30, height: 30 }}
              />
              <Typography
                style={{ marginRight: "8px" }}
                variant="subtitle2"
                color={"text.primary"}
              >
                Hello, {currentCompany.name}, start exploring your feed!
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
            allPosts.map((post) => (
              <Post key={post.id} post={post} isCompany />
            ))}
        </Box>
      </Box>
      <PostModal
        openPostModal={openPostModal}
        setOpenPostModal={setOpenPostModal}
        isCompany
      />
    </>
  );
};

export default PostSectionCompany;
