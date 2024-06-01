import React, { useState } from "react";
import { useAppSelector } from "../../store/hooks";
import { getLoggedUser } from "../../store/slices/AuthSlice";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import IconButton from "@mui/material/IconButton";
import { Bounce, toast } from "react-toastify";

import { White } from "../../utils/constants/colorPallete";
import userBanner from "../../assets/user_banner.jpg";

import UploadFileModal from "../../components/modal/UploadFileModal";
import PreviewFileModal from "../../components/modal/PreviewFileModal";
import DeleteFileModal from "../../components/modal/DeleteFileModal";

const MyProfilePage = () => {
  const currentUser = useAppSelector(getLoggedUser);

  const [expanded, setExpanded] = useState(false);
  const [isUploadFileModalOpen, setIsUploadFileModalOpen] = useState(false);
  const [previewResumeOpen, setPreviewResumeOpen] = useState(false);
  const [deleteResumeOpen, setDeleteResumeOpen] = useState(false);

  // Determine the number of characters to show in the preview
  const previewLength = 100;
  const resumePreview = currentUser?.resume?.substring(0, previewLength);
  const showEllipsis =
    currentUser?.resume && currentUser?.resume.length > previewLength;
  const hasResume = !!currentUser?.resume && currentUser?.resume.length > 0;

  console.log(currentUser);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleOpenUploadResumeModal = () => {
    setIsUploadFileModalOpen(true);
  };

  const handleOpenPreviewResumeModal = () => {
    setPreviewResumeOpen(true);
  };

  const handleOpenDeleteResumeModal = () => {
    setDeleteResumeOpen(true);
  };

  const handleEditProfile = () => {
    toast.success("Profile updated successfully", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
  };

  return (
    <>
      <Box
        sx={{
          margin: "8px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <Card
          sx={{
            display: "flex",
            height: "inherit",
            flexDirection: "column",
            backgroundColor: White.PureWhite,
            borderRadius: "8px",
            minHeight: "100px",

            boxShadow: "none",
          }}
          variant={"outlined"}
        >
          <CardMedia
            component={"img"}
            alt={"user banner"}
            height={"150"}
            image={userBanner}
          />
          <CardHeader
            title={`${currentUser?.firstName} ${currentUser?.lastName}`}
            subheader={"POSITION"}
            avatar={<Avatar src={currentUser?.profilePicture} />}
          />
          <CardContent>
            <Typography variant={"body2"} color={"text.secondary"} gutterBottom>
              {`${currentUser?.country}, ${currentUser?.city}, ${currentUser?.state}`}
            </Typography>
            <Typography variant={"body2"} color={"text.info"} gutterBottom>
              {`${currentUser?.followers.length} connections`}
            </Typography>
            <Typography>{currentUser?.email}</Typography>
          </CardContent>
          <CardActions sx={{ marginLeft: "auto" }}>
            <Button
              variant={"contained"}
              size="small"
              onClick={handleEditProfile}
            >
              Edit Profile
            </Button>
            {currentUser && !currentUser.resumeFile?.fileKey && (
              <Button
                variant={"contained"}
                size="small"
                onClick={handleOpenUploadResumeModal}
              >
                Upload Resume
              </Button>
            )}
            {currentUser && currentUser.resumeFile?.fileKey && (
              <Button
                variant={"contained"}
                color={"error"}
                size="small"
                onClick={handleOpenDeleteResumeModal}
              >
                Delete Resume
              </Button>
            )}
            {currentUser && currentUser.resumeFile?.fileKey && (
              <Button
                variant={"contained"}
                size="small"
                onClick={handleOpenPreviewResumeModal}
              >
                Preview Resume
              </Button>
            )}
          </CardActions>
        </Card>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: White.PureWhite,
            borderRadius: "8px",
            minHeight: "100px",
            padding: "20px", // Adjust padding for aesthetic reasons
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)", // Optional shadow for depth
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h6">Resume:</Typography>
            {showEllipsis && (
              <IconButton
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
                sx={{ marginLeft: "auto" }}
              >
                {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            )}
          </Box>

          {hasResume ? (
            <>
              {!expanded && (
                <Typography variant="body1" paragraph>
                  {`${resumePreview}${showEllipsis ? "..." : ""}`}
                </Typography>
              )}
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <Typography paragraph>{currentUser?.resume}</Typography>
              </Collapse>
            </>
          ) : (
            <Typography variant="body1">No resume available</Typography>
          )}
        </Box>
      </Box>
      {currentUser && !currentUser.resumeFile?.fileKey && (
        <UploadFileModal
          open={isUploadFileModalOpen}
          setOpen={setIsUploadFileModalOpen}
        />
      )}
      {currentUser && currentUser.resumeFile?.fileKey && (
        <PreviewFileModal
          open={previewResumeOpen}
          setOpen={setPreviewResumeOpen}
          file={currentUser.resumeFile}
        />
      )}
      {currentUser && currentUser.resumeFile?.fileKey && (
        <DeleteFileModal
          open={deleteResumeOpen}
          setOpen={setDeleteResumeOpen}
          user={currentUser}
        />
      )}
    </>
  );
};

export default MyProfilePage;
