import React, { useEffect } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from "@mui/material";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  getJobRecommendations,
  getRecommendedJobs,
} from "../../store/slices/JobSlice";
import { getLoggedUser } from "../../store/slices/AuthSlice";

import { GrayColors, White } from "../../utils/constants/colorPallete";
import { GetRecommendationsDto } from "../../server/api/RecommendationApi";

const RecommendedJobsSection = () => {
  const currentUser = useAppSelector(getLoggedUser);
  const recommendedJobs = useAppSelector(getRecommendedJobs);

  const dispatch = useAppDispatch();

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

  return (
    <Box
      sx={{
        flex: 3,

        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "12px",

        height: "fit-content",
        padding: "16px",
        borderRadius: "8px",
        backgroundColor: White.PureWhite,
        border: `1px solid ${GrayColors.Gray2}`,
      }}
    >
      <Typography variant={"h6"} color={"text.primary"}>
        Recommended Jobs
      </Typography>
      <Divider flexItem />
      {recommendedJobs.map((job) => (
        <Card
          key={job.id}
          sx={{
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            width: "100%",
          }}
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
            sx={{ padding: "8px" }}
          />
          <CardContent sx={{ padding: "8px" }}>
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
  );
};

export default RecommendedJobsSection;
