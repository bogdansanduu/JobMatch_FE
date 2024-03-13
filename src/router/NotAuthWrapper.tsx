import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { useAppSelector } from "../store/hooks";
import { getLoggedUser, getToken } from "../store/slices/AuthSlice";

const NotAuthWrapper = () => {
  const loggedUser = useAppSelector(getLoggedUser);
  const jwt = useAppSelector(getToken);

  const navigate = useNavigate();

  useEffect(() => {
    if (jwt && loggedUser) {
      navigate("/home");
    }
  }, [loggedUser]);

  return <Outlet />;
};

export default NotAuthWrapper;
