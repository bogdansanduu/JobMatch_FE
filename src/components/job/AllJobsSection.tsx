import React, { MouseEvent, useCallback, useEffect, useState } from "react";
import {
  Box,
  Divider,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Blue, GrayColors, White } from "../../utils/constants/colorPallete";
import { debounce } from "lodash";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  getAllJobsPaginated,
  getJobs,
  getTotalJobsCount,
  JobType,
  setCurrentJob,
} from "../../store/slices/JobSlice";

import useInfiniteScroll from "../../utils/hooks/useInfiniteScroll";
import JobCard from "./JobCard";
import { AppRoutes } from "../../utils/constants/routes";
import { useNavigate } from "react-router-dom";
import { Roles } from "../../utils/constants/roles";
import { getLoggedUser } from "../../store/slices/AuthSlice";

const limit = 10;

const AllJobsSection = () => {
  const currentUser = useAppSelector(getLoggedUser);
  const allJobs = useAppSelector(getJobs);
  const totalJobsCount = useAppSelector(getTotalJobsCount);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const loadMore = useCallback(
    debounce(async (pageValue: number) => {
      setLoading(true);

      dispatch(
        getAllJobsPaginated({
          page: pageValue,
          limit: limit,
          searchTerm: searchTerm,
        })
      );

      setPage(pageValue + 1);

      setLoading(false);
    }, 200),
    [searchTerm]
  );

  const jobContainerRef = useInfiniteScroll<JobType>({
    callback: loadMore,
    listValue: allJobs,
    loading: loading,
    pageValue: page,
    hasMore: allJobs.length < totalJobsCount,
    searchValue: searchTerm,
  });

  useEffect(() => {
    (async () => {
      await loadMore(1);
    })();
  }, [searchTerm]);

  const handleClose = (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    event.stopPropagation();

    setSearchTerm("");
  };

  const handleJobCardClick = (job: JobType) => {
    dispatch(setCurrentJob(job));

    navigate(`${AppRoutes.UserJobDetails}/${job.id}`);
  };

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
      ref={jobContainerRef}
    >
      {currentUser?.role === Roles.ADMIN ? (
        <Typography variant="h6">All Company Jobs:</Typography>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <TextField
            variant="standard"
            margin="normal"
            placeholder="Search"
            sx={{
              backgroundColor: Blue.VoyagerBlue,
              borderRadius: "6px",
              marginTop: 0,
              marginBottom: 0,
              width: "fit-content",
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" sx={{ paddingLeft: "4px" }}>
                  <SearchIcon />
                </InputAdornment>
              ),
              disableUnderline: true,
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={(e) => handleClose(e)} disableRipple>
                    <CloseIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Box>
      )}

      <Divider />

      {allJobs.map((job) => (
        <JobCard job={job} key={job.id} onClick={handleJobCardClick} />
      ))}
    </Box>
  );
};

export default AllJobsSection;
