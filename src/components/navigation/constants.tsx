import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import WorkIcon from "@mui/icons-material/Work";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import ForumIcon from "@mui/icons-material/Forum";
import BadgeIcon from "@mui/icons-material/Badge";

import { AppRoutes } from "../../utils/constants/routes";

export const pagesUser = [
  {
    title: "Home Page",
    icon: <HomeIcon sx={{ height: "22px", width: "22px" }} />,
    route: AppRoutes.Home,
  },
  {
    title: "My Network",
    icon: <PeopleAltIcon sx={{ height: "22px", width: "22px" }} />,
    route: AppRoutes.MyNetwork,
  },
  {
    title: "Jobs",
    icon: <WorkIcon sx={{ height: "22px", width: "22px" }} />,
    route: AppRoutes.Jobs,
  },
  {
    title: "My Applications",
    icon: <WorkHistoryIcon sx={{ height: "22px", width: "22px" }} />,
    route: AppRoutes.MyApplications,
  },
  {
    title: "Messages",
    icon: <ForumIcon sx={{ height: "22px", width: "22px" }} />,
    route: AppRoutes.Messaging,
  },
];

export const adminPages = [
  {
    title: "Home Page",
    icon: <HomeIcon sx={{ height: "22px", width: "22px" }} />,
    route: AppRoutes.HomeAdmin,
  },
  {
    title: "Users",
    icon: <PeopleAltIcon sx={{ height: "22px", width: "22px" }} />,
    route: AppRoutes.AllUsers,
  },
  {
    title: "Companies",
    icon: <BadgeIcon sx={{ height: "22px", width: "22px" }} />,
    route: AppRoutes.AllCompanies,
  },
];

export const pagesCompany = [
  {
    title: "Home Page",
    icon: <HomeIcon sx={{ height: "22px", width: "22px" }} />,
    route: AppRoutes.HomeCompany,
  },
  {
    title: "Job Postings",
    icon: <WorkIcon sx={{ height: "22px", width: "22px" }} />,
    route: AppRoutes.JobPostings,
  },
];
