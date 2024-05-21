import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import { getAllJobsByCompany, getJobs } from "../store/slices/JobSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getLoggedCompany } from "../store/slices/AuthSlice";

import { GrayColors, White } from "../utils/constants/colorPallete";
import CreateJobModal from "../components/modal/CreateJobModal";
import JobCard from "../components/job/JobCard";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../utils/constants/routes";

const JobPostingsPage = () => {
  const allJobs = useAppSelector(getJobs);
  const loggedCompany = useAppSelector(getLoggedCompany);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [openJobModal, setOpenJobModal] = useState(false);

  useEffect(() => {
    if (!loggedCompany) {
      return;
    }

    dispatch(getAllJobsByCompany(loggedCompany.id));
  }, []);

  const handleOpenJobModal = () => {
    setOpenJobModal(true);
  };

  const handleJobCardClick = (jobId: number) => {
    navigate(`${AppRoutes.CompanyJobDetails}/${jobId}`);
  };

  return (
    <>
      <Box sx={{ display: "flex", padding: "12px", gap: "12px" }}>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",

            height: "100%",
            padding: "16px",
            borderRadius: "8px",
            backgroundColor: White.PureWhite,
            border: `1px solid ${GrayColors.Gray2}`,
          }}
        >
          My Account
          <Box sx={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <Typography variant="body1" color={"text.secondary"}>
              Create a new job listing
            </Typography>
            <Tooltip title="Create new job listing">
              <IconButton onClick={handleOpenJobModal} color="primary">
                <AddCircleOutlineIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
        <Box
          sx={{
            flex: 4,
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
          Current Job Postings
          {allJobs.map((job) => (
            <JobCard job={job} key={job.id} onClick={handleJobCardClick} />
          ))}
        </Box>
      </Box>
      <CreateJobModal
        openJobModal={openJobModal}
        setOpenJobModal={setOpenJobModal}
      />
    </>
  );
};

export default JobPostingsPage;
