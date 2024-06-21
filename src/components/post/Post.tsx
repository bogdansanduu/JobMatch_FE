import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Collapse,
  Divider,
  SxProps,
  Typography,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import AddCommentOutlinedIcon from "@mui/icons-material/AddCommentOutlined";
import IconButton from "@mui/material/IconButton";
import DOMPurify from "dompurify";
import DeleteIcon from "@mui/icons-material/Delete";
import { formatDistanceToNow, parseISO } from "date-fns";

import { Blue, GrayColors, White } from "../../utils/constants/colorPallete";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getLoggedCompany, getLoggedUser } from "../../store/slices/AuthSlice";

import {
  commentPost,
  commentPostCompany,
  likePost,
  likePostCompany,
  PostType,
  removePost,
  unlikePost,
  unlikePostCompany,
} from "../../store/slices/PostSlice";

import { StyledInputElement } from "../messaging/styledComponents";
import Comment from "./Comment";
import { Roles } from "../../utils/constants/roles";

interface PostProps {
  post: PostType;
  isCompany?: boolean;
  isUser?: boolean;
  containerSx?: SxProps;
}

const Post = ({ post, isCompany, isUser, containerSx }: PostProps) => {
  const currentUser = useAppSelector(getLoggedUser);
  const currentCompany = useAppSelector(getLoggedCompany);

  const dispatch = useAppDispatch();

  const [expanded, setExpanded] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const alreadyLiked = !!post.likes.find(
    (like) =>
      (currentUser && like.author?.id === currentUser.id) ||
      (currentCompany && like.company?.id === currentCompany.id)
  );

  const likesCount = post.likes.length;
  const commentsCount = post.comments.length;

  const formatRelativeTime = (dateString: string) => {
    if (!dateString) {
      return "N/A";
    }

    const date = parseISO(dateString);
    return formatDistanceToNow(date, { addSuffix: true });
  };

  const createMarkup = (htmlContent: string) => {
    return { __html: DOMPurify.sanitize(htmlContent) };
  };

  const handleLikePost = (post: PostType) => {
    if (!currentUser && !currentCompany) {
      return;
    }

    if (isUser && currentUser) {
      dispatch(likePost({ postId: post.id, userId: currentUser.id }));
    }

    if (isCompany && currentCompany) {
      dispatch(
        likePostCompany({ postId: post.id, companyId: currentCompany.id })
      );
    }
  };

  const handleUnlikePost = (post: PostType) => {
    if (!currentUser && !currentCompany) {
      return;
    }

    if (isUser && currentUser) {
      dispatch(unlikePost({ postId: post.id, userId: currentUser.id }));
    }

    if (isCompany && currentCompany) {
      dispatch(
        unlikePostCompany({ postId: post.id, companyId: currentCompany.id })
      );
    }
  };

  const handleCommentExpand = () => {
    setExpanded((prevState) => !prevState);
    setInputValue("");
  };

  const handleRemovePost = async () => {
    if (!currentUser || currentUser.role !== Roles.ADMIN) {
      return;
    }

    await dispatch(removePost(post.id));
  };

  const handleCreateComment = () => {
    if ((!currentUser && !currentCompany) || !inputValue) {
      return;
    }

    if (isUser && currentUser) {
      dispatch(
        commentPost({
          postId: post.id,
          userId: currentUser.id,
          commentData: {
            content: inputValue,
          },
        })
      );
    }

    if (isCompany && currentCompany) {
      dispatch(
        commentPostCompany({
          postId: post.id,
          companyId: currentCompany.id,
          commentData: {
            content: inputValue,
          },
        })
      );
    }
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

        ...containerSx,
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: "8px",
          alignItems: "center",
        }}
      >
        {post.company && (
          <>
            <Avatar src={post.company.profilePicture} />
            <Typography variant="h6">{`${post.company.name}`}</Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                marginLeft: "auto",
                gap: "4px",
              }}
            >
              <Typography
                variant="body2"
                color={"text.secondary"}
                sx={{ marginLeft: "auto" }}
              >
                Posted: {formatRelativeTime(post.createdAt)}
              </Typography>
              {currentUser?.role === Roles.ADMIN && (
                <Button
                  startIcon={<DeleteIcon />}
                  onClick={handleRemovePost}
                  color={"error"}
                  variant={"contained"}
                >
                  Remove
                </Button>
              )}
            </Box>
          </>
        )}
        {post.author && (
          <>
            <Avatar src={post.author.profilePicture} />
            <Typography variant="h6">
              {`${post.author.firstName} ${post.author.lastName}`}
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                marginLeft: "auto",
                gap: "4px",
              }}
            >
              <Typography variant="body2" color={"text.secondary"}>
                Posted: {formatRelativeTime(post.createdAt)}
              </Typography>
              {currentUser?.role === Roles.ADMIN && (
                <Button
                  startIcon={<DeleteIcon />}
                  onClick={handleRemovePost}
                  color={"error"}
                  variant={"contained"}
                >
                  Remove
                </Button>
              )}
            </Box>
          </>
        )}
      </Box>

      <Typography variant="h5" component="h2">
        {post.title}
      </Typography>
      <Divider />
      <div dangerouslySetInnerHTML={createMarkup(post.content)} />
      <Divider />
      {currentUser?.role !== Roles.ADMIN && (
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
      )}
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
            <Comment
              key={comment.id}
              comment={comment}
              isCompany={isCompany}
              isUser={isUser}
            />
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
