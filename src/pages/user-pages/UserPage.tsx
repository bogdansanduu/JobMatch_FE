import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useParams } from "react-router-dom";

import { getUserById } from "../../store/slices/UserSlice";
import { useAppDispatch } from "../../store/hooks";

import {
  LoadingContainer,
  SpinnerContainer,
} from "../../router/styledComponents";
import UserPageDetails from "../../components/userPage/UserPageDetails";
import { getMostRecentUserPosts } from "../../store/slices/PostSlice";
import UserPageHeader from "../../components/userPage/UserPageHeader";

const UserPage = () => {
  const dispatch = useAppDispatch();
  const { userId } = useParams();

  const [loading, setLoading] = useState(true);

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
      <UserPageHeader />
      <UserPageDetails />
    </Box>
  );
};

export default UserPage;
