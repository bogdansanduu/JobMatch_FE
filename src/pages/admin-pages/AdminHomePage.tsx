import React, { useEffect, useState } from "react";
import GroupIcon from "@mui/icons-material/Group";
import BusinessIcon from "@mui/icons-material/Business";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import { Box, Typography } from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import CommentIcon from "@mui/icons-material/Comment";

import { GrayColors, White } from "../../utils/constants/colorPallete";

import CardStatistics from "../../components/adminStatistics/CardStatistics";
import AdminAccountSection from "../../components/adminStatistics/AdminAccountSection";
import AppApi from "../../server/api/AppApi";

const AdminHomePage = () => {
  const userApi = AppApi.getUserApi();
  const companyApi = AppApi.getCompanyApi();
  const postApi = AppApi.getPostApi();
  const commentApi = AppApi.getCommentApi();
  const jobsApi = AppApi.getJobApi();
  const jobApplicationApi = AppApi.getJobApplicationApi();

  const [activeUsers, setActiveUsers] = useState(0);
  const [bannedUsers, setBannedUsers] = useState(0);

  const [activeCompanies, setActiveCompanies] = useState(0);
  const [bannedCompanies, setBannedCompanies] = useState(0);

  const [totalPosts, setTotalPosts] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [totalJobs, setTotalJobs] = useState(0);
  const [totalJobApplications, setTotalJobApplications] = useState(0);

  useEffect(() => {
    (async () => {
      const activeUsers = await userApi.getAllUsers(false);
      const bannedUsers = await userApi.getAllUsers(true);

      const activeCompanies = await companyApi.getAllCompanies(false);
      const bannedCompanies = await companyApi.getAllCompanies(true);

      const totalPosts = await postApi.getAllPosts();
      const totalComments = await commentApi.getAllComments();
      const totalJobs = await jobsApi.getAllJobs();
      const totalApplications = await jobApplicationApi.getAllJobApplications();

      setActiveUsers(activeUsers.length);
      setBannedUsers(bannedUsers.length);

      setActiveCompanies(activeCompanies.length);
      setBannedCompanies(bannedCompanies.length);

      setTotalPosts(totalPosts.length);
      setTotalComments(totalComments.length);
      setTotalJobs(totalJobs.length);
      setTotalJobApplications(totalApplications.length);
    })();
  }, []);

  return (
    <Box sx={{ display: "flex", padding: "12px", gap: "12px" }}>
      <AdminAccountSection />

      <Box
        sx={{
          flex: 5,

          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "12px",

          height: "fit-content",
          padding: "16px",
          borderRadius: "8px",
          backgroundColor: White.PureWhite,
          border: `1px solid ${GrayColors.Gray2}`,
        }}
      >
        <Typography variant={"h6"} color={"text.primary"}>
          Admin Dashboard
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <Box sx={{ display: "flex", gap: "4px" }}>
            <CardStatistics
              Icon={GroupIcon}
              name={"Total Users"}
              totalValue={activeUsers + bannedUsers}
              activeValue={activeUsers}
              bannedValue={bannedUsers}
            />
            <CardStatistics
              Icon={BusinessIcon}
              name={"Total Companies"}
              totalValue={activeCompanies + bannedCompanies}
              activeValue={activeCompanies}
              bannedValue={bannedCompanies}
            />
            <CardStatistics
              Icon={WorkIcon}
              name={"Total Jobs"}
              totalValue={totalJobs}
            />
          </Box>
          <Box sx={{ display: "flex", gap: "4px" }}>
            <CardStatistics
              Icon={WorkHistoryIcon}
              name={"Total Job Applications"}
              totalValue={totalJobApplications}
            />

            <CardStatistics
              Icon={DynamicFeedIcon}
              name={"Total Posts"}
              totalValue={totalPosts}
            />
            <CardStatistics
              Icon={CommentIcon}
              name={"Total Comments"}
              totalValue={totalComments}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminHomePage;
