import React, { useEffect } from "react";
import { Box, Divider, Typography, useMediaQuery } from "@mui/material";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getCurrentJob } from "../../store/slices/JobSlice";
import {
  getJobApplications,
  getJobApplicationsByJob,
} from "../../store/slices/JobApplicationSlice";

import { GrayColors, White } from "../../utils/constants/colorPallete";

import JobDetails from "../../components/job/JobDetails";
import JobDetailsHeader from "../../components/job/JobDetailsHeader";
import JobApplicationUser from "../../components/application/JobApplicationUser";

const CompanyJobDetailsPage = () => {
  const currentJob = useAppSelector(getCurrentJob);
  const jobApplications = useAppSelector(getJobApplications);

  const dispatch = useAppDispatch();

  const isLaptop = useMediaQuery("(min-width: 1024px)");

  useEffect(() => {
    if (!currentJob) {
      return;
    }

    dispatch(getJobApplicationsByJob(currentJob.id));
  }, [currentJob]);

  return (
    <Box sx={{ display: "flex", margin: "12px", gap: "12px" }}>
      {isLaptop && (
        <Box
          sx={{
            flex: 1.5,
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
              <JobDetails />
            </>
          ) : (
            <Typography variant="h6">No job selected</Typography>
          )}
        </Box>
      )}
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
        {jobApplications.length > 0 ? (
          jobApplications.map((jobApplication, index) => (
            <JobApplicationUser jobApplication={jobApplication} key={index} />
          ))
        ) : (
          <Typography variant="body1" color={"text.secondary"}>
            No applications yet
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default CompanyJobDetailsPage;
