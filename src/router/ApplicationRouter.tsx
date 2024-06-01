import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

import { AppRoutes } from "../utils/constants/routes";

import NotFoundPage from "../pages/NotFoundPage";
import AccessDeniedPage from "../pages/AccessDeniedPage";
import NotImplementedPage from "../pages/NotImplementedPage";
import LoginPage from "../pages/LoginPage";
import AuthWrapper from "./AuthWrapper";
import NotAuthWrapper from "./NotAuthWrapper";
import HomePage from "../pages/user-pages/HomePage";
import MyNetworkPage from "../pages/user-pages/MyNetworkPage";
import RegisterPage from "../pages/RegisterPage";
import MessagingPage from "../pages/user-pages/MessagingPage";
import UserPage from "../pages/user-pages/UserPage";
import CreateCompanyAccount from "../pages/user-pages/CreateCompanyAccount";
import LoginCompanyPage from "../pages/LoginCompanyPage";
import AuthWrapperCompany from "./AuthWrapperCompany";
import HomePageCompany from "../pages/company-pages/HomePageCompany";
import EmployeesPage from "../pages/company-pages/EmployeesPage";
import JobsPage from "../pages/user-pages/JobsPage";
import MyProfilePage from "../pages/user-pages/MyProfilePage";
import JobPostingsPage from "../pages/company-pages/JobPostingsPage";
import CompanyJobDetailsPage from "../pages/company-pages/CompanyJobDetailsPage";
import UserJobDetailsPage from "../pages/user-pages/UserJobDetailsPage";
import MyApplicationsPage from "../pages/user-pages/MyApplicationsPage";
import ApplicationReviewPage from "../pages/user-pages/ApplicationReviewPage";
import UserCompanyPage from "../pages/user-pages/UserCompanyPage";

const ApplicationRouter = createBrowserRouter([
  {
    path: AppRoutes.User,
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
        element: <JobsPage />,
      },
      {
        path: AppRoutes.Messaging,
        element: <MessagingPage />,
      },
      {
        path: AppRoutes.MyProfile,
        element: <MyProfilePage />,
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
        path: AppRoutes.UserCompanyProfile,
        children: [
          {
            path: ":companyId",
            element: <UserCompanyPage />,
          },
        ],
      },
      {
        path: AppRoutes.UserJobDetails,
        children: [
          {
            path: ":jobId",
            element: <UserJobDetailsPage />,
          },
        ],
      },
      {
        path: AppRoutes.MyApplications,
        element: <MyApplicationsPage />,
      },
      {
        path: AppRoutes.UserApplicationReview,
        children: [
          {
            path: ":applicationId",
            element: <ApplicationReviewPage />,
          },
        ],
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
    path: AppRoutes.Company,
    element: <AuthWrapperCompany />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "",
        element: <Navigate to={AppRoutes.HomeCompany} />,
      },
      {
        path: AppRoutes.HomeCompany,
        element: <HomePageCompany />,
      },
      {
        path: AppRoutes.JobPostings,
        element: <JobPostingsPage />,
      },
      {
        path: AppRoutes.CompanyJobDetails,
        children: [
          {
            path: ":jobId",
            element: <CompanyJobDetailsPage />,
          },
        ],
      },
      {
        path: AppRoutes.Employees,
        element: <EmployeesPage />,
      },
      {
        path: AppRoutes.CompanyProfile,
        element: <NotImplementedPage />,
      },
      {
        path: AppRoutes.AccessDeniedCompany,
        element: <AccessDeniedPage />,
      },
    ],
  },
  {
    path: "/",
    element: <NotAuthWrapper />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: AppRoutes.Login,
        element: <LoginPage />,
      },
      {
        path: AppRoutes.LoginCompany,
        element: <LoginCompanyPage />,
      },
      {
        path: AppRoutes.Register,
        element: <RegisterPage />,
      },
    ],
  },
]);

export default ApplicationRouter;
