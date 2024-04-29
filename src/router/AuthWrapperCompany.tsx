import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getUserSearchOpen } from "../store/slices/UISlice";
import { getLoggedCompany, getToken, logout } from "../store/slices/AuthSlice";
import { Outlet, useNavigate } from "react-router-dom";
import { AppRoutes } from "../utils/constants/routes";
import { LoadingContainer, SpinnerContainer } from "./styledComponents";
import CircularProgress from "@mui/material/CircularProgress";
import TopNav from "../components/navigation/TopNav";
import { White } from "../utils/constants/colorPallete";
import styled from "styled-components";

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

const AuthWrapperCompany = () => {
  const userSearchOpen = useAppSelector(getUserSearchOpen);
  const loggedCompany = useAppSelector(getLoggedCompany);
  const accessToken = useAppSelector(getToken);

  const [loading, setLoading] = useState(true);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);

    (async () => {
      if (!accessToken || !loggedCompany) {
        await dispatch(logout());
        navigate(AppRoutes.LoginCompany);
      }

      if (accessToken && loggedCompany) {
        return;
      }
    })();

    setLoading(false);
  }, [loggedCompany, accessToken]);

  if (loading || !loggedCompany || !accessToken)
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

export default AuthWrapperCompany;
