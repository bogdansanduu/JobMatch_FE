import React from "react";
import { Box, Button, Divider, Typography } from "@mui/material";
import { GrayColors, White } from "../../utils/constants/colorPallete";
import {
  CommentType,
  likeComment,
  likeCommentCompany,
  unlikeComment,
  unlikeCommentCompany,
} from "../../store/slices/PostSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getLoggedCompany, getLoggedUser } from "../../store/slices/AuthSlice";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";

interface CommentProps {
  comment: CommentType;
  isCompany?: boolean;
  isUser?: boolean;
}
const Comment = ({ comment, isUser, isCompany }: CommentProps) => {
  const currentUser = useAppSelector(getLoggedUser);
  const currentCompany = useAppSelector(getLoggedCompany);

  const dispatch = useAppDispatch();

  const alreadyLiked = !!comment.likes.find(
    (like) =>
      like.author?.id === currentUser?.id ||
      like.company?.id === currentCompany?.id
  );

  const likesCount = comment.likes.length;

  const handleLikeComment = (comment: CommentType) => {
    if (!currentUser && !currentCompany) {
      return;
    }

    if (isUser && currentUser) {
      dispatch(likeComment({ commentId: comment.id, userId: currentUser.id }));
    }

    if (isCompany && currentCompany) {
      dispatch(
        likeCommentCompany({
          commentId: comment.id,
          companyId: currentCompany.id,
        })
      );
    }
  };

  const handleUnlikeComment = (comment: CommentType) => {
    if (!currentUser && !currentCompany) {
      return;
    }

    if (isUser && currentUser) {
      dispatch(
        unlikeComment({ commentId: comment.id, userId: currentUser.id })
      );
    }

    if (isCompany && currentCompany) {
      dispatch(
        unlikeCommentCompany({
          commentId: comment.id,
          companyId: currentCompany.id,
        })
      );
    }
  };

  return (
    <Box
      key={comment.id}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        padding: "8px",
        borderRadius: "8px",
        backgroundColor: White.OffWhite,
        border: `1px solid ${GrayColors.Gray3}`,
      }}
    >
      <Typography variant="body1" color={"text.primary"}>
        {comment.author.firstName} {comment.author.lastName}
      </Typography>
      <Typography variant="body2" color={"text.secondary"}>
        {comment.content}
      </Typography>
      <Divider flexItem />
      <Box
        sx={{
          display: "flex",
          gap: "4px",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="body2" color={"text.secondary"}>
          Likes {likesCount}
        </Typography>
        {alreadyLiked ? (
          <Button
            startIcon={<ThumbUpIcon />}
            onClick={() => handleUnlikeComment(comment)}
          >
            Dislike
          </Button>
        ) : (
          <Button
            startIcon={<ThumbUpOutlinedIcon />}
            onClick={() => handleLikeComment(comment)}
          >
            Like
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default Comment;
