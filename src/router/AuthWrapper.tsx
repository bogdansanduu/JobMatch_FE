import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import styled from "styled-components";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getLoggedUser, getToken, logout } from "../store/slices/AuthSlice";
import { getUserSearchOpen } from "../store/slices/UISlice";

import { AppRoutes } from "../utils/constants/routes";
import { White } from "../utils/constants/colorPallete";

import TopNav from "../components/navigation/TopNav";
import { LoadingContainer, SpinnerContainer } from "./styledComponents";

const Overlay = styled.div<{ show: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent black */
  z-index: 999; /* Ensure the overlay is above other content */
  display: ${(props) =>
    props.show ? "block" : "none"}; /* Show/hide based on props */
`;

const AuthWrapper = () => {
  const userSearchOpen = useAppSelector(getUserSearchOpen);

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
        return;
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
      <TopNav />
      <div
        style={{
          overflow: "auto",
          backgroundColor: White.OffWhite,
          height: "95vh",
          position: "relative",
        }}
      >
        <Overlay show={userSearchOpen} />
        <Outlet />
      </div>
    </>
  );
};

export default AuthWrapper;
