import React, { MouseEvent, useCallback, useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  CardHeader,
  Avatar,
  InputAdornment,
  TextField,
  Divider,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DescriptionIcon from "@mui/icons-material/Description";
import BusinessIcon from "@mui/icons-material/Business";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { debounce } from "lodash";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import useInfiniteScroll from "../utils/hooks/useInfiniteScroll";

import {
  getAllJobsPaginated,
  getJobRecommendations,
  getJobs,
  getRecommendedJobs,
  getTotalJobsCount,
  JobType,
} from "../store/slices/JobSlice";
import { Blue, GrayColors, White } from "../utils/constants/colorPallete";
import { getLoggedUser } from "../store/slices/AuthSlice";
import { GetRecommendationsDto } from "../server/api/RecommendationApi";

const limit = 10;

const JobsPage = () => {
  const currentUser = useAppSelector(getLoggedUser);
  const allJobs = useAppSelector(getJobs);
  const recommendedJobs = useAppSelector(getRecommendedJobs);
  const totalJobsCount = useAppSelector(getTotalJobsCount);

  const dispatch = useAppDispatch();

  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  console.log(recommendedJobs);

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

  useEffect(() => {
    if (!currentUser) {
      return;
    }

    const recommendedData: GetRecommendationsDto = {
      description: currentUser.resume,
      latitude: 1.35711,
      longitude: 103.8198,
    };

    dispatch(getJobRecommendations(recommendedData));
  }, [currentUser]);

  console.log(recommendedJobs);

  const handleClose = (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    event.stopPropagation();

    setSearchTerm("");
  };

  return (
    <Box
      sx={{ display: "flex", padding: "12px", gap: "12px", height: "inherit" }}
    >
      <Box
        sx={{
          flex: 1,

          height: "fit-content",
          padding: "16px",
          borderRadius: "8px",
          backgroundColor: White.PureWhite,
          border: `1px solid ${GrayColors.Gray2}`,
        }}
      >
        My Account
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
        ref={jobContainerRef}
      >
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

        <Divider />

        {allJobs.map((job) => (
          <Card
            key={job.id}
            sx={{
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              "&:hover": {
                boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
              },
              overflow: "visible",
            }}
          >
            <CardHeader
              avatar={
                <Avatar
                  alt={`${job.company.name}`}
                  src={job.company.profilePicture}
                  sx={{ width: 40, height: 40, borderRadius: "50%" }}
                />
              }
              title={job.title}
              subheader={job.category}
            />
            <CardContent
              sx={{ display: "flex", flexDirection: "column", gap: "4px" }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <BusinessIcon sx={{ color: GrayColors.Gray5 }} />
                <Typography variant="body2" color="text.secondary">
                  {job.company.name}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <LocationOnIcon sx={{ color: GrayColors.Gray5 }} />
                <Typography variant="body2" color="text.secondary">
                  {job.city ? `${job.city}, ` : ""}
                  {job.state ? `${job.state}, ` : ""}
                  {job.country}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <DescriptionIcon sx={{ color: GrayColors.Gray5 }} />
                <Typography variant="body2">
                  {job.description
                    ? job.description
                    : "Description not available"}
                </Typography>
              </Box>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        ))}
      </Box>
      <Box
        sx={{
          flex: 1,

          height: "fit-content",
          padding: "16px",
          borderRadius: "8px",
          backgroundColor: White.PureWhite,
          border: `1px solid ${GrayColors.Gray2}`,
        }}
      >
        Recommendations
        {recommendedJobs.map((job) => (
          <Card
            key={job.id}
            sx={{ maxWidth: 345, m: 1, boxShadow: "0 2px 5px rgba(0,0,0,0.1)" }}
          >
            <CardHeader
              avatar={
                <Avatar
                  alt={`${job.company.name}`}
                  src={job.company.profilePicture}
                  sx={{ width: 30, height: 30 }}
                />
              }
              title={job.title}
              subheader={job.category}
              titleTypographyProps={{
                variant: "body2",
                fontWeight: "bold",
              }}
              subheaderTypographyProps={{
                variant: "caption",
                color: "text.secondary",
              }}
              sx={{ paddingBottom: 0 }}
            />
            <CardContent sx={{ paddingTop: 0, paddingBottom: "8px" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <LocationOnIcon sx={{ color: GrayColors.Gray5 }} />
                <Typography variant="caption" color="text.secondary">
                  {`${job.city || ""}${job.city ? ", " : ""}${job.state || ""}${
                    job.state ? ", " : ""
                  }${job.country}`}
                </Typography>
              </Box>

              <Typography variant="caption" display="block" gutterBottom>
                {job.description.length > 80
                  ? `${job.description.substring(0, 80)}...`
                  : job.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default JobsPage;
