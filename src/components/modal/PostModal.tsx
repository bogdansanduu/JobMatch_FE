import React, { useRef, useState } from "react";
import { AppModal } from "./AppModal";
import { Box, Button, TextField, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TextEditor from "../textEditor/TextEditor";
import { RichTextEditorRef } from "mui-tiptap";
import { createPost, createPostCompany } from "../../store/slices/PostSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getLoggedCompany, getLoggedUser } from "../../store/slices/AuthSlice";

interface PostModalProps {
  openPostModal: boolean;
  setOpenPostModal: (value: boolean) => void;
  isCompany?: boolean;
  isUser?: boolean;
}
const PostModal = ({
  openPostModal,
  setOpenPostModal,
  isCompany,
  isUser,
}: PostModalProps) => {
  const currentUser = useAppSelector(getLoggedUser);
  const currentCompany = useAppSelector(getLoggedCompany);

  const dispatch = useAppDispatch();

  const [title, setTitle] = useState("");
  const [errorTitle, setErrorTitle] = useState(false);
  const editorRef = useRef<RichTextEditorRef>(null);
  const isCreatePostDisabled = !title || errorTitle;

  const handleClosePostModal = () => {
    const editor = editorRef.current?.editor;

    if (editor) {
      setTitle("");
      editor.commands.clearContent();
    }

    setOpenPostModal(false);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (!value) {
      setErrorTitle(true);
    } else {
      setErrorTitle(false);
    }

    setTitle(value);
  };

  const handleCreatePost = () => {
    if ((!currentUser && !currentCompany) || errorTitle) {
      return;
    }

    setErrorTitle(false);

    const editor = editorRef.current?.editor;
    if (editor) {
      const content = editor.getHTML();

      if (isUser && currentUser) {
        dispatch(
          createPost({
            userId: currentUser.id,
            postData: {
              title,
              content,
            },
          })
        );
      }

      if (isCompany && currentCompany) {
        dispatch(
          createPostCompany({
            companyId: currentCompany.id,
            postData: {
              title,
              content,
            },
          })
        );
      }

      //clears editor and title
      editor.commands.clearContent();
      setTitle("");
    }

    setOpenPostModal(false);
  };

  return (
    <AppModal open={openPostModal} closeModal={handleClosePostModal} noPadding>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          padding: "24px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            style={{ marginRight: "8px" }}
            variant="subtitle2"
            color={"text.primary"}
          >
            Write your post
          </Typography>
          <IconButton
            sx={{ marginLeft: "auto" }}
            onClick={handleClosePostModal}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <TextField
          variant={"standard"}
          placeholder={"Title"}
          label={"Title"}
          value={title}
          error={errorTitle}
          required
          onChange={handleTitleChange}
        />
        <TextEditor ref={editorRef} />
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
          <Button variant={"outlined"} onClick={handleClosePostModal}>
            Cancel
          </Button>
          <Button
            variant={"contained"}
            onClick={handleCreatePost}
            disabled={isCreatePostDisabled}
          >
            Create Post
          </Button>
        </Box>
      </Box>
    </AppModal>
  );
};

export default PostModal;
