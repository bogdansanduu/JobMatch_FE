import React, { useEffect } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  SxProps,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { setDefaults, OutputFormat, fromAddress } from "react-geocode";

import { GrayColors, White } from "../../utils/constants/colorPallete";
import { AppRoutes } from "../../utils/constants/routes";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  getJobRecommendations,
  getRecommendedJobs,
  JobType,
  setCurrentJob,
} from "../../store/slices/JobSlice";
import { getLoggedUser } from "../../store/slices/AuthSlice";

import { GetRecommendationsDto } from "../../server/api/RecommendationApi";

interface RecommendedJobsSectionProps {
  containerSx?: SxProps;
}

setDefaults({
  key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || "test",
  language: "en", // Default language for responses.
  region: "es", // Default region for responses.
  outputFormat: OutputFormat.JSON, // Default output format.
});

const RecommendedJobsSection = ({
  containerSx,
}: RecommendedJobsSectionProps) => {
  const currentUser = useAppSelector(getLoggedUser);
  const recommendedJobs = useAppSelector(getRecommendedJobs);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser || !currentUser.resume) {
      return;
    }

    (async () => {
      fromAddress(
        `${currentUser.city} ${currentUser.country} ${currentUser.state}`
      )
        .then(({ results }) => {
          const { lat, lng } = results[0].geometry.location;

          const recommendedData: GetRecommendationsDto = {
            description: currentUser.resume,
            latitude: lat,
            longitude: lng,
          };

          dispatch(getJobRecommendations(recommendedData));
        })
        .catch(console.error);
    })();
  }, [currentUser]);

  const handleJobCardClick = async (job: JobType) => {
    await dispatch(setCurrentJob(job));

    navigate(`${AppRoutes.UserJobDetails}/${job.id}`);
  };

  return (
    <Box
      sx={{
        flex: 2,

        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "12px",

        height: "fit-content",
        padding: "16px",
        borderRadius: "8px",
        backgroundColor: White.PureWhite,
        border: `1px solid ${GrayColors.Gray2}`,
        ...containerSx,
      }}
    >
      <Typography variant={"h6"} color={"text.primary"}>
        Recommended Jobs
      </Typography>
      <Divider flexItem />

      {recommendedJobs.length > 0 ? (
        recommendedJobs.map((job) => (
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
            <CardActions>
              <Button size="small" onClick={() => handleJobCardClick(job)}>
                Details
              </Button>
            </CardActions>
          </Card>
        ))
      ) : (
        <Typography variant={"body1"} color={"text.secondary"}>
          No recommended jobs or resume not provided
        </Typography>
      )}
    </Box>
  );
};

export default RecommendedJobsSection;
