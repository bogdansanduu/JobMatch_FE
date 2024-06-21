import React from "react";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";

import { White } from "../../utils/constants/colorPallete";
import userBanner from "../../assets/user_banner.jpg";

import { useAppSelector } from "../../store/hooks";
import { getCurrentCompany } from "../../store/slices/CompanySlice";

const CompanyPageHeader = () => {
  const company = useAppSelector(getCurrentCompany);

  return (
    <Card
      sx={{
        display: "flex",
        height: "inherit",
        flexDirection: "column",
        backgroundColor: White.PureWhite,
        borderRadius: "8px",
        minHeight: "100px",
      }}
    >
      <CardMedia
        component={"img"}
        alt={"user banner"}
        height={"150"}
        image={userBanner}
      />
      <CardHeader
        title={`${company?.name}`}
        subheader={`Contact: ${company?.email}`}
        avatar={<Avatar src={company?.profilePicture} />}
      />
      <CardContent>
        <Typography variant={"body2"} color={"text.secondary"} gutterBottom>
          {`${company?.country}, ${company?.city}, ${company?.state}`}
        </Typography>
        <Typography variant={"body2"} color={"text.secondary"} gutterBottom>
          {`Owner: ${company?.owner.firstName} ${company?.owner.lastName}`}
        </Typography>
        <Typography variant={"body2"} color={"text.secondary"} gutterBottom>
          {`Contact Info: ${company?.owner.email}`}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CompanyPageHeader;
