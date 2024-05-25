import React from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DescriptionIcon from "@mui/icons-material/Description";

import { GrayColors } from "../../utils/constants/colorPallete";
import { JobType } from "../../store/slices/JobSlice";

interface JobCardProps {
  job: JobType;
  onClick: (job: JobType) => void;
}

const JobCard = ({ job, onClick }: JobCardProps) => {
  const handleJobCardClick = () => {
    onClick(job);
  };

  return (
    <Card
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
            {job.description ? job.description : "Description not available"}
          </Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleJobCardClick}>
          Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default JobCard;
