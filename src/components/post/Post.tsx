import React, { useState } from "react";
import { Box, Button, Collapse, Divider, Typography } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import AddCommentOutlinedIcon from "@mui/icons-material/AddCommentOutlined";
import DOMPurify from "dompurify";

import { Blue, GrayColors, White } from "../../utils/constants/colorPallete";

import {
  commentPost,
  likePost,
  PostType,
  unlikePost,
} from "../../store/slices/PostSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getLoggedUser } from "../../store/slices/AuthSlice";
import { StyledInputElement } from "../messaging/styledComponents";
import IconButton from "@mui/material/IconButton";
import Comment from "./Comment";

interface PostProps {
  post: PostType;
}
const Post = ({ post }: PostProps) => {
  const currentUser = useAppSelector(getLoggedUser);

  const dispatch = useAppDispatch();

  const [expanded, setExapnded] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const alreadyLiked = !!post.likes.find(
    (like) => like.author.id === currentUser?.id
  );

  const likesCount = post.likes.length;
  const commentsCount = post.comments.length;

  const createMarkup = (htmlContent: string) => {
    return { __html: DOMPurify.sanitize(htmlContent) };
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

  const handleCommentExpand = () => {
    setExapnded((prevState) => !prevState);
    setInputValue("");
  };

  const handleCreateComment = () => {
    if (!currentUser || !inputValue) {
      return;
    }

    dispatch(
      commentPost({
        postId: post.id,
        userId: currentUser.id,
        commentData: {
          content: inputValue,
        },
      })
    );
  };

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
        <Box sx={{ display: "flex", gap: "4px", marginRight: "auto" }}>
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
        <Button
          startIcon={<AddCommentOutlinedIcon />}
          onClick={handleCommentExpand}
        >
          Comment
        </Button>
      </Box>
      <Collapse in={expanded} timeout="auto">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <Divider flexItem />
          {post.comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
          <Divider flexItem />
          <StyledInputElement
            sx={{
              border: `1px solid ${GrayColors.Gray5}`,
              borderRadius: "6px",
              padding: "8px",
              maxHeight: "500px",
            }}
            multiline
            disableUnderline
            endAdornment={
              <IconButton
                disableRipple
                sx={{ padding: "0 8px 0 0" }}
                onClick={handleCreateComment}
              >
                <AddCommentOutlinedIcon
                  sx={{
                    color: GrayColors.Gray4,
                    "&:hover": {
                      color: Blue.PrimaryBlue,
                    },
                  }}
                />
              </IconButton>
            }
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleCreateComment();
                setInputValue("");
                event.preventDefault();
              }
            }}
            placeholder={"Type comment"}
          />
        </Box>
      </Collapse>
    </Box>
  );
};

export default Post;
