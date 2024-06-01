import React from "react";
import { Avatar, Box, Typography } from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import { GrayColors } from "../../utils/constants/colorPallete";
import ClassIcon from "@mui/icons-material/Class";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useAppSelector } from "../../store/hooks";
import { getCurrentJob } from "../../store/slices/JobSlice";
import { formatDistanceToNow, parseISO } from "date-fns";

const JobDetailsHeader = () => {
  const currentJob = useAppSelector(getCurrentJob);

  const formatRelativeTime = (dateString: string) => {
    if (!dateString) {
      return "N/A";
    }

    const date = parseISO(dateString);
    return formatDistanceToNow(date, { addSuffix: true });
  };

  if (!currentJob) return <></>;

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
      <Avatar
        src={currentJob.company.profilePicture}
        sx={{ alignSelf: "start", marginTop: "6px" }}
      />
      <Box>
        <Typography variant="h6">{currentJob.title}</Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <BusinessIcon sx={{ color: GrayColors.Gray5 }} />
          <Typography variant="subtitle1" color="text.secondary">
            {currentJob.company.name}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <ClassIcon sx={{ color: GrayColors.Gray5 }} />
          <Typography variant="subtitle2" color="text.secondary">
            {currentJob.category}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <LocationOnIcon sx={{ color: GrayColors.Gray5 }} />
          <Typography variant="subtitle2" color="text.secondary">
            {`${currentJob.city || ""}${currentJob.city ? ", " : ""}${
              currentJob.state || ""
            }${currentJob.state ? ", " : ""}${currentJob.country}`}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          marginLeft: "auto",
          alignSelf: "end",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <Typography variant="subtitle2" color="text.secondary">
            Posted:
          </Typography>
          <Typography variant="body1">
            {formatRelativeTime(currentJob.createdAt)}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <Typography variant="subtitle2" color="text.secondary">
            Last Updated:
          </Typography>
          <Typography variant="body1">
            {formatRelativeTime(currentJob.updatedAt)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default JobDetailsHeader;
