import React from "react";
import { Box, Typography } from "@mui/material";

import { useAppSelector } from "../../store/hooks";
import { getCurrentJob } from "../../store/slices/JobSlice";

const JobDetails = () => {
  const currentJob = useAppSelector(getCurrentJob);

  if (!currentJob) return <></>;

  return (
    <>
      <Box sx={{ marginTop: "16px" }}>
        <Typography variant="h6">Job Description</Typography>
        <Typography variant="body1">{currentJob.description}</Typography>
      </Box>
      <Box sx={{ marginTop: "16px" }}>
        <Typography variant="h6">Responsibilities</Typography>
        <Typography variant="body1">{currentJob.responsibilities}</Typography>
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
  );
};

export default JobDetails;
