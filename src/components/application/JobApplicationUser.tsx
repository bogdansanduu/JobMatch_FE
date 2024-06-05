import React, { useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import { Avatar, Box, Button, Collapse, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import {
  JobApplicationType,
  setCurrentJobApplication,
} from "../../store/slices/JobApplicationSlice";
import { useAppDispatch } from "../../store/hooks";

import { GrayColors } from "../../utils/constants/colorPallete";

import PreviewFileModal from "../modal/PreviewFileModal";
import ReviewApplicationModal from "../modal/ReviewApplicationModal";
import JobApplicationStatusLabel from "./JobApplicationStatusLabel";

interface JobApplicationUserProps {
  jobApplication: JobApplicationType;
}

const JobApplicationUser = ({ jobApplication }: JobApplicationUserProps) => {
  const dispatch = useAppDispatch();

  const [expanded, setExpanded] = useState(false);
  const [previewResumeOpen, setPreviewResumeOpen] = useState(false);
  const [reviewApplicationOpen, setReviewApplicationOpen] = useState(false);

  const applicant = jobApplication.applicant;

  // Determine the number of characters to show in the preview
  const previewLength = 100;
  const resumePreview =
    applicant.resume && applicant.resume.substring(0, previewLength);
  const showEllipsis =
    applicant.resume && applicant.resume.length > previewLength;
  const hasResume = !!applicant.resume && applicant.resume.length > 0;
  const hasResumeUploaded = !!applicant.resumeFile;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleOpenPreviewResumeModal = () => {
    setPreviewResumeOpen(true);
  };

  const handleOpenReviewApplicationModal = async () => {
    await dispatch(setCurrentJobApplication(jobApplication));
    setReviewApplicationOpen(true);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          gap: "12px",
          flexDirection: "column",
          height: "100%",
          padding: "16px",
          borderRadius: "8px",
          border: `1px solid ${GrayColors.Gray2}`,

          "&:hover": {
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
          },
          transition: "box-shadow 0.3s",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Avatar
            src={applicant.profilePicture}
            sx={{ alignSelf: "start", marginTop: "6px" }}
          />
          <Typography variant="subtitle1" color="text.secondary">
            {`${applicant.firstName} ${applicant.lastName}`}
          </Typography>
          <Box
            sx={{ marginLeft: "auto", display: "flex", alignItems: "center" }}
          >
            <Typography variant="subtitle1" color="text.secondary">
              Contact:&nbsp;
            </Typography>
            <Typography variant="body1">{applicant.email}</Typography>
          </Box>
        </Box>

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
            <Typography variant="body1" paragraph>
              {!expanded && `${resumePreview}${showEllipsis ? "..." : ""}`}
            </Typography>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <Typography paragraph>{applicant.resume}</Typography>
            </Collapse>
          </>
        ) : (
          <Typography variant="body1">No resume available</Typography>
        )}
        <Box sx={{ display: "flex", gap: "8px" }}>
          <JobApplicationStatusLabel status={jobApplication.status} />
          <Box sx={{ display: "flex", gap: "8px", marginLeft: "auto" }}>
            <Tooltip
              title={hasResumeUploaded ? "" : "No resume uploaded"}
              placement={"top"}
            >
              <span>
                <Button
                  variant={"contained"}
                  onClick={handleOpenPreviewResumeModal}
                  disabled={!hasResumeUploaded}
                  sx={{ height: "100%" }}
                >
                  View Resume
                </Button>
              </span>
            </Tooltip>
            <Button
              variant={"contained"}
              onClick={handleOpenReviewApplicationModal}
            >
              Review Application
            </Button>
          </Box>
        </Box>
      </Box>
      {applicant.resumeFile && (
        <PreviewFileModal
          open={previewResumeOpen}
          setOpen={setPreviewResumeOpen}
          file={applicant.resumeFile}
        />
      )}
      <ReviewApplicationModal
        open={reviewApplicationOpen}
        setOpen={setReviewApplicationOpen}
      />
    </>
  );
};

export default JobApplicationUser;
