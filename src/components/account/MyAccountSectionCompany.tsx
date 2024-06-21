import React from "react";
import { Avatar, Box, Card, CardMedia, Typography } from "@mui/material";

import userBanner from "../../assets/user_banner.jpg";
import { White } from "../../utils/constants/colorPallete";

import { useAppSelector } from "../../store/hooks";
import { getLoggedCompany } from "../../store/slices/AuthSlice";

const MyAccountSectionCompany = () => {
  const currentCompany = useAppSelector(getLoggedCompany);

  return (
    <Box
      sx={{
        flex: 1,
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
          src={currentCompany?.profilePicture}
          alt={currentCompany?.name}
          sx={{
            width: 60,
            height: 60,
            marginBottom: "16px",
            marginTop: "30px",
          }}
        />
        <Typography variant="h6">{`${currentCompany?.name}`}</Typography>
        <Typography variant="subtitle2" color="text.secondary">
          Industry: {currentCompany?.industry || "No industry"}
        </Typography>
      </Card>
    </Box>
  );
};

export default MyAccountSectionCompany;
