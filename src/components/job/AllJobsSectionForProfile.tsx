import React from "react";
import { Box, Divider, Typography } from "@mui/material";

import { GrayColors, White } from "../../utils/constants/colorPallete";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getJobs, JobType, setCurrentJob } from "../../store/slices/JobSlice";

import JobCard from "./JobCard";
import { AppRoutes } from "../../utils/constants/routes";
import { getLoggedUser } from "../../store/slices/AuthSlice";
import { useNavigate } from "react-router-dom";
import { Roles } from "../../utils/constants/roles";

const AllJobsSectionForProfile = () => {
  const currentUser = useAppSelector(getLoggedUser);
  const allJobs = useAppSelector(getJobs);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleJobCardClick = (job: JobType) => {
    dispatch(setCurrentJob(job));

    navigate(`${AppRoutes.UserJobDetails}/${job.id}`);
  };

  const onCardClick =
    currentUser?.role === Roles.ADMIN ? () => {} : handleJobCardClick;

  return (
    <Box
      sx={{
        flex: 5,
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        overflow: "auto",

        height: "100%",
        padding: "16px",
        borderRadius: "8px",
        backgroundColor: White.PureWhite,
        border: `1px solid ${GrayColors.Gray2}`,
      }}
    >
      <Typography variant="h6">All Company Jobs:</Typography>

      <Divider />

      {allJobs.length > 0 ? (
        allJobs.map((job) => (
          <JobCard job={job} key={job.id} onClick={onCardClick} />
        ))
      ) : (
        <Typography variant="body1">No jobs posted</Typography>
      )}
    </Box>
  );
};

export default AllJobsSectionForProfile;
