import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

import { AppRoutes } from "../utils/constants/routes";
import { Roles } from "../utils/constants/roles";

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
import RoleRestrictedRoute from "../components/routeRestrictors/RoleRestrictedRoute";
import CompanyPage from "../pages/company-pages/CompanyPage";
import CompanyUserPage from "../pages/company-pages/CompanyUserPage";
import AllUsersPage from "../pages/admin-pages/AllUsersPage";
import AllCompaniesPage from "../pages/admin-pages/AllCompaniesPage";
import AdminHomePage from "../pages/admin-pages/AdminHomePage";
import AdminUserProfile from "../pages/admin-pages/AdminUserProfile";
import AdminCompanyProfile from "../pages/admin-pages/AdminCompanyProfile";

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
        element: (
          <RoleRestrictedRoute roles={[Roles.USER, Roles.COMPANY_OWNER]}>
            <HomePage />
          </RoleRestrictedRoute>
        ),
      },
      {
        path: AppRoutes.MyNetwork,
        element: (
          <RoleRestrictedRoute roles={[Roles.USER, Roles.COMPANY_OWNER]}>
            <MyNetworkPage />
          </RoleRestrictedRoute>
        ),
      },
      {
        path: AppRoutes.Jobs,
        element: (
          <RoleRestrictedRoute roles={[Roles.USER, Roles.COMPANY_OWNER]}>
            <JobsPage />
          </RoleRestrictedRoute>
        ),
      },
      {
        path: AppRoutes.Messaging,
        element: (
          <RoleRestrictedRoute roles={[Roles.USER, Roles.COMPANY_OWNER]}>
            <MessagingPage />
          </RoleRestrictedRoute>
        ),
      },
      {
        path: AppRoutes.MyProfile,
        element: (
          <RoleRestrictedRoute roles={[Roles.USER, Roles.COMPANY_OWNER]}>
            <MyProfilePage />
          </RoleRestrictedRoute>
        ),
      },
      {
        path: AppRoutes.UserProfile,
        children: [
          {
            path: ":userId",
            element: (
              <RoleRestrictedRoute roles={[Roles.USER, Roles.COMPANY_OWNER]}>
                <UserPage />
              </RoleRestrictedRoute>
            ),
          },
        ],
      },
      {
        path: AppRoutes.UserCompanyProfile,
        children: [
          {
            path: ":companyId",
            element: (
              <RoleRestrictedRoute roles={[Roles.USER, Roles.COMPANY_OWNER]}>
                <UserCompanyPage />
              </RoleRestrictedRoute>
            ),
          },
        ],
      },
      {
        path: AppRoutes.UserJobDetails,
        children: [
          {
            path: ":jobId",
            element: (
              <RoleRestrictedRoute roles={[Roles.USER, Roles.COMPANY_OWNER]}>
                <UserJobDetailsPage />
              </RoleRestrictedRoute>
            ),
          },
        ],
      },
      {
        path: AppRoutes.MyApplications,
        element: (
          <RoleRestrictedRoute roles={[Roles.USER, Roles.COMPANY_OWNER]}>
            <MyApplicationsPage />
          </RoleRestrictedRoute>
        ),
      },
      {
        path: AppRoutes.UserApplicationReview,
        children: [
          {
            path: ":applicationId",
            element: (
              <RoleRestrictedRoute roles={[Roles.USER, Roles.COMPANY_OWNER]}>
                <ApplicationReviewPage />
              </RoleRestrictedRoute>
            ),
          },
        ],
      },
      {
        path: AppRoutes.CreateCompanyAccount,
        element: (
          <RoleRestrictedRoute roles={[Roles.USER, Roles.COMPANY_OWNER]}>
            <CreateCompanyAccount />
          </RoleRestrictedRoute>
        ),
      },
      {
        path: AppRoutes.AccessDenied,
        element: <AccessDeniedPage />,
      },
    ],
  },
  {
    path: AppRoutes.Admin,
    element: <AuthWrapper />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "",
        element: <Navigate to={AppRoutes.HomeAdmin} />,
      },
      {
        path: AppRoutes.HomeAdmin,
        element: (
          <RoleRestrictedRoute roles={[Roles.ADMIN]}>
            <AdminHomePage />
          </RoleRestrictedRoute>
        ),
      },
      {
        path: AppRoutes.AllUsers,
        element: (
          <RoleRestrictedRoute roles={[Roles.ADMIN]}>
            <AllUsersPage />
          </RoleRestrictedRoute>
        ),
      },
      {
        path: AppRoutes.AdminUserProfile,
        children: [
          {
            path: ":userId",
            element: (
              <RoleRestrictedRoute roles={[Roles.ADMIN]}>
                <AdminUserProfile />
              </RoleRestrictedRoute>
            ),
          },
        ],
      },
      {
        path: AppRoutes.AllCompanies,
        element: (
          <RoleRestrictedRoute roles={[Roles.ADMIN]}>
            <AllCompaniesPage />
          </RoleRestrictedRoute>
        ),
      },
      {
        path: AppRoutes.AdminCompanyProfile,
        children: [
          {
            path: ":companyId",
            element: (
              <RoleRestrictedRoute roles={[Roles.ADMIN]}>
                <AdminCompanyProfile />
              </RoleRestrictedRoute>
            ),
          },
        ],
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
        path: AppRoutes.CompanyUserProfile,
        children: [
          {
            path: ":userId",
            element: <CompanyUserPage />,
          },
        ],
      },
      {
        path: AppRoutes.CompanyProfile,
        children: [
          {
            path: ":companyId",
            element: <CompanyPage />,
          },
        ],
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
        path: "",
        element: <Navigate to={AppRoutes.Login} />,
      },
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
