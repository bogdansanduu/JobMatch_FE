import React from "react";
import { Box, Button, Divider, Typography } from "@mui/material";

import OutboundOutlinedIcon from "@mui/icons-material/OutboundOutlined";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import BookmarkRemoveOutlinedIcon from "@mui/icons-material/BookmarkRemoveOutlined";
import Tooltip from "@mui/material/Tooltip";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getCurrentJob } from "../../store/slices/JobSlice";
import {
  getLoggedUser,
  refreshCurrentUserData,
} from "../../store/slices/AuthSlice";
import { saveJob, unsaveJob } from "../../store/slices/JobSavedSlice";
import { applyForJob } from "../../store/slices/JobApplicationSlice";

import { GrayColors, White } from "../../utils/constants/colorPallete";
import JobDetails from "./JobDetails";
import JobDetailsHeader from "./JobDetailsHeader";

const JobUserDetailsSection = () => {
  const currentJob = useAppSelector(getCurrentJob);
  const currentLoggedUser = useAppSelector(getLoggedUser);

  const dispatch = useAppDispatch();

  const alreadyApplied = !!currentLoggedUser?.jobApplications?.some(
    (jobApplication) => jobApplication.job.id === currentJob?.id
  );

  const alreadySaved = !!currentLoggedUser?.jobsSaved?.some(
    (savedJob) => savedJob.job.id === currentJob?.id
  );

  const handleApplyForJob = async () => {
    if (!currentLoggedUser || !currentJob) {
      return;
    }

    await dispatch(
      applyForJob({
        userId: currentLoggedUser.id,
        jobId: currentJob.id,
      })
    );

    await dispatch(refreshCurrentUserData());
  };

  const handleSaveJob = async () => {
    if (!currentLoggedUser || !currentJob) {
      return;
    }

    if (!alreadySaved) {
      await dispatch(
        saveJob({
          userId: currentLoggedUser.id,
          jobId: currentJob.id,
        })
      );
    }

    if (alreadySaved) {
      await dispatch(
        unsaveJob({
          userId: currentLoggedUser.id,
          jobId: currentJob.id,
        })
      );
    }

    await dispatch(refreshCurrentUserData());
  };

  return (
    <Box
      sx={{
        flex: 3,
        display: "flex",
        gap: "12px",
        flexDirection: "column",
        height: "100%",
        padding: "16px",
        borderRadius: "8px",
        backgroundColor: White.PureWhite,
        border: `1px solid ${GrayColors.Gray2}`,
      }}
    >
      {currentJob ? (
        <>
          <JobDetailsHeader />
          <Divider />
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="subtitle1" color="text.secondary">
                Get in contact:&nbsp;
              </Typography>
              <Typography variant="body1">
                {currentJob.company.email}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", marginLeft: "auto", gap: "8px" }}>
              <Tooltip title={"Already applied"} placement={"top"}>
                <span>
                  <Button
                    variant={"contained"}
                    endIcon={<OutboundOutlinedIcon />}
                    onClick={handleApplyForJob}
                    disabled={alreadyApplied}
                  >
                    Apply
                  </Button>
                </span>
              </Tooltip>
              <Button
                variant={"outlined"}
                endIcon={
                  alreadySaved ? (
                    <BookmarkRemoveOutlinedIcon />
                  ) : (
                    <BookmarkOutlinedIcon />
                  )
                }
                onClick={handleSaveJob}
              >
                {alreadySaved ? "Unsave" : "Save"}
              </Button>
            </Box>
          </Box>
          <Divider />
          <JobDetails />
        </>
      ) : (
        <Typography variant="h6">No job selected</Typography>
      )}
    </Box>
  );
};

export default JobUserDetailsSection;
