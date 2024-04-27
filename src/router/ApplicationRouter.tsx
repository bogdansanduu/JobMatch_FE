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
import RegisterPage from "../pages/RegisterPage";
import MessagingPage from "../pages/MessagingPage";
import UserPage from "../pages/UserPage";
import CreateCompanyAccount from "../pages/CreateCompanyAccount";

const ApplicationRouter = createBrowserRouter([
  {
    path: "/",
    element: <AuthWrapper />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "",
        element: <Navigate to={AppRoutes.Home} />,
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
        path: AppRoutes.Messaging,
        element: <MessagingPage />,
      },
      {
        path: AppRoutes.UserProfile,
        children: [
          {
            path: ":userId",
            element: <UserPage />,
          },
        ],
      },
      {
        path: AppRoutes.Notifications,
        element: <NotImplementedPage />,
      },
      {
        path: AppRoutes.CreateCompanyAccount,
        element: <CreateCompanyAccount />,
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
        path: AppRoutes.Login,
        element: <LoginPage />,
      },
      {
        path: AppRoutes.Register,
        element: <RegisterPage />,
      },
    ],
  },
]);

export default ApplicationRouter;
