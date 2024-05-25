import React from "react";
import { Avatar, Box, Button, Divider, Typography } from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import ClassIcon from "@mui/icons-material/Class";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import OutboundOutlinedIcon from "@mui/icons-material/OutboundOutlined";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import { formatDistanceToNow, parseISO } from "date-fns";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getCurrentJob } from "../../store/slices/JobSlice";
import { getLoggedUser } from "../../store/slices/AuthSlice";

import { GrayColors, White } from "../../utils/constants/colorPallete";
import { applyForJob } from "../../store/slices/JobApplicationSlice";

const JobUserDetailsSection = () => {
  const currentJob = useAppSelector(getCurrentJob);
  const currentLoggedUser = useAppSelector(getLoggedUser);

  const dispatch = useAppDispatch();

  const alreadyApplied = !!currentLoggedUser?.jobApplications.some(
    (jobApplication) => jobApplication.job.id === currentJob?.id
  );

  const formatRelativeTime = (dateString: string) => {
    if (!dateString) {
      return "N/A";
    }

    const date = parseISO(dateString);
    return formatDistanceToNow(date, { addSuffix: true });
  };

  const handleApplyForJob = () => {
    if (!currentLoggedUser || !currentJob) {
      return;
    }

    dispatch(
      applyForJob({
        userId: currentLoggedUser.id,
        jobId: currentJob.id,
        resume: currentLoggedUser.resume,
      })
    );
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
          <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Avatar
              src={currentJob.company.profilePicture}
              sx={{ alignSelf: "start", marginTop: "6px" }}
            />
            <Box>
              <Typography variant="h6">{currentJob.title}</Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <BusinessIcon sx={{ color: GrayColors.Gray5 }} />
                <Typography variant="subtitle1" color="text.secondary">
                  {currentJob.company.name}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <ClassIcon sx={{ color: GrayColors.Gray5 }} />
                <Typography variant="subtitle2" color="text.secondary">
                  {currentJob.category}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <LocationOnIcon sx={{ color: GrayColors.Gray5 }} />
                <Typography variant="subtitle2" color="text.secondary">
                  {`${currentJob.city || ""}${currentJob.city ? ", " : ""}${
                    currentJob.state || ""
                  }${currentJob.state ? ", " : ""}${currentJob.country}`}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                marginLeft: "auto",
                alignSelf: "end",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <Typography variant="subtitle2" color="text.secondary">
                  Posted:
                </Typography>
                <Typography variant="body1">
                  {formatRelativeTime(currentJob.createdAt)}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Last Updated:
                </Typography>
                <Typography variant="body1">
                  {formatRelativeTime(currentJob.updatedAt)}
                </Typography>
              </Box>
            </Box>
          </Box>
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
              <Button
                variant={"contained"}
                endIcon={<OutboundOutlinedIcon />}
                onClick={handleApplyForJob}
                disabled={alreadyApplied}
              >
                Apply
              </Button>
              <Button variant={"outlined"} endIcon={<BookmarkOutlinedIcon />}>
                Save
              </Button>
            </Box>
          </Box>
          <Divider />
          <Box sx={{ marginTop: "16px" }}>
            <Typography variant="h6">Job Description</Typography>
            <Typography variant="body1">{currentJob.description}</Typography>
          </Box>
          <Box sx={{ marginTop: "16px" }}>
            <Typography variant="h6">Responsibilities</Typography>
            <Typography variant="body1">
              {currentJob.responsibilities}
            </Typography>
          </Box>
          <Box sx={{ marginTop: "16px" }}>
            <Typography variant="h6">Minimum Qualifications</Typography>
            <Typography variant="body1">
              {currentJob.minimumQualifications}
            </Typography>
          </Box>
          <Box sx={{ marginTop: "16px" }}>
            <Typography variant="h6">Preferred Qualifications</Typography>
            <Typography variant="body1">
              {currentJob.preferredQualifications}
            </Typography>
          </Box>
        </>
      ) : (
        <Typography variant="h6">No job selected</Typography>
      )}
    </Box>
  );
};

export default JobUserDetailsSection;
