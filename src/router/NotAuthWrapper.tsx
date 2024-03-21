import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { AppRoutes } from "../utils/constants/routes";

import { useAppSelector } from "../store/hooks";
import { getLoggedUser, getToken } from "../store/slices/AuthSlice";

const NotAuthWrapper = () => {
  const loggedUser = useAppSelector(getLoggedUser);
  const jwt = useAppSelector(getToken);

  const navigate = useNavigate();

  useEffect(() => {
    if (jwt && loggedUser) {
      navigate(AppRoutes.Home);
    }
  }, [loggedUser]);

  return <Outlet />;
};

export default NotAuthWrapper;
