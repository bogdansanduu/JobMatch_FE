import React, { useState } from "react";
import { Box, Collapse, Typography } from "@mui/material";
import { White } from "../../utils/constants/colorPallete";
import IconButton from "@mui/material/IconButton";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useAppSelector } from "../../store/hooks";
import { getCurrentCompany } from "../../store/slices/CompanySlice";

const CompanyDescription = () => {
  const company = useAppSelector(getCurrentCompany);

  const [expanded, setExpanded] = useState(false);

  // Determine the number of characters to show in the preview
  const previewLength = 100;
  const descriptionPreview =
    company?.description && company.description.substring(0, previewLength);
  const showEllipsis =
    company?.description && company.description.length > previewLength;
  const hasDescription =
    !!company?.description && company.description.length > 0;
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: White.PureWhite,
        borderRadius: "8px",
        minHeight: "100px",
        padding: "20px", // Adjust padding for aesthetic reasons
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)", // Optional shadow for depth
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography variant="h6">Company Description:</Typography>
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

      {hasDescription ? (
        <>
          <Typography variant="body1" paragraph>
            {!expanded && `${descriptionPreview}${showEllipsis ? "..." : ""}`}
          </Typography>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <Typography paragraph>{company.description}</Typography>
          </Collapse>
        </>
      ) : (
        <Typography variant="body1">No description available</Typography>
      )}
    </Box>
  );
};

export default CompanyDescription;
