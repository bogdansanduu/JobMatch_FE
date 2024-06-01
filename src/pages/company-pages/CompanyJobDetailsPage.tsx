import React, { useEffect } from "react";
import { Box, Button, Collapse, Divider, Typography } from "@mui/material";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getCurrentJob } from "../../store/slices/JobSlice";
import {
  getJobApplications,
  getJobApplicationsByJob,
} from "../../store/slices/JobApplicationSlice";

import { GrayColors, White } from "../../utils/constants/colorPallete";

import JobDetails from "../../components/job/JobDetails";
import JobDetailsHeader from "../../components/job/JobDetailsHeader";
import IconButton from "@mui/material/IconButton";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import JobApplicationUser from "../../components/job/JobApplicationUser";
import jobApplicationUser from "../../components/job/JobApplicationUser";

const CompanyJobDetailsPage = () => {
  const currentJob = useAppSelector(getCurrentJob);
  const jobApplications = useAppSelector(getJobApplications);

  const dispatch = useAppDispatch();

  console.log(jobApplications);

  useEffect(() => {
    if (!currentJob) {
      return;
    }

    dispatch(getJobApplicationsByJob(currentJob.id));
  }, [currentJob]);

  const handleEditJob = () => {
    // Implement the logic to navigate to the edit job page or open an edit modal
  };

  return (
    <Box sx={{ display: "flex", margin: "12px", gap: "12px" }}>
      <Box
        sx={{
          flex: 1,
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
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={handleEditJob}
              >
                Edit
              </Button>
            </Box>
            <Divider />
            <JobDetails />
          </>
        ) : (
          <Typography variant="h6">No job selected</Typography>
        )}
      </Box>
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
        {jobApplications.map((jobApplication, index) => (
          <JobApplicationUser jobApplication={jobApplication} key={index} />
        ))}
      </Box>
    </Box>
  );
};

export default CompanyJobDetailsPage;
