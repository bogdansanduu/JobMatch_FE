import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getLoggedUser, getToken, logout } from "../store/slices/AuthSlice";
import SidebarNav from "../components/navigation/SidebarNav";
import { White } from "../utils/constants/colorPallete";

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

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <SidebarNav />
      <div
        style={{ flex: 1, overflow: "auto", backgroundColor: White.OffWhite }}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default AuthWrapper;
