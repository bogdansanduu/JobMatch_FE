import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import UserPageDetails from "../../components/userPage/UserPageDetails";
import { getUserById } from "../../store/slices/UserSlice";
import { getMostRecentUserPosts } from "../../store/slices/PostSlice";
import { useAppDispatch } from "../../store/hooks";
import { useParams } from "react-router-dom";
import {
  LoadingContainer,
  SpinnerContainer,
} from "../../router/styledComponents";
import CircularProgress from "@mui/material/CircularProgress";
import UserPageHeaderCompany from "../../components/userPage/UserPageHeaderCompany";

const CompanyUserPage = () => {
  const dispatch = useAppDispatch();
  const { userId } = useParams();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);

      const currentUserId = Number(userId);

      if (!currentUserId) {
        return;
      }

      await dispatch(getUserById(currentUserId));
      await dispatch(
        getMostRecentUserPosts({
          userId: currentUserId,
          limit: 3,
        })
      );

      setLoading(false);
    })();
  }, [userId]);

  if (loading)
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
      <UserPageHeaderCompany />
      <UserPageDetails />
    </Box>
  );
};

export default CompanyUserPage;
