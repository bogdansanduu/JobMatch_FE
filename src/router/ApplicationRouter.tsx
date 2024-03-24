import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

import { AppRoutes } from "../utils/constants/routes";

import NotFoundPage from "../pages/NotFoundPage";
import AccessDeniedPage from "../pages/AccessDeniedPage";
import NotImplementedPage from "../pages/NotImplementedPage";
import LoginPage from "../pages/LoginPage";
import AuthWrapper from "./AuthWrapper";
import NotAuthWrapper from "./NotAuthWrapper";
import HomePage from "../pages/HomePage";
import MyNetworkPage from "../pages/MyNetworkPage";

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
      {
        path: AppRoutes.Home,
        element: <HomePage />,
      },
      {
        path: AppRoutes.MyNetwork,
        element: <MyNetworkPage />,
      },
      {
        path: AppRoutes.Jobs,
        element: <NotImplementedPage />,
      },
      {
        path: AppRoutes.Messages,
        element: <NotImplementedPage />,
      },
      {
        path: AppRoutes.Notifications,
        element: <NotImplementedPage />,
      },
      {
        path: AppRoutes.AccessDenied,
        element: <AccessDeniedPage />,
      },
    ],
  },
  {
    path: "/",
    element: <NotAuthWrapper />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },
]);

export default ApplicationRouter;
