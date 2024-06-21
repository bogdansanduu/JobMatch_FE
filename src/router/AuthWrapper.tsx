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
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: ${(props) => (props.show ? "block" : "none")};
`;

const AuthWrapper = () => {
  const userSearchOpen = useAppSelector(getUserSearchOpen);
  const loggedUser = useAppSelector(getLoggedUser);
  const accessToken = useAppSelector(getToken);

  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(true);

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
