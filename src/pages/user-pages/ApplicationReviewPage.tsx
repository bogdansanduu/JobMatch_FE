import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";

import JobUserDetailsSection from "../../components/job/JobUserDetailsSection";
import ApplicationStatusSection from "../../components/application/ApplicationStatusSection";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  getCurrentJobApplication,
  getJobApplicationById,
} from "../../store/slices/JobApplicationSlice";
import { getJobById } from "../../store/slices/JobSlice";

const ApplicationReviewPage = () => {
  const currentJobApplication = useAppSelector(getCurrentJobApplication);

  const dispatch = useAppDispatch();
  const { applicationId } = useParams();

  useEffect(() => {
    if (!applicationId || isNaN(Number(applicationId))) {
      return;
    }

    const applicationIdNumber = Number(applicationId);

    dispatch(
      getJobApplicationById({
        jobApplicationId: applicationIdNumber,
        setInStore: true,
      })
    );
  }, [applicationId]);

  useEffect(() => {
    if (!currentJobApplication) {
      return;
    }

    dispatch(
      getJobById({
        jobId: currentJobApplication.job.id,
        setInStore: true,
      })
    );
  }, [currentJobApplication]);

  return (
    <Box sx={{ display: "flex", margin: "12px", gap: "12px" }}>
      <ApplicationStatusSection />
      <JobUserDetailsSection />
    </Box>
  );
};

export default ApplicationReviewPage;
