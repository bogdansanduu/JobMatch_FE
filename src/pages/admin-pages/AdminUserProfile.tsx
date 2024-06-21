import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { useParams } from "react-router-dom";
import { getUserById } from "../../store/slices/UserSlice";
import { getAllPostsByUser } from "../../store/slices/PostSlice";
import {
  LoadingContainer,
  SpinnerContainer,
} from "../../router/styledComponents";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";
import UserPageHeader from "../../components/userPage/UserPageHeader";
import UserPageDetails from "../../components/userPage/UserPageDetails";

const AdminUserProfile = () => {
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
      await dispatch(getAllPostsByUser(currentUserId));

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

export default AdminUserProfile;
