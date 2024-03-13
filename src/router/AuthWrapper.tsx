import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getLoggedUser, getToken, logout } from "../store/slices/AuthSlice";

//TODO get rid of any
const AuthWrapper = ({ children }: any) => {
  const dispatch = useAppDispatch();

  const loggedUser = useAppSelector(getLoggedUser);
  const jwt = useAppSelector(getToken);

  const navigate = useNavigate();

  useEffect(() => {
    if (!jwt || !loggedUser) {
      dispatch(logout());
      navigate("/login");
    }

    if (jwt && loggedUser) {
      navigate("/home");
    }
  }, [loggedUser]);

  return <Outlet />;
};

export default AuthWrapper;
