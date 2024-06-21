import React, { useEffect } from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { GrayColors, White } from "../../utils/constants/colorPallete";
import userBanner from "../../assets/user_banner.jpg";
import { useAppSelector } from "../../store/hooks";
import { getLoggedUser } from "../../store/slices/AuthSlice";

const AdminAccountSection = () => {
  const currentUser = useAppSelector(getLoggedUser);

  return (
    <Box
      sx={{
        flex: 1.5,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "0px 16px 16px 16px",
          backgroundColor: White.PureWhite,
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <CardMedia
          component={"img"}
          alt={"user banner"}
          height={"60"}
          image={userBanner}
          sx={{
            position: "absolute",
          }}
        />
        <Avatar
          src={currentUser?.profilePicture}
          alt={currentUser?.firstName}
          sx={{
            width: 60,
            height: 60,
            marginBottom: "16px",
            marginTop: "30px",
          }}
        />
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: 0,
          }}
        >
          <Typography variant="h6">{`${currentUser?.firstName} ${currentUser?.lastName}`}</Typography>
          <Typography variant="subtitle2" color="text.secondary">
            {"Role: Admin"}
          </Typography>
        </CardContent>
      </Card>

      <Box
        sx={{
          flex: 1,

          display: "flex",
          gap: "12px",
          flexDirection: "column",

          height: "100%",
          padding: "16px",
          borderRadius: "8px",
          backgroundColor: White.PureWhite,
          border: `1px solid ${GrayColors.Gray2}`,
        }}
      >
        <Typography variant="subtitle2">Usage Info</Typography>
        <Typography variant="body2" color={"text.secondary"}>
          Here you can view various statistics related to the application,
          including total user count and total companies count. Additionally,
          you have the tools to moderate the application, manage user accounts,
          and ensure the platform's smooth operation.
        </Typography>
      </Box>
    </Box>
  );
};

export default AdminAccountSection;
