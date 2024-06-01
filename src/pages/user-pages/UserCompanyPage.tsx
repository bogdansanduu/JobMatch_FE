import React, { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getLoggedUser } from "../../store/slices/AuthSlice";
import {
  getCompanyById,
  getCurrentCompany,
} from "../../store/slices/CompanySlice";
import { useParams } from "react-router-dom";
import {
  LoadingContainer,
  SpinnerContainer,
} from "../../router/styledComponents";
import CircularProgress from "@mui/material/CircularProgress";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  Typography,
} from "@mui/material";
import { White } from "../../utils/constants/colorPallete";
import userBanner from "../../assets/user_banner.jpg";
import IconButton from "@mui/material/IconButton";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  getAllPostsByCompany,
  getMostRecentCompanyPosts,
  getPosts,
} from "../../store/slices/PostSlice";
import Post from "../../components/post/Post";

const UserCompanyPage = () => {
  const currentUser = useAppSelector(getLoggedUser);
  const company = useAppSelector(getCurrentCompany);
  const companyPosts = useAppSelector(getPosts);
  const dispatch = useAppDispatch();
  const { companyId } = useParams();

  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);

  // Determine the number of characters to show in the preview
  const previewLength = 100;
  const descriptionPreview =
    company?.description && company.description.substring(0, previewLength);
  const showEllipsis =
    company?.description && company.description.length > previewLength;
  const hasDescription =
    !!company?.description && company.description.length > 0;

  console.log(company);
  console.log(companyPosts);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    (async () => {
      setLoading(true);

      const currentCompanyId = Number(companyId);

      if (!currentCompanyId) {
        return;
      }

      await dispatch(getCompanyById(currentCompanyId));
      await dispatch(
        getMostRecentCompanyPosts({
          companyId: currentCompanyId,
          limit: 3,
        })
      );

      setLoading(false);
    })();
  }, [companyId]);

  if (loading || !company)
    return (
      <LoadingContainer>
        <SpinnerContainer>
          <CircularProgress size={60} />
        </SpinnerContainer>
      </LoadingContainer>
    );

  return (
    <Box
      sx={{
        margin: "8px",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <Card
        sx={{
          display: "flex",
          height: "inherit",
          flexDirection: "column",
          backgroundColor: White.PureWhite,
          borderRadius: "8px",
          minHeight: "100px",
        }}
      >
        <CardMedia
          component={"img"}
          alt={"user banner"}
          height={"150"}
          image={userBanner}
        />
        <CardHeader
          title={`${company.name}`}
          subheader={`Contact: ${company.email}`}
          avatar={<Avatar src={company.profilePicture} />}
        />
        <CardContent>
          <Typography variant={"body2"} color={"text.secondary"} gutterBottom>
            {`${company.country}, ${company.city}, ${company.state}`}
          </Typography>
          <Typography variant={"body2"} color={"text.secondary"} gutterBottom>
            {`Owner: ${company.owner.firstName} ${company.owner.lastName}`}
          </Typography>
          <Typography variant={"body2"} color={"text.secondary"} gutterBottom>
            {`Contact Info: ${company.owner.email}`}
          </Typography>
        </CardContent>
      </Card>
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",

          backgroundColor: White.PureWhite,
          borderRadius: "8px",
          padding: "20px",
        }}
      >
        <Typography variant="h6">Most Recent Posts:</Typography>
        {Array.isArray(companyPosts) &&
          companyPosts.map((post) => (
            <Post
              key={post.id}
              post={post}
              containerSx={{
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                "&:hover": {
                  boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                },
                transition: "box-shadow 0.3s",
              }}
            />
          ))}
      </Box>
    </Box>
  );
};

export default UserCompanyPage;
