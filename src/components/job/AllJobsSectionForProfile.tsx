import React, { useCallback, useEffect, useState } from "react";
import { Box, Divider, Typography } from "@mui/material";

import { GrayColors, White } from "../../utils/constants/colorPallete";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  getAllJobsByCompanyPaginated,
  getJobs,
  getTotalJobsCount,
  JobType,
  setCurrentJob,
} from "../../store/slices/JobSlice";

import JobCard from "./JobCard";
import { AppRoutes } from "../../utils/constants/routes";
import { getLoggedUser } from "../../store/slices/AuthSlice";
import { useNavigate, useParams } from "react-router-dom";
import { Roles } from "../../utils/constants/roles";
import { debounce } from "lodash";
import useInfiniteScroll from "../../utils/hooks/useInfiniteScroll";

const limit = 10;

const AllJobsSectionForProfile = () => {
  const currentUser = useAppSelector(getLoggedUser);
  const allJobs = useAppSelector(getJobs);
  const totalJobsCount = useAppSelector(getTotalJobsCount);

  const { companyId } = useParams();

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const loadMore = useCallback(
    debounce(async (pageValue: number) => {
      setLoading(true);

      const currentCompanyId = Number(companyId);

      if (!currentCompanyId) {
        return;
      }

      dispatch(
        getAllJobsByCompanyPaginated({
          companyId: Number(companyId) || 1,
          page: pageValue,
          limit: limit,
        })
      );

      setPage(pageValue + 1);

      setLoading(false);
    }, 200),
    [companyId]
  );

  const jobContainerRef = useInfiniteScroll<JobType>({
    callback: loadMore,
    listValue: allJobs,
    loading: loading,
    pageValue: page,
    hasMore: allJobs.length < totalJobsCount,
  });

  useEffect(() => {
    (async () => {
      await loadMore(1);
    })();
  }, []);

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

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          overflow: "auto",

          maxHeight: "400px",
        }}
        ref={jobContainerRef}
      >
        {allJobs.length > 0 ? (
          allJobs.map((job) => (
            <JobCard job={job} key={job.id} onClick={onCardClick} />
          ))
        ) : (
          <Typography variant="body1">No jobs posted</Typography>
        )}
      </Box>
    </Box>
  );
};

export default AllJobsSectionForProfile;
