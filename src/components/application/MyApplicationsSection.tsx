import React, { useEffect } from "react";
import { Box, Tab, Tabs } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  getJobApplications,
  getJobApplicationsByUser,
  JobApplicationType,
} from "../../store/slices/JobApplicationSlice";
import {
  getJobsSaved,
  getSavedJobsByUser,
  JobSavedType,
} from "../../store/slices/JobSavedSlice";
import { getLoggedUser } from "../../store/slices/AuthSlice";
import { setCurrentJob } from "../../store/slices/JobSlice";

import { GrayColors, White } from "../../utils/constants/colorPallete";
import { AppRoutes } from "../../utils/constants/routes";

import JobCard from "../job/JobCard";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const MyApplicationsSection = () => {
  const currentLoggedUser = useAppSelector(getLoggedUser);
  const jobApplications = useAppSelector(getJobApplications);
  const savedJobs = useAppSelector(getJobsSaved);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [value, setValue] = React.useState(0);

  const handleJobApplicationCardClick = (
    jobApplication: JobApplicationType
  ) => {
    dispatch(setCurrentJob(jobApplication.job));

    navigate(`${AppRoutes.UserApplicationReview}/${jobApplication.id}`);
  };

  const handleJobSavedCardClick = (savedJob: JobSavedType) => {
    dispatch(setCurrentJob(savedJob.job));

    navigate(`${AppRoutes.UserJobDetails}/${savedJob.job.id}`);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (!currentLoggedUser) {
      return;
    }

    dispatch(getJobApplicationsByUser(currentLoggedUser.id));
    dispatch(getSavedJobsByUser(currentLoggedUser.id));
  }, [currentLoggedUser]);

  return (
    <Box
      sx={{
        flex: 5,

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
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Applied Jobs" {...a11yProps(0)} />
          <Tab label="Saved Jobs" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <Box hidden={value !== 0}>
        {jobApplications.map((jobApplication) => (
          <JobCard
            key={jobApplication.id}
            job={jobApplication.job}
            onClick={() => handleJobApplicationCardClick(jobApplication)}
          />
        ))}
      </Box>

      <Box hidden={value !== 1}>
        <Box>
          {savedJobs.map((savedJob) => (
            <JobCard
              key={savedJob.id}
              job={savedJob.job}
              onClick={() => handleJobSavedCardClick(savedJob)}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default MyApplicationsSection;
