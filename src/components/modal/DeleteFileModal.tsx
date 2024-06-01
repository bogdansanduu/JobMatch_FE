import React from "react";
import { deleteUserResume, UserType } from "../../store/slices/UserSlice";
import { AppModal } from "./AppModal";
import { Box, Button, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import AppApi from "../../server/api/AppApi";
import { useAppDispatch } from "../../store/hooks";
import { refreshCurrentUserData } from "../../store/slices/AuthSlice";
import { toast } from "react-toastify";

interface DeleteFileModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  user: UserType;
}

const DeleteFileModal = ({ open, setOpen, user }: DeleteFileModalProps) => {
  const s3DocumentApi = AppApi.getS3DocumentApi();

  const dispatch = useAppDispatch();

  const resume = user.resumeFile;

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleDeleteFile = async () => {
    if (!resume) {
      return;
    }

    try {
      await s3DocumentApi.deleteDocument(resume.fileKey);

      await dispatch(deleteUserResume(user.id));
      await dispatch(refreshCurrentUserData());

      toast.success("File deleted successfully", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (e) {
      toast.error("Failed to delete file", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } finally {
      setOpen(false);
    }
  };

  return (
    <AppModal open={open} noPadding>
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
            variant="h6"
            color={"text.primary"}
          >
            Delete file
          </Typography>
          <IconButton sx={{ marginLeft: "auto" }} onClick={handleCloseModal}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Typography variant="body1">
          Are you sure you want to delete this file?
        </Typography>
        <Typography variant="body2">{resume?.fileName}</Typography>
        <Box sx={{ marginLeft: "auto", display: "flex", gap: "6px" }}>
          <Button variant={"contained"} onClick={handleCloseModal}>
            Close
          </Button>
          <Button
            variant={"contained"}
            color={"error"}
            onClick={handleDeleteFile}
          >
            Delete
          </Button>
        </Box>
      </Box>
    </AppModal>
  );
};

export default DeleteFileModal;
