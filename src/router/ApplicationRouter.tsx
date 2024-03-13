import React from "react";
import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";

import App from "../App";
import NotFoundPage from "../pages/NotFoundPage";
import AccessDeniedPage from "../pages/AccessDeniedPage";
import NotImplementedPage from "../pages/NotImplementedPage";
import LoginPage from "../pages/LoginPage";
import AuthWrapper from "./AuthWrapper";

const ApplicationRouter = createBrowserRouter([
  {
    path: "/",
    element: <AuthWrapper />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "",
        element: <Navigate to={"/home"} />,
      },
      //TODO
      {
        path: "/home",
        element: <div>Home</div>,
      },
      {
        path: "/profile",
        element: <NotImplementedPage />,
      },
      {
        path: "/access_denied",
        element: <AccessDeniedPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

export default ApplicationRouter;
