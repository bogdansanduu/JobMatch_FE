import React, { PropsWithChildren, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { getCurrentUser } from "../store/slices/UserSlice";
import { useAppSelector } from "../store/hooks";
import { logout } from "../store/slices/AuthSlice";

//TODO get rid of any
const AuthWrapper = ({ children }: any) => {
  const currentUser = useAppSelector(getCurrentUser);
  const navigate = useNavigate();

  useEffect(() => {
    const localStorageToken = localStorage.getItem("token");

    if (!localStorageToken || !currentUser) {
      logout();
      navigate("/login");
    }
  }, [currentUser]);

  return <Outlet />;
};

export default AuthWrapper;
