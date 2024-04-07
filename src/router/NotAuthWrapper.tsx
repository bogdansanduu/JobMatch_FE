import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { AppRoutes } from "../utils/constants/routes";

import { useAppSelector } from "../store/hooks";
import { getLoggedUser, getToken } from "../store/slices/AuthSlice";
import { LoadingContainer, SpinnerContainer } from "./styledComponents";
import CircularProgress from "@mui/material/CircularProgress";

const NotAuthWrapper = () => {
  const [loading, setLoading] = useState(false);

  const loggedUser = useAppSelector(getLoggedUser);
  const accessToken = useAppSelector(getToken);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);

    if (accessToken || loggedUser) {
      navigate(AppRoutes.Home);
    }

    setLoading(false);
  }, [loggedUser, accessToken]);

  if (loading) {
    return (
      <LoadingContainer>
        <SpinnerContainer>
          <CircularProgress size={120} />
        </SpinnerContainer>
      </LoadingContainer>
    );
  }

  return <Outlet />;
};

export default NotAuthWrapper;
