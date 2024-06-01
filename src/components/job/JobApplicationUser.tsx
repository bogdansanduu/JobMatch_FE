import React, { useState } from "react";
import { JobApplicationType } from "../../store/slices/JobApplicationSlice";
import { Avatar, Box, Button, Collapse, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { GrayColors } from "../../utils/constants/colorPallete";

interface JobApplicationUserProps {
  jobApplication: JobApplicationType;
}

const JobApplicationUser = ({ jobApplication }: JobApplicationUserProps) => {
  const [expanded, setExpanded] = useState(false);

  // Determine the number of characters to show in the preview
  const previewLength = 100;
  const resumePreview =
    jobApplication.resume && jobApplication.resume.substring(0, previewLength);
  const showEllipsis =
    jobApplication.resume && jobApplication.resume.length > previewLength;
  const hasResume = !!jobApplication.resume && jobApplication.resume.length > 0;

  const applicant = jobApplication.applicant;

  console.log(applicant);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: "12px",
        flexDirection: "column",
        height: "100%",
        padding: "16px",
        borderRadius: "8px",
        border: `1px solid ${GrayColors.Gray2}`,

        "&:hover": {
          boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
        },
        transition: "box-shadow 0.3s",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <Avatar
          src={applicant.profilePicture}
          sx={{ alignSelf: "start", marginTop: "6px" }}
        />
        <Typography variant="subtitle1" color="text.secondary">
          {`${applicant.firstName} ${applicant.lastName}`}
        </Typography>
        <Box sx={{ marginLeft: "auto", display: "flex", alignItems: "center" }}>
          <Typography variant="subtitle1" color="text.secondary">
            Contact:&nbsp;
          </Typography>
          <Typography variant="body1">{applicant.email}</Typography>
        </Box>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography variant="h6">Resume:</Typography>
        {showEllipsis && (
          <IconButton
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
            sx={{ marginLeft: "auto" }}
          >
            {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        )}
      </Box>

      {hasResume ? (
        <>
          <Typography variant="body1" paragraph>
            {!expanded && `${resumePreview}${showEllipsis ? "..." : ""}`}
          </Typography>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <Typography paragraph>{jobApplication.resume}</Typography>
          </Collapse>
        </>
      ) : (
        <Typography variant="body1">No resume available</Typography>
      )}
      <Box sx={{ display: "flex", marginLeft: "auto", gap: "8px" }}>
        <Button variant={"contained"}>View Resume</Button>
        <Button variant={"contained"}>Review Application</Button>
      </Box>
    </Box>
  );
};

export default JobApplicationUser;
