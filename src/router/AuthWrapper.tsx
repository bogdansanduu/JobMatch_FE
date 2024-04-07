import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getLoggedUser, getToken, logout } from "../store/slices/AuthSlice";

import { AppRoutes } from "../utils/constants/routes";
import { White } from "../utils/constants/colorPallete";

import SidebarNav from "../components/navigation/SidebarNav";
import { LoadingContainer, SpinnerContainer } from "./styledComponents";

const AuthWrapper = () => {
  const [loading, setLoading] = useState(true);

  const dispatch = useAppDispatch();
  const loggedUser = useAppSelector(getLoggedUser);
  const accessToken = useAppSelector(getToken);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);

    (async () => {
      if (!accessToken || !loggedUser) {
        await dispatch(logout());
        navigate(AppRoutes.Login);
      }

      if (accessToken && loggedUser) {
        navigate(AppRoutes.Home);
      }
    })();

    setLoading(false);
  }, [loggedUser, accessToken]);

  if (loading || !loggedUser || !accessToken)
    return (
      <LoadingContainer>
        <SpinnerContainer>
          <CircularProgress size={120} />
        </SpinnerContainer>
      </LoadingContainer>
    );

  // <div style={{ display: "flex", flexDirection: "column" }}>

  return (
    <>
      <SidebarNav />
      <div
        style={{
          overflow: "auto",
          backgroundColor: White.OffWhite,
          height: "95vh",
        }}
      >
        <Outlet />
      </div>
    </>
  );
};

export default AuthWrapper;
