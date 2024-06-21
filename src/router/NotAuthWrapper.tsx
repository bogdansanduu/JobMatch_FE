import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { AppRoutes } from "../utils/constants/routes";

import { useAppSelector } from "../store/hooks";
import {
  getLoggedCompany,
  getLoggedUser,
  getToken,
} from "../store/slices/AuthSlice";
import { LoadingContainer, SpinnerContainer } from "./styledComponents";
import CircularProgress from "@mui/material/CircularProgress";
import { Roles } from "../utils/constants/roles";

const NotAuthWrapper = () => {
  const [loading, setLoading] = useState(false);

  const loggedUser = useAppSelector(getLoggedUser);
  const loggedCompany = useAppSelector(getLoggedCompany);
  const accessToken = useAppSelector(getToken);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);

    if (accessToken) {
      if (loggedUser) {
        if (loggedUser.role === Roles.ADMIN) {
          navigate(AppRoutes.HomeAdmin);
        }
        if (
          loggedUser.role === Roles.USER ||
          loggedUser.role === Roles.COMPANY_OWNER
        ) {
          navigate(AppRoutes.Home);
        }
      }

      if (loggedCompany) {
        navigate(AppRoutes.HomeCompany);
      }
    }

    setLoading(false);
  }, [loggedUser, loggedCompany, accessToken]);

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
