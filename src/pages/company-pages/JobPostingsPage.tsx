import React, { useEffect, useState } from "react";
import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useNavigate } from "react-router-dom";

import { GrayColors, White } from "../../utils/constants/colorPallete";
import { AppRoutes } from "../../utils/constants/routes";
import bannerCompany from "../../assets/banner_company.png";

import {
  getAllJobsByCompany,
  getJobs,
  JobType,
  setCurrentJob,
} from "../../store/slices/JobSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getLoggedCompany } from "../../store/slices/AuthSlice";

import CreateJobModal from "../../components/modal/CreateJobModal";
import JobCard from "../../components/job/JobCard";
import MyAccountSectionCompany from "../../components/account/MyAccountSectionCompany";

const JobPostingsPage = () => {
  const allJobs = useAppSelector(getJobs);
  const loggedCompany = useAppSelector(getLoggedCompany);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [openJobModal, setOpenJobModal] = useState(false);

  const isMobile = useMediaQuery("(max-width: 600px)");

  useEffect(() => {
    if (!loggedCompany) {
      return;
    }

    dispatch(getAllJobsByCompany(loggedCompany.id));
  }, [openJobModal]);

  const handleOpenJobModal = () => {
    setOpenJobModal(true);
  };

  const handleJobCardClick = (job: JobType) => {
    dispatch(setCurrentJob(job));

    navigate(`${AppRoutes.CompanyJobDetails}/${job.id}`);
  };

  return (
    <>
      <Box sx={{ display: "flex", padding: "12px", gap: "12px" }}>
        {!isMobile && <MyAccountSectionCompany />}

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
          <Typography variant="h6" color={"text.primary"}>
            Current Job Postings
          </Typography>

          {loggedCompany && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                border: `1px solid ${GrayColors.Gray2}`,
                borderRadius: "8px",
              }}
            >
              <img
                src={bannerCompany}
                alt="Banner"
                style={{ borderRadius: "8px 8px 0 0" }}
              />

              <Box sx={{ padding: "16px" }}>
                <Typography
                  variant="body2"
                  color={"text.secondary"}
                  sx={{ marginBottom: "12px" }}
                >
                  Ready to create a new job listing? Start by clicking the
                  button below.
                </Typography>
                <Button
                  onClick={handleOpenJobModal}
                  variant={"contained"}
                  endIcon={<AddCircleOutlineIcon />}
                  sx={{ marginTop: "8px" }}
                >
                  Create new job listing
                </Button>
              </Box>
            </Box>
          )}

          {/*<Box sx={{ display: "flex", gap: "8px", alignItems: "center" }}>*/}
          {/*  <Typography variant="body1" color={"text.secondary"}>*/}
          {/*    Create a new job listing*/}
          {/*  </Typography>*/}
          {/*  <Tooltip title="Create new job listing">*/}
          {/*    <IconButton onClick={handleOpenJobModal} color="primary">*/}
          {/*      <AddCircleOutlineIcon />*/}
          {/*    </IconButton>*/}
          {/*  </Tooltip>*/}
          {/*</Box>*/}

          {allJobs.length > 0 ? (
            allJobs.map((job) => (
              <JobCard job={job} key={job.id} onClick={handleJobCardClick} />
            ))
          ) : (
            <Typography variant="body1" color={"text.secondary"}>
              You currently have no job listings
            </Typography>
          )}
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
